import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HealthService } from './services/health.service';
import { BackendError } from './components/backend-error/backend-error';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, BackendError],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Angular Store';
  backendAvailable = true;
  checking = true;

  constructor(private healthService: HealthService) { }

  ngOnInit(): void {
    this.checkBackend();
  }

  private checkBackend(): void {
    this.healthService.checkBackendHealth().subscribe({
      next: (isHealthy) => {
        this.backendAvailable = isHealthy;
        this.checking = false;
      },
      error: () => {
        this.backendAvailable = false;
        this.checking = false;
      }
    });
  }
}
