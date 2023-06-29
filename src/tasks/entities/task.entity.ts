import { User } from '../../users/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

enum TaskStatus {
  TODO = 'toDo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text'
  })
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO
  })
  status?: TaskStatus

  @ManyToOne(() => User, (user) => user.tasks)
  user?: User
}
