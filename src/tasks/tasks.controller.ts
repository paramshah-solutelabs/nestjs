/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param , Delete, Patch, Query} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {


    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
        //if,we have any query params, we will filter the tasks
        //or else we will return all tasks

        if(Object.keys(filterDto).length>0){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }

    }

    @Get(":id")
    getTaskById(@Param("id") id:string):Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete(":id")
    deleteTaskById(@Param("id") id:string):Task{
        return this.tasksService.deleteTaskById(id);   
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto):Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch(":id/status")
    updateTaskStatus(@Param("id") id:string, @Body("status") status:TaskStatus):Task{
        return this.tasksService.updateTaskStatus(id, status);
    }
}


