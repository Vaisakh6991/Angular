import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserData } from '../model/form.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  users: UserData[] = [];
  userUpdated = new Subject<UserData[]>();

  constructor() {}

  fetchUsers() {
    return this.users.slice();
  }

  getUser(index: number): UserData {
    return this.users[index];
  }

  addUser(user: UserData) {
    this.users.push(user);
    this.userUpdated.next(this.users.slice());
  }

  updateUser(index: number, payload: UserData) {
    this.users[index] = payload;
    this.userUpdated.next(this.users.slice());
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.userUpdated.next(this.users.slice());
  }
}
