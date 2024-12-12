import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { LoadDataService } from '../../services/load-data.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
})
export class PaginationComponent implements OnInit {
  fullDataSet: any[] = [];
  displayedData: any[] = [];
  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 0;

  constructor(private loadDataService: LoadDataService) {}

  ngOnInit() {
    this.loadFullDataSet();
  }

  loadFullDataSet() {
    this.loadDataService.loadData('tableName').subscribe(
      (data: any[]) => {
        this.fullDataSet = data;
        this.totalItems = data.length;
        this.updateDisplayedData();
      },
      (error: any) => {
        console.error('Error loading data:', error);
      }
    );
  }

  updateDisplayedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.displayedData = this.fullDataSet.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedData();
  }
}
