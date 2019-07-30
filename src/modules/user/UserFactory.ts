function make(object:any) {
    return Object.assign({},object.id ? {id:object.id} : null,
                            object.firstName ? {firstName:object.firstName} : null,
                            object.lastName ? {lastName:object.lastName} : null,
                            object.email ? {email:object.email} : null,
                            object.password ?  {password:object.password} : null,
                            object.username ? {username:object.username} : null);
}

function change(oldObject:any, newObject:any) {
    return Object.assign(oldObject, newObject);
}

const factory = {
    make,
    change
}

export default factory;