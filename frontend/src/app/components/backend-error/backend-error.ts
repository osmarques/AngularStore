import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health.service';

@Component({
  selector: 'app-backend-error',
  imports: [CommonModule],
  templateUrl: './backend-error.html',
  styleUrl: './backend-error.css'
})
export class BackendError {
  checking = false;

  constructor(private healthService: HealthService) { }

  checkConnection(): void {
    this.checking = true;
    this.healthService.checkBackendHealth().subscribe({
      next: (isHealthy) => {
        this.checking = false;
        if (isHealthy) {
          window.location.reload();
        }
      },
      error: () => {
        this.checking = false;
      }
    });
  }
}