const Vacant = require('../models/vacant');

exports.getAllVacants = async (req, res, next) => {
    try {
        const vacants = await Vacant.find().populate('applicants');
        return res.status(200).json({
            data: vacants
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching vacants :(',
            error
        })
    }
}
exports.getActiveVacants = async (req, res, next) => {
    try {
        const vacants = await Vacant.find({active : true})
        return res.status(200).json({
            data: vacants
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error fetching vacants',
            error
        })
    }
}
exports.getVacant = async (req, res, next) => {
    try {
        const vacantId = req.params.id;
        const vacant = await Vacant.findById(vacantId);
        return res.status(200).json({
            data: vacant
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the vacant :(',
            error
        })
    }
}
exports.addVacant = async(req, res, next) => {
    try {
        const vacant = new Vacant({
            title: req.body.title,
            company: req.body.company,
            salary: req.body.salary,
            description: req.body.description,
            contractId: req.body.contract,
            statusId: req.body.status,
            categoryId: req.body.category,
            creatorId : req.user._id
            
        })
        await vacant.save();
        return res.status(200).json({
            message: 'Vacant created successfully! :)',
            data: vacant
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the vacant :(',
            error
        })
    }
}
exports.apply = async (req, res, next) => {
    const vacantId = req.params.id;
    Vacant.findById(vacantId)
    .then(vacant => {
        vacant.applicants.push(req.user._id);
        return vacant.save();
    })
    .then(result => {
        return res.status(200).json({
            message: 'You Applied succesfully to this vacant'
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Error applying to this vacant'
        })
    })
}
exports.updateVacant = async(req, res, next) => {
    try {
        const vacantId = req.params.id;
        const updatedVacant = await Vacant.findByIdAndUpdate(vacantId, req.body);
        return res.status(200).json({
            message: 'Vacant Updated successfully :)',
            data: updatedVacant
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the vacant',
            error
        })
    }
}
exports.removeVacant = async (req, res, next) => {
    try {
        const vacantId = req.params.id;
        await Vacant.findByIdAndRemove(vacantId);
        return res.status(200).json({
            message: 'Vacant removed successfully :)'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the vacant',
            error
        })
    }
}