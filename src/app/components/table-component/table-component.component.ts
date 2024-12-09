import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { LoadDataService } from "../../services/load-data.service";
import { FormsModule } from "@angular/forms";
import { validateData } from "../../services/validate-data.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; // Import MatIconModule

@Component({
  selector: "app-table-component",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./table-component.component.html",
  styleUrls: ["./table-component.component.css"],
})
export class TableComponent implements OnInit {
  dataSetName: string | null = null;
  data: any[] = [];
  title: string = "";
  validationState: {
    [rowIndex: number]: { [key: string]: true | string };
  } = {};
  private rowUpdateSubject = new Subject<number>();

  constructor(
    private route: ActivatedRoute,
    private dataService: LoadDataService
  ) {}
  formatHeader(key: string): string {
    if (!key) return "";
    let formatted = key.replace(/([A-Z])/g, " $1");
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    formatted = formatted.replace(/\bId\b/g, "ID");
    return formatted;
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj).filter(
      (key) => key.toLowerCase() !== "id" && key.toLowerCase() !== "field"
    );
  }

  //Getting Data Function
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.dataSetName = params.get("dataSet");
      // Need to reset validation state here so it doesn't carry over previous tables validations to the new one.
      this.validationState = {};
      this.dataService.loadData(this.dataSetName).subscribe(
        (data: any[]) => {
          this.data = data;
          this.setTitle();
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
    });
    this.rowUpdateSubject.pipe(debounceTime(200)).subscribe((rowIndex) => {
      this.processRowUpdate(rowIndex);
    });
  }

  setTitle() {
    if (this.dataSetName === "dataSet5") {
      this.title = "Email Address";
    } else {
      this.title = "Haven't set up yet";
    }
  }

  // Inserting Data Related functions

  isInsertColumn(index: number): boolean {
    return index === 0;
  }
  onValueChange(rowIndex: number, key: string, newValue: any) {
    const validationResult = validateData(newValue, this.dataSetName);
    if (!this.validationState[rowIndex]) {
      this.validationState[rowIndex] = {};
    }
    this.validationState[rowIndex][key] = validationResult;
  }

  onInputBlur(rowIndex: number) {
    this.rowUpdateSubject.next(rowIndex);
  }

  processRowUpdate(rowIndex: number) {
    const rowValidation = this.validationState[rowIndex];
    if (rowValidation) {
      const isRowValid = Object.values(rowValidation).every(
        (val) => val === true
      );
      if (isRowValid) {
        const rowData = this.data[rowIndex];
        const id = rowData.id;
        this.dataService.updateData(this.dataSetName, id, rowData).subscribe(
          (response) => {
            console.log("Data updated successfully", response);
          },
          (error) => {
            console.error("Error updating data", error);
          }
        );
      }
    }
  }
  getTooltipText(rowIndex: number, key: string): string {
    const value = this.validationState[rowIndex]?.[key];
    return typeof value === "string" ? value : "";
  }
}
