import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./Permission";


@Entity("role")
export class Role {

    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        unique:true,
        nullable:true,
        length:100,
        type:'varchar'
    })
    public name: string
    
    @Column({
        nullable:true,
        type:'varchar'
    })
    public description: string

    @Column({
        nullable:false,
        default:true
    })
    isEnabled: boolean

    @ManyToMany(_type => Permission, { cascade:false })
    @JoinTable({
        name:'role_has_permission',
        joinColumn:{ name:'role_id',referencedColumnName:'id' },
        inverseJoinColumn:{ name:'permission_id',referencedColumnName:'id' }
    })
    permissions:Permission[]
}