import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
