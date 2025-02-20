import { Component, OnInit, OnDestroy } from "@angular/core";
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
    // Initial data load.
    this.fetchData();

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.fetchData();
      });
  }

  fetchData(): void {
    this.apiService.getData().subscribe(
      (data: NavItem[]) => {
        console.log("API Data:", data);
        this.navItems = [...data];
        this.filteredNavItems = [...data]; // Reset table list upon search input deletion
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
  
  filterTables() {
    const query = this.inputValue.toLowerCase().trim();

    if (query === "") {
      this.filteredNavItems = [...this.navItems];
    } else {
      this.filteredNavItems = this.navItems.filter(item =>
        item.label.toLowerCase().includes(query)
      );
    }
  }
  
  selectTable(item: NavItem) {
    this.router.navigate([item.route]);
  
    this.inputValue = "";
    this.showInput = false;
  
    this.filteredNavItems = [...this.navItems];
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
