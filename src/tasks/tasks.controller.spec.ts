import { Test, TestingModule } from '@nestjs/testing'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

enum TaskStatus {
  TODO = 'toDo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

describe('TasksController', () => {
  let controller: TasksController
  let service: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: 'TaskRepository',
          useClass: Repository
        },
        {
          provide: 'UserRepository',
          useClass: Repository
        }
      ],
      controllers: [TasksController]
    }).compile()

    controller = module.get<TasksController>(TasksController)
    service = module.get<TasksService>(TasksService)
  })

  const user: User = {
    id: '54153a4e-4fcc-4493-96ac-8b9e773b6644',
    name: 'fabian',
    email: 'fabi@email.com',
    password: 'test123'
  }
  it('should return an array of tasks', async () => {
    const result: Task[] = [
      {
        id: '6045c2e3-9bc0-4791-8fd7-0ab5bf512317',
        description: 'todo one',
        status: TaskStatus.TODO
      },
      {
        id: '37f20aae-2f2e-48ac-bfc0-6a04c5153ac8',
        description: 'todo one',
        status: TaskStatus.TODO
      },
      {
        id: '0785ad5a-004e-46be-a77e-2383bf2a170d',
        description: 'todo one',
        status: TaskStatus.TODO
      }
    ]
    jest.spyOn(service, 'findAll').mockResolvedValue(Promise.resolve(result))

    expect(await controller.findAll({ user: user })).toBe(result)
  })

  describe('createTask', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        description: 'Tarea de prueba',
        status: TaskStatus.TODO,
        user: 'c9f18a3b-2564-4e11-a3a1-2ff9b5f4d5d9'
      }

      const createdTask: Task = {
        id: '1',
        description: 'Tarea de prueba',
        status: TaskStatus.TODO,
        user
      }

      jest.spyOn(service, 'create').mockResolvedValue(createdTask)

      expect(await controller.create(createTaskDto)).toBe(createdTask)
    })
  })

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const taskId = 'bfe6bdfa-f06c-4030-9f48-d0b89a1c1f7b'
      const updateTask: Task = {
        id: user.id,
        description: 'Updated task',
        status: TaskStatus.IN_PROGRESS,
        user
      }

      const updateTaskDto: UpdateTaskDto = {
        description: 'Updated task',
        status: TaskStatus.IN_PROGRESS,
        user: user.id
      }

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ id: taskId, ...updateTask })

      expect(await controller.update(taskId, updateTaskDto)).toStrictEqual({
        id: taskId,
        ...updateTask
      })
    })
  })
})
