import { Task } from '../../tasks/entities/task.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  name: string

  @Column('text', {
    unique: true
  })
  email: string

  @Column('text', {
    select: false
  })
  password: string

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks?: Task
}
