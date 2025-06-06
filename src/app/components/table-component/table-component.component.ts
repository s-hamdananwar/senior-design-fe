import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { LoadDataService } from "../../services/load-data.service";
import { FormsModule } from "@angular/forms";
import { validateData } from "../../services/validate-data.service";
import { Subject, firstValueFrom } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Component({
  selector: "app-table-component",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: "./table-component.component.html",
  styleUrls: ["./table-component.component.css"],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSetName: string | null = null;
  data: any[] = [];
  displayedData: any[] = [];
  title: string = "";
  validationState: { [rowIndex: number]: { [key: string]: true | string } } =
    {};
  private rowUpdateSubject = new Subject<number>();

  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];
  currentPage = 0;
  selectedStatus: number = 0;

  isLoading: boolean = true; // Added loading state

  constructor(
    private route: ActivatedRoute,
    private dataService: LoadDataService,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit() {
    this.paginatorIntl.nextPageLabel = "";
    this.paginatorIntl.previousPageLabel = "";
    this.paginatorIntl.firstPageLabel = "";
    this.paginatorIntl.lastPageLabel = "";
    this.paginatorIntl.changes.next();
    this.route.paramMap.subscribe((params) => {
      this.dataSetName = params.get("dataSet");
      this.validationState = {};
      this.loadData(this.dataSetName, this.selectedStatus);
    });

    this.rowUpdateSubject.pipe(debounceTime(200)).subscribe((rowIndex) => {
      this.processRowUpdate(rowIndex);
    });
  }

  onToggleChange(selectedStatus: number) {
    this.selectedStatus = selectedStatus;
    this.validationState = {}; // Reset validation state
    this.loadData(this.dataSetName, selectedStatus);
  }

  loadData(dataSetName: string | null, selectedStatus: number) {
    if (!dataSetName) {
      console.error("dataSetName is null or undefined");
      return;
    }

    this.isLoading = true; // Set loading to true before fetching data
    this.currentPage = 0;

    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }

    this.dataService.loadData(dataSetName, selectedStatus).subscribe(
      (data: any[]) => {
        this.data = data;
        this.totalItems = data.length;
        this.updateDisplayedData();
        this.setTitle();
        this.isLoading = false; // Set loading to false when done
      },
      (error) => {
        console.error("Error loading data", error);
        this.isLoading = false; // Ensure loading stops even on error
      }
    );
  }

  setTitle() {
    if (this.dataSetName === "dataSet5") {
      this.title = "Email Address";
    } else {
      this.title = "Haven't set up yet";
    }
  }

  updateDisplayedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.displayedData = this.data.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedData();
  }

  onPageSizeChange(event: Event) {
    const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pageSize = newSize;
    this.currentPage = 0;
    this.updateDisplayedData();

    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = newSize;
    }
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

  async processRowUpdate(rowIndex: number) {
    const rowValidation = this.validationState[rowIndex];
    if (rowValidation) {
      const isRowValid = Object.values(rowValidation).every(
        (val) => val === true
      );
      if (isRowValid) {
        const rowData = this.data[rowIndex].targetField;
        console.log(rowData);
        const id = this.data[rowIndex].id;
        console.log(id);
        console.log(this.dataSetName);

        try {
          const stringData =
            typeof rowData === "string" ? rowData : JSON.stringify(rowData);
          const response = await firstValueFrom(
            this.dataService.updateData(this.dataSetName, id, stringData)
          );
          console.log("Data updated successfully", response);
        } catch (error) {
          console.error("Error updating data", error);
        }
      }
    }
  }

  formatHeader(key: string): string {
    if (!key) return "";
    let formatted = key.replace(/([A-Z])/g, " $1");
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    formatted = formatted.replace(/\bId\b/g, "ID");
    return formatted;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj).filter(
      (key) =>
        key.toLowerCase() !== "id" &&
        key.toLowerCase() !== "field" &&
        key.toLowerCase() !== "isvalid"
    );
  }

  getTooltipText(rowIndex: number, key: string): string {
    const value = this.validationState[rowIndex]?.[key];
    return typeof value === "string" ? value : "";
  }
}
