import { Service } from "typedi";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repository/UserRepository';
import AbstractService from "./AbstractService";
import { BadRequestError } from "routing-controllers";
import { AuthService } from "./AuthService";


@Service()
export class UserService extends AbstractService {

    constructor(
        @OrmRepository() public repository: UserRepository,
        public authService: AuthService
    ) 
    {
        super(repository);
    }

    async insert(request:any) {
        try {
            if(await this.repository.findOneByUsername(request.username)) throw new BadRequestError("Usuário já existe!");
            if(await this.repository.findOneByEmail(request.email)) throw new BadRequestError("Email já existe!");
            const response = this.repository.create(request);
            return await this.repository.save(response);
        } catch(err) {
            return err;
        }
    }

    async resetPassword(request:any) {
        if(!request) throw new BadRequestError("Usuário inválido");
    }

    async changePassword(request:any) {
        try {
            let user = await this.authService.check(request.email, request.oldPassword)
            await user.updatePassword(request.newPassword);
            return await this.repository.save(user);
        } catch(err) {
            return err;
        }
    }
}