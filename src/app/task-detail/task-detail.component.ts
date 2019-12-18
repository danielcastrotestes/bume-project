import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tasks } from '../tasks';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.task = tasks[params.get('id')];
      console.log('LOG: TaskDetailComponent -> ngOnInit -> this.task', this.task);
    })
  }

}
