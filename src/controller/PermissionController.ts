import { JsonController, Get, Post, Body, Authorized } from "routing-controllers";

@JsonController('/permissions')
export class PermissionController {
    constructor(
        
    ) { }

    @Get()
    @Authorized()
    public list() {
        return null;
    }

    @Post()
    @Authorized()
    public insert(@Body() permission:any) {
        return permission;
    }
    
}