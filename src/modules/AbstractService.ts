
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
    /*

    async update() {
        let entity = this.factory.make();
        entity = this.instanceModel.findOne(entity.id);
        try {
            const response = await this.instanceModel.merge(entity);
            return response;
        } catch(err) {
            return err;
        }
    }

    async findOne() {
        let entity = this.factory.make();
        const response = await this.instanceModel.findOne(entity.id);
        return response;
    }

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