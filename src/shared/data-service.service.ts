import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Add this import statement

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private users: any[] = [];
  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser$: Observable<any> = this.selectedUserSubject.asObservable();

  private userListUpdateSubject = new BehaviorSubject<void>(undefined);
  userListUpdate$: Observable<void> = this.userListUpdateSubject.asObservable();

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsersFromLocal(): any[] {
    return this.users; // Return the local array of users
  }

  saveOrUpdateUser(user: any): Observable<any> {
    if (user.id) {

      // If user has an ID, it's an update
      return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
    } else {
      // If user has no ID, it's a new user
      return this.http.post<any>(this.apiUrl, user);
    }



  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  setSelectedUser(user: any): void {
    this.selectedUserSubject.next(user);
  }

  notifyUserListUpdate(): void {
    this.userListUpdateSubject.next();
  }
}
