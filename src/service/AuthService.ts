import { Service } from "typedi"
import { UserRepository } from "../repository/UserRepository"
import { BadRequestError } from "routing-controllers"
import { PasswordEncoder } from "../common/password-encoder"
import * as jwt from "jsonwebtoken"
import { User } from "../model/User"
import { OrmRepository } from "typeorm-typedi-extensions"


export enum AuthType {
    PASSWORD = "password"
}

@Service()
export class AuthService {
    
    constructor(
        @OrmRepository() public repository: UserRepository,
        private readonly passwordEnconder: PasswordEncoder
    ) {}

    public async login(userData:any) {
        let user = await this.tryAuth(userData)
        return this.issueToken(user)
    }

    private async tryAuth(userData:any) {
        let user = await this.check(userData.email, userData.password)
        user.lastLoginAt = new Date()
        return await this.repository.save(user)
    }

    public async check(email:string,password:string) {
        
        let userEntity = await this.repository.findOne({where:{email:email} })
        
        if(userEntity) {
            if(!userEntity.isEnabled) throw new BadRequestError("USER DESABILITADO!")

            const checkPasswords = await this.passwordEnconder.verify(password, userEntity.password)
            if(checkPasswords) {
                return userEntity
            }
        }

        throw new BadRequestError("ERROR AO REALIZAR LOGIN")
    }

    async issueToken(user: User, authType: AuthType = AuthType.PASSWORD) {
        return jwt.sign({
            uid: user.id,
            sub: user.username,
            //roles: await user.getAvailableRoles(),
            authType: authType
        } as any,process.env.DB_JWT_SECRET as string,{expiresIn:'7d',audience:'auth'})
    }

}