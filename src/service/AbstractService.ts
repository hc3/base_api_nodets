
export default abstract class AbstractService {

    private instanceModel:any;
    
    constructor(instanceModel:any) {
        this.instanceModel = instanceModel;
    }

    async list() {
        const list = await this.instanceModel.find();
        return list;
    }
    async insert(request:any) {
        try {
            const response = await this.instanceModel.save(request);
            return response;
        } catch(err) {
            return err;
        }
       
    }
    
    async update(id:string, request:any) {
        try {
            let entity = await this.instanceModel.findOne(id);
            entity = Object.assign(entity, request);
            const response = await this.instanceModel.save(entity);
            return response;
        } catch(err) {
            return err;
        }
    }
    
    async findOne(id:string) {
        const response = await this.instanceModel.findOne(id);
        return response;
    }
    /*

    isAuthorized() {

    }

    isSameUser() {

    }

    notAuthorized() {

    }

    catchError() {
        
    }
    */
}