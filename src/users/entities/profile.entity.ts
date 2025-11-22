import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'profiles',
})
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name', length: 255 })
  name: string;

  @Column({ type: 'varchar', name: 'last_name', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', name: 'avatar', length: 255, nullable: true })
  avatar: string | null;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
