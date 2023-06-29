import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { User } from '../users/entities/user.entity'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { user, ...taskData } = createTaskDto
    try {
      const userFound = await this.existingUser(user)

      const task = this.taskRepository.create({
        ...taskData,
        user: userFound
      })
      return this.taskRepository.save(task)
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(userId: string) {
    return await this.taskRepository.find({ where: { user: { id: userId } } })
  }

  findOne(id: number) {
    return `This action returns a #${id} task`
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { user, ...taskData } = updateTaskDto

    const userFound = await this.existingUser(user)
    const taskFound = await this.existingTask(id)

    try {
      if (taskFound) {
        taskFound.description = taskData.description
        taskFound.status = taskData.status
        taskFound.user = userFound
        return this.taskRepository.save(taskFound)
      }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async remove(id: string) {
    const taskFound = await this.existingTask(id)
    if (taskFound) {
      await this.taskRepository.remove(taskFound)
      return {
        msg: `Task with ID:${taskFound.id} removed`
      }
    }
  }

  private async existingUser(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  private async existingTask(id: string) {
    const task = await this.taskRepository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    return task
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    console.error(error)
    throw new InternalServerErrorException('Please check server logs')
  }
}
