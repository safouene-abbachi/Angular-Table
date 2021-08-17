import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './models/users-model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>('http://localhost:3000/users/' + user.id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
