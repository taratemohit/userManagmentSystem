import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from 'src/User/user/user-list/user-list.component';
import { UserUpsertComponent } from 'src/User/user/user-upsert/user-upsert.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'user-upsert', component: UserUpsertComponent },
  { path: 'user-upsert/:id', component: UserUpsertComponent }, // Route with 'id' parameter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
