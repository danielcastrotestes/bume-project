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
  newTask: task;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.tasks = this.taskService.listTasks();
  }

  addTask(task: task): void {
    this.taskService.addTask(task);
  }

  removeTask(id): void {
    this.taskService.deleteTask(id);
  }

  editTask(task: task): void {
    this.taskService.editTask(task);
  }

  navigateToDetails(id): void {
    this.router.navigateByUrl(`task/${id}`)
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

}
