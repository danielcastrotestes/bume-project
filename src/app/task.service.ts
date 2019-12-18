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
  initialList: Array<task>;

  constructor() {
    this.initialList = ARRAY_TASKS;
    this.orderBy('priority')
    this._setList();
  }

  _setList(): void {
    if (!this.tasks) { this.tasks = [] }
    this.tasks.splice(0, this.tasks.length);
    this.initialList.forEach(task => {
      this.tasks.push(task)
    })
  }

  addTask(task: task): Array<task> {
    task.date = new Date();
    task.id = task.date.getTime();

    if (!task.title || !task.title.length) { task.title = `Tarefa ${task.id}` }
    if (!task.desc || !task.desc.length) { task.desc = '' }
    if (!task.priority) { task.priority = 1 }
    if (!task.done) { task.done = false }

    console.log('LOG: TaskService -> task', task);
    this.initialList.push(task);
    this._setList();
    return this.initialList;
  }

  deleteTask(id: number): Array<task> {
    const index = this.initialList.findIndex(task => task.id === id);
    this.initialList.splice(index, 1);
    this._setList();
    return this.initialList;
  }

  editTask(infos: task): Array<task> {
    const index = this.initialList.findIndex(task => task.id === infos.id)
    const old = this.initialList[index];
    this.initialList[index] = { ...old, ...infos };
    this._setList();
    return this.initialList;
  }

  listTasks(): Array<task> {
    return this.tasks;
  }

  searchByTitle(title: string): Array<task> {
    function _normalizeExpression(expression = '') {
      return expression.replace(/\s/g, '').toLowerCase()
    }

    const filteredArray = this.initialList.filter(task => {
      if (!title.length) { return true }
      const titleNorm = _normalizeExpression(task.title);
      const descNorm = _normalizeExpression(task.desc);
      const termNorm = _normalizeExpression(title);
      const regex = new RegExp(`${termNorm}`);
      const match = (regex.test(titleNorm) || regex.test(descNorm))
      return match;
    })

    this.tasks.splice(0, this.tasks.length);
    filteredArray.forEach(task => {
      this.tasks.push(task)
    })

    return this.tasks;

  }

  orderBy(order: string): void {
    if (!order) { return }
    this.initialList = this.initialList.sort((task1, task2) => {
      if (task1[order] === undefined || task2[order] === undefined) { return 0; }
      if (task1[order] > task2[order]) { return -1; }
      if (task1[order] < task2[order]) { return 1; }
      return 0;
    })
    this._setList();
  }

}
