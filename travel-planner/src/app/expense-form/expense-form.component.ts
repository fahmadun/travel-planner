import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, Expense } from '../data.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  isEdit = false;
  categories = ['Travel', 'Accommodation', 'Food', 'Entertainment', 'Shopping', 'Other'];
  tripId!: number;
  expenseId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params['expense']) {
        this.isEdit = true;
        const expense = JSON.parse(params['expense']);
        this.expenseId = expense.id;
        this.tripId = expense.tripId;
        this.expenseForm.patchValue(expense);
      } else if (params['tripId']) {
        this.tripId = +params['tripId'];
      }
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      if (this.isEdit) {
        this.dataService.updateExpense({ ...this.expenseForm.value, id: this.expenseId, tripId: this.tripId });
      } else {
        this.dataService.addExpense({ ...this.expenseForm.value, tripId: this.tripId });
      }
      this.router.navigate(['/trip-detail', this.tripId]);
    }
  }

  onCancel() {
    this.router.navigate(['/trip-detail', this.tripId]);
  }
}
