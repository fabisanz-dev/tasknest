import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '../users/users.module'
import { Task } from './entities/task.entity'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), PassportModule, UsersModule],
  exports: [TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
