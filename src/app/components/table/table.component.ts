import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { PersonService } from '../../../person.service';
import { User } from '../../../models/users-model';
import { MatDialog } from '@angular/material/dialog';

/**
 * @title user table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit, OnInit {
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
  users: User[];
  constructor(
    private PersonService: PersonService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.refresh();
    this.PersonService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');

      const x = this.dataSource.data.filter((value, key) => {
        if (value.id == result.id) {
          value = result;
        }
        return true;
      });
      this.dataSource.data = x;
    });
  }

  deleteUser(index: number) {
    const filtredData = this.dataSource.data.filter((el) => el.id !== index);
    this.dataSource.data = filtredData;
  }

  refresh() {
    this.PersonService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
