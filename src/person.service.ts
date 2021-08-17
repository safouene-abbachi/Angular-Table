import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './models/users-model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  // Using Json-server library for creating fake data
  //Just run "npx json-server --watch db.json" under the src directory and it will generate json data from the db.json

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }
  //Update user
  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>('http://localhost:3000/users/' + user.id, user);
  }
  //Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
