import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("permission")
export class Permission {

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
        nullable:false,
        default:true
    })
    isEnabled: boolean
}