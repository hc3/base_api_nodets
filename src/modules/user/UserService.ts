import AbstractService from "../AbstractService";
import { Service } from "typedi";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from "./UserRepository";
import userFactory from './UserFactory';


@Service()
export default class UserService extends AbstractService {

    constructor(
        @OrmRepository() public repository: UserRepository
    ) 
    {
        super(repository,userFactory);
    }

    public listar() {
        return [
            {
                nome:'eliel'
            }
        ]
    }
}