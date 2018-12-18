const Status = require('../models/status');
exports.getStatuses = async (req, res, next) => {
    try {
        const statuses = await Status.find({active: true});
        return res.status(200).json({
            data: statuses
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching statuses',
            error
        })
    }
}
exports.getStatus = async (req, res, next) => {
    try {
        const statusId = req.params.id;
        const status = await Status.findById(statusId);
        return res.status(200).json({
            data: status
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the status',
            error
        })
    }
}
exports.addStatus = async (req, res, next) => {
    try {
        const status = new Status({
            title: req.body.title,
            active: true
        })
        await status.save()
        return res.status(200).json({
            message: 'Status created successfuly!',
            data: status
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error saving the status',
            error
        })
    }
}
exports.updateStatus = async (req, res, next) => {
    try {
        const statusId = req.params.id;
        const updatedStatus = await Status.findByIdAndUpdate(statusId, req.body);
        return res.status(200).json({
            message:'Information updated successfully!',
            data: updatedStatus,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error changing the information',
            error
        })
    }
}
exports.removeStatus = async (req, res, next) => {
    try {
        const statusId = req.params.id;
        await Status.findByIdAndRemove(statusId);
        return res.status(200).json({
            message:'Status removed',
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error removing the status',
            error
        })
    }
}