import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PersonService } from '../../../person.service';
import { IUser } from '../../../models/users-model';

/**
 * @title user table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'edit',
    'delete',
  ];
  dataSource: any;
  user: any;
  users: IUser[];
  constructor(private PersonService: PersonService, public dialog: MatDialog) {}
  @ViewChild(MatSort) sort: MatSort;

  //Getting all users
  getUsers() {
    this.PersonService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  //Editing user by it's ID (subscribing on closing dialog to execute update)

  editUser(user: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.PersonService.updateUser(result).subscribe((response) =>
        this.getUsers()
      );
    });
  }

  //Deleting user by ID

  deleteUser(user: IUser) {
    const id = user.id;
    this.PersonService.deleteUser(id).subscribe((user) => {
      this.getUsers();
    });
  }
}
