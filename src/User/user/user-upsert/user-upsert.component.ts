import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/shared/data-service.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {

  userForm: FormGroup;
  selectedUser: any; // Add this property to store the selected user
  userAlreadyExists = false; // Flag to track whether the user already exists
  formSubmitted = false; // Track whether the form is submitted

  constructor(private fb: FormBuilder, private dataService: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();

    // Subscribe to selectedUser changes
    this.dataService.selectedUser$.subscribe((user) => {
      this.selectedUser = user;

      // If a user is selected, update the form
      if (user) {
        this.userForm.patchValue(user);
      } else {
        this.userForm.reset();
      }
    });

    this.clearErrorMessage();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit(): void { 
    if (this.userForm.valid) {
      const user = this.userForm.value;

      // Check if the user with the same email already exists
      if (this.isUserAlreadyExists(user)) {
        this.userAlreadyExists = true;
        return;
      } else {
        this.userAlreadyExists = false; // Clear the error message if email doesn't exist
      }

      // Check if an existing user is being updated
      if (this.selectedUser) {
        user.id = this.selectedUser.id;
      }

      this.dataService.saveOrUpdateUser(user).subscribe(() => {
        this.dataService.notifyUserListUpdate();

        // Navigate back to the UserListComponent after saving/updating
        this.router.navigate(['/users']);

      });
    } else {
      // Form is not valid, show a general error message or perform other actions
      window.alert('Please fill out the form completely.')
       
    }
  }

  isUserAlreadyExists(newUser: any): boolean {
    const existingUsers = this.dataService.getUsersFromLocal();

    // Check for existing email
    const emailExists = existingUsers.some(
      (user) => user.email === newUser.email && user.id !== this.selectedUser?.id
    );

    // Check for existing phone
    const phoneExists = existingUsers.some(
      (user) => user.phone === newUser.phone && user.id !== this.selectedUser?.id
    );

    // Return true if either email or phone exists
    return emailExists || phoneExists;
  }

  clearErrorMessage(): void {
    this.userAlreadyExists = false;
    this.formSubmitted = false;
  }
}
