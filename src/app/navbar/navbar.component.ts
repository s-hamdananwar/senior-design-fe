import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../services/nav-api.service";
import { NavItem } from "../models/nav-item.model";
import { NoopAnimationPlayer } from "@angular/animations";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css", "./bottom-nav.component.css", "./top-nav.component.css"],
})
export class NavbarComponent {
  showInput = false; // Tracks whether the input box is visible
  inputValue = ''; // Holds the input box value

  toggleInput() {
    this.showInput = !this.showInput;
  }
  
  navItems: NavItem[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe(
      (data: NavItem[]) => {
        console.log("API Data:", data);
        this.navItems = data;
      },
      (error) => {
        console.error("Error fetching navigation items:", error);
      }
    );
  }
}
