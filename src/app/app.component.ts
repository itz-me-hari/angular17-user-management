import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      User Management
      <span class="spacer"></span>
      <button *ngIf="isLoggedIn" mat-raised-button color="warn" (click)="confirmLogout()">
        Logout
      </button>
    </mat-toolbar>

    <div class="container"><router-outlet></router-outlet></div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,    
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet     
  ]
})


export class AppComponent { 
  constructor(private router: Router) { 
  }
  confirmLogout() {
  const confirmed = confirm('Are you sure you want to logout?');
  if (confirmed) {
     this.router.navigate(['/login']);
     sessionStorage.removeItem('isLoggedIn');
  }
}

get isLoggedIn(): boolean {
  return sessionStorage.getItem('isLoggedIn') === 'true';
}
}
