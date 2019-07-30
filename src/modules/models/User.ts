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
    public id!: string;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName!: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName!: string;

    @IsNotEmpty()
    @Column()
    public email!: string;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password!: string;

    @IsNotEmpty()
    @Column()
    public username!: string;

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }

}
