export default class User {
    constructor(_id, name, lastname, email, active,phones,lookingFor,password,cv, company){
        this._id = _id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.active = active;
        this.phones = phones;
        this.lookingFor = lookingFor;
        this.password = password;
        this.cv = cv;
        this.company = company;
    }
}