import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  updatedDisplayName: string='';
  userProfile: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = 1; // Replace this with the actual user ID
    this.userService.getUserProfile(userId).subscribe(
      (profile) => {
        this.userProfile = profile;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  updateProfile(): void {
    const userId = 1; // Replace this with the actual user ID
    const updatedProfileData = {
      display_name: this.updatedDisplayName,
      // Add other updated user profile fields here
    };

    this.userService.updateUserProfile(userId, updatedProfileData).subscribe(
      () => {
        // Refresh the user profile data after a successful update
        this.userService.getUserProfile(userId).subscribe(
          (profile) => {
            this.userProfile = profile;
          },
          (error) => {
            console.error('Error fetching updated user profile:', error);
          }
        );
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }

}
