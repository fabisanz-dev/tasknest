import { Test, TestingModule } from '@nestjs/testing'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'

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

  it('should return an array of tasks', async () => {
    const user: User = {
      id: '54153a4e-4fcc-4493-96ac-8b9e773b6644',
      name: 'fabian',
      email: 'fabi@email.com',
      password: 'test123'
    }
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
})
