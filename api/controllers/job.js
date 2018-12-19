const Job = require('../models/job');

exports.getJobsOfUser = async(req, res, next) => {
    try {
        const jobs = await Job.find({userId : req.user._id})
        return res.status(200).json({
            data: jobs
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching jobs',
            error
        })
    }
}
exports.addJob = async(req, res, next) => {
    const new_job = new Job({
        title: req.body.title,
        company: req.body.company,
        current_job: req.body.current_job,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        userId: req.user._id
    })
    try {
        await new_job.save()
        return res.status(200).json({
            message: 'Job added',
            data: new_job
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the job',
            error
        })
    }
}
exports.removeJob = async(req, res, next) => {
    try {
        const jobId = req.params.id;
        await Job.findByIdAndRemove(jobId);
        return res.status(200).json({
            message: 'Job removed successfully!'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the job',
            error
        })
    }
}