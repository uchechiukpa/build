import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({unique: true})
    description: string

    @Column({type: 'timestamp'})
    createdAt: Date

    @Column({type: 'timestamp',})
    updatedAt: Date
}
