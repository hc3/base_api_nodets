import { Exclude } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import Container from 'typedi'
import { PasswordEncoder } from '../common/password-encoder'
import { Role } from './Role';

@Entity("user")
export class User {

    async updatePassword(password:string) {
        this.password = await Container.get(PasswordEncoder).encode(password)
        this.lastChangedAt = new Date()
    }

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName: string

    @Column({
        type:'varchar',
        length:'150',
        unique:true,
        nullable:false
    })
    public email: string

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password: string

    @Column({
        type:'varchar',
        length:'150',
        unique:true,
        nullable:false
    })
    public username: string

    @Column({
        nullable:false,
        default:true
    })
    isEnabled: boolean

    @Column({
        nullable:false,
        default:new Date()
    })
    lastLoginAt: Date

    @Column({
        nullable:false,
        default:new Date()
    })
    lastChangedAt: Date

    @ManyToMany(_type => Role, { cascade:true })
    @JoinTable({
        name:'user_has_role',
        joinColumn:{ name:'user_id', referencedColumnName:'id'},
        inverseJoinColumn:{ name:'role_id', referencedColumnName:'id'}
    })
    roles:Role[]

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`
    }

    @BeforeInsert()
    public async hashPassword(){
        this.password = await Container.get(PasswordEncoder).encode(this.password)
    }

}
