import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Request
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Auth } from '../users/decorator/auth.decorator'
import { User } from '../users/entities/user.entity'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  @Auth()
  findAll(@Request() request: { user: User }) {
    const userId = request.user.id
    return this.tasksService.findAll(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id)
  }
}
