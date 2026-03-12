import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { TripFormComponent } from './trip-form/trip-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trip-form', component: TripFormComponent },
  { path: 'trip-detail/:id', component: TripDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense-form', component: ExpenseFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
