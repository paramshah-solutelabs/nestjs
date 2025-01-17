/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    
    getAllTasks():Task[]{
        return this.tasks;
    }

    getTasksWithFilters(filterDto:GetTasksFilterDto):Task[]{
        const {status, search} = filterDto;

        let tasks=this.getAllTasks();

        if(status){
            tasks=tasks.filter((task)=>task.status===status);
        }

        if(search){
            tasks=tasks.filter((task)=>task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const {title, description} = createTaskDto;
        const task:Task={
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        } 
        this.tasks.push(task);
        return task;
    }

    getTaskById(id:string):Task{
        return this.tasks.find((task)=>task.id===id);
    }
    deleteTaskById(id:string):Task{
        const task = this.getTaskById(id);
        this.tasks = this.tasks.filter((task)=>task.id!==id);
        return task;
    }

    updateTaskStatus(id:string, status:TaskStatus):Task{
        const modifiedTask=this.tasks.map((task)=>task.id===id?{...task,status}:task);
        this.tasks=modifiedTask;
        return this.getTaskById(id);
    }
}
