import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { PersonService } from '../../../person.service';
import { IUser } from '../../../models/users-model';
import { MatDialog } from '@angular/material/dialog';

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

  private getUsers() {
    this.PersonService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  editUser(user: any): void {
    const updatedPerson = this.dataSource.data;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.PersonService.updateUser(this.user).subscribe((response) =>
        console.log(response)
      );
      // console.log('The dialog was closed');
      // const index = this.dataSource.data.findIndex((el) => el.id === result.id);
      // updatedPerson[index] = result;
      // this.dataSource.data = updatedPerson;
    });
  }

  deleteUser(index: number) {
    const filtredData = this.dataSource.data.filter((el) => el.id !== index);
    this.dataSource.data = filtredData;
  }

  removeProduct(user: IUser) {
    const id = user.id;

    this.PersonService.deleteUser(id).subscribe((user) => {
      this.getUsers();
    });
  }
}
