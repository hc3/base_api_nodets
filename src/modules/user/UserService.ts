import AbstractService from "../AbstractService";
import { Service } from "typedi";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from "./UserRepository";


@Service()
export default class UserService extends AbstractService {

    constructor(
        @OrmRepository() public repository: UserRepository
    ) 
    {
        super(repository,null);
    }
}