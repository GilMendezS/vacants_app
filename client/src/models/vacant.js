export default class Vacant{
    constructor(_id, title, company, salary,description,
        contractId,
        statusId,
        categoryId,
        creatorId){
            this._id = _id,
            this.title = title;
            this.company = company;
            this.salary = salary;
            this.description = description;
            this.contractId = contractId;
            this.statusId = statusId;
            this.categoryId = categoryId;
            this.creatorId = creatorId;
        }
}