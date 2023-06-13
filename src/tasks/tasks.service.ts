import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    //   Define a temporary array to hold the result
    let tasks = this.getAllTasks();

    //   Do something with status
    if (status) {
      //..
      tasks = tasks.filter((task) => task.status === status);
    }
    //   Do something with search
    if (search) {
      //..
      tasks = tasks.filter((task) => {
        // if (task.title.includes(search) || task.description.includes(search)) {
        //   return true;
        // }
        //
        // return false;

        // The simple method
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    //   Return final result
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    // LONG METHOD TO DELETE TASK
    // const task = this.tasks.find((task) => task.id === id);
    //
    // const taskIndex = this.tasks.indexOf(task);
    //
    // if (taskIndex > -1) {
    //   //   Only splice array when item is found
    //   this.tasks.splice(taskIndex, 1); // 2nd parameter means remove one item only
    // }

    // SHORT METHOD TO DELETE TASK
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
