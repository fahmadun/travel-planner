import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService, Expense } from '../data.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TripDetailComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['description', 'category', 'amount', 'date', 'actions'];
  dataSource!: MatTableDataSource<Expense>;
  tripId!: number;
  private expensesSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.tripId = +this.route.snapshot.paramMap.get('id')!;
    this.expensesSubscription = this.dataService.expenses$.subscribe(expenses => {
      this.dataSource = new MatTableDataSource(expenses.filter(expense => expense.tripId === this.tripId));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {
    if (this.expensesSubscription) {
      this.expensesSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addExpense() {
    this.router.navigate(['/expense-form'], { queryParams: { tripId: this.tripId } });
  }

  editExpense(expense: Expense) {
    this.router.navigate(['/expense-form'], { queryParams: { expense: JSON.stringify(expense) } });
  }
}
