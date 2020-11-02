import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserData } from '../model/form.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  users: UserData[] = [];

  userSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.dataService.userUpdated.subscribe((data) => {
      this.users = data;
    });
    this.users = this.dataService.fetchUsers();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onUserSelect(id: number) {
    this.router.navigate([`${id}/edit`]);
  }
}
