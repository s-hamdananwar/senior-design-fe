import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../services/nav-api.service";
import { NavItem } from "../models/nav-item.model";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrls: [
    "./navbar.component.css",
    "./bottom-nav.component.css",
    "./top-nav.component.css",
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  showInput = false;
  inputValue = "";
  navItems: NavItem[] = [];
  filteredNavItems: NavItem[] = [];
  private routerSub!: Subscription;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.selectedStatus = null;
    this.fetchData();
    this.routerSub = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes("/table/")) {
          this.selectedStatus = null;
          this.filterNavItems();
        }
        this.fetchData();
      });
  }

  fetchData(): void {
    this.apiService.getData().subscribe(
      (data: NavItem[]) => {
        console.log("API Data:", data);
        this.navItems = [...data];
        this.filterNavItems();
      },
      (error) => {
        console.error("Error fetching navigation items:", error);
      }
    );
  }

  toggleInput() {
    this.showInput = !this.showInput;
    if (!this.showInput) {
      this.inputValue = "";
      setTimeout(() => {
        this.filteredNavItems = [...this.navItems]; // Ensure reset is detected
      }, 0);
    }
  }

  // Filter both by search input and selectedStatus.
  filterNavItems(): void {
    let filtered = [...this.navItems];

    // Filter by search input if provided.
    const query = this.inputValue.toLowerCase().trim();
    if (query !== "") {
      filtered = filtered.filter((item) =>
        item.label.toLowerCase().includes(query)
      );
    }

    // Filter by selectedStatus if it is set.
    if (this.selectedStatus === "valid") {
      filtered = filtered.filter((item) => (item as any).isValid === true);
    } else if (this.selectedStatus === "invalid") {
      filtered = filtered.filter((item) => (item as any).isValid === false);
    }

    this.filteredNavItems = filtered;
  }

  // This method is still used by your search input.
  filterTables() {
    this.filterNavItems();
  }

  selectTable(item: NavItem) {
    this.router.navigate([item.route]).then(() => {
      this.inputValue = "";
      this.showInput = false;
      this.filterNavItems();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  @Input() selectedView: string = "";

  selectedCategory: string | null = null;
  selectedStatus: string | null = null;

  clearFilter() {
    this.selectedCategory = null;
    this.selectedStatus = null;
  }
}
