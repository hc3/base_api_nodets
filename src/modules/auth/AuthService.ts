import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../user/UserRepository";

@Service()
export class AuthService {
    
    constructor(
        @OrmRepository() public repository: UserRepository
    ) {}

    public login(user:any) {
        console.log('user: ',user);
    }
}