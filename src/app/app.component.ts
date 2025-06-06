import { Component } from "@angular/core";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http"; // Import HttpClientModule
import { FilterComponent } from "./filterbar/filterbar.component";
import { HeaderComponent } from "./components/header/header.component";
import { MatButtonModule } from "@angular/material/button"; // Import MatButtonModule
import { MatIconModule } from "@angular/material/icon"; // Import MatIconModule

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NavbarComponent,
    HttpClientModule,
    FilterComponent,
    HeaderComponent,
    MatButtonModule, // Include MatButtonModule
    MatIconModule, // Include MatIconModule
  ],
})
export class AppComponent {
  title = "FACTS";

  selectedView: string = '';

  updateSelectedView(view: string) {
    this.selectedView = view;
  }
}
