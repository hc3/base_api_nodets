import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err:any, hash:any) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err:any, res:any) => {
                if(err) return reject(err);
                resolve(res === true);
            });
        });
    }


    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({
        type:'varchar',
        length:'150',
        unique:true,
        nullable:false
    })
    public email: string;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password: string;

    @Column({
        type:'varchar',
        length:'150',
        unique:true,
        nullable:false
    })
    public username: string;

    @Column({
        nullable:false,
        default:true
    })
    isEnabled: boolean;

    @Column({
        nullable:false,
        default:new Date()
    })
    lastLoginAt: Date;

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(){
        this.password = await bcrypt.hash(this.password,10);
    }

}
