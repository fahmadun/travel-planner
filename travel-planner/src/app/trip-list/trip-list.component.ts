import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataService, Trip } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule, MatSortModule]
})
export class TripListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['destination', 'startDate', 'endDate', 'actions'];
  dataSource!: MatTableDataSource<Trip>;
  private tripsSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.tripsSubscription = this.dataService.getTrips().subscribe(trips => {
      this.dataSource = new MatTableDataSource(trips);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    if (this.tripsSubscription) {
      this.tripsSubscription.unsubscribe();
    }
  }

  addTrip() {
    this.router.navigate(['/trip-form']);
  }

  viewTrip(trip: Trip) {
    this.router.navigate(['/trip-detail', trip.id]);
  }

}
