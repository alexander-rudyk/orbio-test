import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column()
  driveId: string;

  @Column()
  driveUrl: string;
}
