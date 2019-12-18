import { Component, OnInit } from '@angular/core';

import { TaskService, task } from '../task.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Array<task> = [];
  todayTasks: Array<task> = [];
  search: string = '';

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.tasks = this.taskService.listTasks();
    this.updateToday();
  }

  updateToday() {
    this.todayTasks = this.taskService.listTasks().filter(t => {
      const sameDay = (first: Date, second: Date) => (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
      )

      return sameDay(t.date, new Date());
    })
    console.log('LOG: TaskListComponent -> updateToday -> this.todayTasks', this.todayTasks);
  }

  addTask(task: task): void {
    this.taskService.addTask(task);
    this.updateToday();
    this.orderBy('priority');
  }

  removeTask(id): void {
    this.taskService.deleteTask(id);
    this.updateToday();
  }

  editTask(task: task): void {
    this.taskService.editTask(task);
    this.updateToday();
  }

  navigateToDetails(task): void {
    this.router.navigate(['/task', { ...task }]);
  }

  orderBy(order: string): void {
    this.taskService.orderBy(order);
  }

  openDialog(task?: task): void {
    let configDialog = {
      width: '60%',
      data: task || null
    }

    const dialogRef = this.dialog.open(AddModalComponent, configDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      if (!task) {
        this.addTask(result);
      }
      else {
        this.editTask(result);
      }
    });
  }

  searchTerm(): void {
    this.taskService.searchByTitle(this.search)
  }

}
