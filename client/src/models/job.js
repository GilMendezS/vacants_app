export default class Job{
    constructor(_id, title, company,
        current_job, start_date, end_date){
            this._id = _id;
            this.title = title;
            this.company = company;
            this.current_job = current_job;
            this.start_date = start_date;
            this.end_date = end_date
        }
}