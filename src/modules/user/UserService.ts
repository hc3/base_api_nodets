import { Service } from "typedi";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from "./UserRepository";
import AbstractService from "../AbstractService";
import userFactory from './UserFactory';


@Service()
export class UserService extends AbstractService {

    constructor(
        @OrmRepository() public repository: UserRepository
    ) 
    {
        super(repository,userFactory);
    }

}