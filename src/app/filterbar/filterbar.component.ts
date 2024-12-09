import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from "@angular/common";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title Basic select
 */
@Component({
  selector: "filterbar",
  templateUrl: "./filterbar.component.html",
  standalone: true,
  styleUrls: ["./filterbar.component.css"],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatIconModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterComponent {}
