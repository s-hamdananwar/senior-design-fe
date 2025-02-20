import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: "top-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  standalone: true, // Mark as standalone
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, MatButtonToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  selectedView: string = 'tableView';
}
