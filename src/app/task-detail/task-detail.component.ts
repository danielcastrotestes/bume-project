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
      this.task = {}
      params.keys.map(val => {
        this.task[val] = params.get(val);
      })
    })
  }

}
