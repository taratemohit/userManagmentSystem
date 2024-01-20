import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/shared/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'actions'];

  userList: any[] = [];
  constructor(private dataService: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    // // Fetch user list from DataService
    // this.userList = []; // Replace with actual implementation
    this.fetchUserList();
  }

  onAddUser(): void {
    this.dataService.setSelectedUser(null); // Set selected user to null for adding a new user
    this.router.navigate(['/user-upsert']); // Navigate to UserUpsertComponent for adding
  }

  fetchUserList(): void {
    this.dataService.getUsers().subscribe((users) => {
      this.userList = users;
    });
  }

  onEdit(user: any): void {
    // Send user details to User-Upsert Component
    this.dataService.setSelectedUser(user);
    this.router.navigate(['/user-upsert', user.id]); // Navigate to UserUpsertComponent with id parameter
  }

  onDelete(user: any): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(user.id).subscribe(() => {
        // Fetch user list again after deletion
        this.fetchUserList();
        // Notify User-List component to refresh the list
        this.dataService.notifyUserListUpdate();
      });
    }
  }

}
