import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'top-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, MatButtonModule, MatIconModule], 
})
export class HeaderComponent {}
