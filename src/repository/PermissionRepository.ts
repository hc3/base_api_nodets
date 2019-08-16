import { EntityRepository, Repository } from "typeorm";
import { Permission } from "../model/Permission";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

}