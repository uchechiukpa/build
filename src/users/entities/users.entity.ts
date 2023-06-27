import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({unique: true})
    email: string

    @Column()
    bio: string

    @Column()
    password: string

    @Column()
    salt: string

    @Column()
    displayPicture: string;

    @Column({type: 'timestamp'})
    dateCreated: Date

    @Column({type: 'timestamp',})
    dateUpdated: Date

    @Column({type: 'timestamp'})
    lastLogin: Date

    @Column()
    isActive: boolean
}