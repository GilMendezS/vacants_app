export default class User {
    constructor(_id, 
        name, 
        lastname, 
        email, 
        active,
        phone,
        lookingFor,
        password,
        cv, 
        company,
        birthdate,
        description,
        ){
        this._id = _id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.active = active;
        this.phone = phone;
        this.lookingFor = lookingFor;
        this.password = password;
        this.cv = cv;
        this.company = company;
        this.birthdate = birthdate;
        this.description = description;
        
    }
}