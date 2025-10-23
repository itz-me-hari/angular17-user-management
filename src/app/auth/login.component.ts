import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  template: `
  <div style="max-width:420px;margin:48px auto">
    <form [formGroup]="form" (ngSubmit)="submit()">
      <h2>Login</h2>
      <mat-form-field style="width:100%"><input matInput placeholder="Username" formControlName="username" /></mat-form-field>
      <mat-form-field style="width:100%"><input matInput placeholder="Password" type="password" formControlName="password" /></mat-form-field>
      <div style="text-align:right"><button mat-raised-button color="primary" type="submit">Sign in</button></div>
    </form>
  </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private router: Router) { }
  submit() {
    if (this.form.valid)
      if (this.form.value.username == 'admin' && this.form.value.password == 'admin123') {
        alert('Login successful');
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/users']);
      } else {
        alert('Invalid credentials');
      }
  }
}
