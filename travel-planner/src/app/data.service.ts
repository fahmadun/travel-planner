import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
}

export interface Expense {
  id: number;
  tripId: number;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private trips: Trip[] = [
    { id: 1, name: 'Trip to Paris', destination: 'Paris, France', startDate: new Date('2024-08-01'), endDate: new Date('2024-08-10') },
    { id: 2, name: 'Trip to Tokyo', destination: 'Tokyo, Japan', startDate: new Date('2024-09-15'), endDate: new Date('2024-09-25') },
  ];

  private expenses: Expense[] = [
    { id: 1, tripId: 1, description: 'Flight tickets', category: 'Travel', amount: 500, date: new Date('2024-08-01') },
    { id: 2, tripId: 1, description: 'Hotel booking', category: 'Accommodation', amount: 1200, date: new Date('2024-08-01') },
    { id: 3, tripId: 1, description: 'Dinner at a restaurant', category: 'Food', amount: 100, date: new Date('2024-08-02') },
    { id: 4, tripId: 1, description: 'Museum tickets', category: 'Entertainment', amount: 50, date: new Date('2024-08-03') },
    { id: 5, tripId: 1, description: 'Souvenirs', category: 'Shopping', amount: 75, date: new Date('2024-08-04') },
  ];

  private tripsSubject = new BehaviorSubject<Trip[]>(this.trips);
  trips$ = this.tripsSubject.asObservable();

  private expensesSubject = new BehaviorSubject<Expense[]>(this.expenses);
  expenses$ = this.expensesSubject.asObservable();

  constructor() { }

  getTrips(): Observable<Trip[]> {
    return this.trips$;
  }

  addTrip(tripData: { destination: string, startDate: Date, endDate: Date }) {
    const newId = this.trips.length > 0 ? Math.max(...this.trips.map(t => t.id)) + 1 : 1;
    const newTrip: Trip = {
      id: newId,
      name: `Trip to ${tripData.destination}`,
      destination: tripData.destination,
      startDate: tripData.startDate,
      endDate: tripData.endDate
    };
    this.trips.push(newTrip);
    this.tripsSubject.next([...this.trips]);
  }

  getExpenses(tripId: number): Expense[] {
    return this.expenses.filter(expense => expense.tripId === tripId);
  }

  addExpense(expense: Omit<Expense, 'id'>) {
    const newExpense = { ...expense, id: this.expenses.length + 1 };
    this.expenses.push(newExpense);
    this.expensesSubject.next(this.expenses);
  }

  updateExpense(updatedExpense: Expense) {
    const index = this.expenses.findIndex(expense => expense.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.expensesSubject.next(this.expenses);
    }
  }
}
