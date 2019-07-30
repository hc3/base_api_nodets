import { Service } from "typedi";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repository/UserRepository';
import AbstractService from "./AbstractService";


@Service()
export class UserService extends AbstractService {

    constructor(
        @OrmRepository() public repository: UserRepository
    ) 
    {
        super(repository);
    }

}