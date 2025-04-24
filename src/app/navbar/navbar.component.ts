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
  @Input() selectedView: string = "";

  showInput = false;
  inputValue = "";
  navItems: NavItem[] = [];
  filteredNavItems: NavItem[] = [];
  private routerSub!: Subscription;
  selectedCategory: string | null = null;
  selectedStatus: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    if (!this.selectedCategory) {
      this.selectedCategory = "student";
      this.onCategoryChange();
    }
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
        this.filteredNavItems = [...this.navItems];
      }, 0);
    }
  }

  filterNavItems(): void {
    let filtered = [...this.navItems];

    const query = this.inputValue.toLowerCase().trim();
    if (query !== "") {
      filtered = filtered.filter((item) =>
        item.label.toLowerCase().includes(query)
      );
    }

    if (this.selectedStatus === "valid") {
      filtered = filtered.filter((item) => (item as any).isValid === true);
    } else if (this.selectedStatus === "invalid") {
      filtered = filtered.filter((item) => (item as any).isValid === false);
    }

    this.filteredNavItems = filtered;
  }

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

  onCategoryChange(): void {
    const url = `/person/${this.selectedCategory}/1`;
    this.router.navigateByUrl(url);
  }
  clearFilter() {
    this.selectedCategory = null;
    this.selectedStatus = null;
    this.filterNavItems();
  }
}
