import { Injectable } from '@angular/core';

export interface task {
  id?: number;
  title: string;
  desc: string;
  date?: Date;
  priority: number;
  done: boolean;
}

const ARRAY_TASKS: Array<task> = [
  {
    id: 0,
    title: 'Pré Cadastrada 1',
    desc: 'Tarefa pré cadastrada 1',
    date: new Date('2019-12-01'),
    priority: 1,
    done: true
  },
  {
    id: 1,
    title: 'Pré Cadastrada 2',
    desc: 'Tarefa pré cadastrada 2',
    date: new Date('2019-12-02'),
    priority: 2,
    done: true
  },
  {
    id: 2,
    title: 'Pré Cadastrada 3',
    desc: 'Tarefa pré cadastrada 3',
    date: new Date('2019-12-03'),
    priority: 3,
    done: false
  },
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Array<task>;

  constructor() {
    this.tasks = ARRAY_TASKS;
  }

  addTask(task: task): Array<task> {
    task.date = new Date();
    task.id = task.date.getTime();

    if (!task.title || !task.title.length) { task.title = `Tarefa ${task.id}` }
    if (!task.priority) { task.priority = 1 }
    if (!task.done) { task.done = false }

    this.tasks.push(task);
    return this.tasks;
  }

  deleteTask(id: number): Array<task> {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
    return this.tasks;
  }

  editTask(infos: task): Array<task> {
    const index = this.tasks.findIndex(task => task.id === infos.id)
    const old = this.tasks[index];
    this.tasks[index] = { ...old, ...infos }
    return this.tasks;
  }

  listTasks(): Array<task> {
    return this.tasks;
  }

  // searchByTitle(title: string): task {
  //   return true;
  // }

  // getTask(id: number): task {
  //   return true;
  // }

  orderBy(order: string): void {
    if (!order) { return }
    this.tasks = this.tasks.sort((task1, task2) => {
      if (task1[order] === undefined || task2[order] === undefined) { return 0; }
      if (task1[order] > task2[order]) { return -1; }
      if (task1[order] < task2[order]) { return 1; }
      return 0;
    })
  }

}
