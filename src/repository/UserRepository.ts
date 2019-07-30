import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    async findOneByUsername(username:string) {
        return await this.findOne({where: {username:username} })
    }
    
}