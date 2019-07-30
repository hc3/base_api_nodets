
export default abstract class AbstractService {

    private factory:any;
    private instanceModel:any;
    
    constructor(instanceModel:any, factory:any) {
        this.instanceModel = instanceModel;
        this.factory = factory;
    }

    async list() {
        const list = await this.instanceModel.find();
        return list;
    }
    async insert(request:any) {
        const entity = this.factory.make(request);
        try {
            const response = await this.instanceModel.save(entity);
            return response;
        } catch(err) {
            return err;
        }
       
    }
    
    async update(id:string, request:any) {
        try {
            let entity = await this.instanceModel.findOne(id);
            entity = this.factory.change(entity, request);
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