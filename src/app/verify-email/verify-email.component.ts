import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  token: string | null = null;
  verificationMessage = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token) {
      this.authService.verifyEmail(this.token).subscribe(
        (response) => {
          this.verificationMessage = response.message;
        },
        (error) => {
          this.verificationMessage = error.error.message;
        }
      );
    } else {
      this.verificationMessage = 'Invalid verification link.';
    }
  }
}
