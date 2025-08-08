import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../coreModules/material.module';
import { ProfileService } from '../../services/profile-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule,
    MaterialModule,],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  selectedImage: File | null = null;

  user: any = {};  // Populate from getProfile()

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    // Initialize the form with FormBuilder
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [''],
      profilePicture: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      address: [''],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data.user;
      this.profileForm.patchValue(data.user);
      console.log('Profile data loaded:', this.user);
      
    });
  }

  uploadPicture() {
    if (!this.selectedImage) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = (reader.result as string);
      this.profileService.uploadProfilePicture(base64Image).subscribe((response) => {
        this.loadProfile();  // Refresh profile

        alert(response.message || 'Profile picture uploaded successfully.');
      });
    };
    reader.readAsDataURL(this.selectedImage);
  }

  saveProfile() {
    const updatedData = this.profileForm.getRawValue(); // Include disabled fields if needed
    this.profileService.updateProfile(updatedData).subscribe(response => {
      alert(response.message || 'Profile updated successfully.');
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        // Send to backend
        this.profileService.uploadProfilePicture(base64Image).subscribe(() => {
          this.loadProfile(); // Reload to show updated picture        
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
