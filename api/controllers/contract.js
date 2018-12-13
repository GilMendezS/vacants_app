const Contract = require('../models/contract');
exports.getContracts = async (req, res, next) => {
    try {
        const contractTypes = await Contract.find({active : true});
        return res.status(200).json({
            data: contractTypes
        });
    } catch (error) {
        return res.status(500).json({
            'message': 'Sometwhing was wrong!',
            error
        });
    }
}
exports.addContract = async(req, res, next) => {
    try {
        const contractType = new Contract({
            title: req.body.title,
            active: true
        });
        await contractType.save();
        return res.status(200).json({
            message:'Type of Contract created!',
            data: contractType
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An error ocurred storing the data',
            error
        })
    }
}
exports.getOneContract = async (req, res, next) => {
    try {
        const contractId = req.params.id;
        const contract = await Contract.findById(contractId);
        return res.status(200).json({
            data: contract
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the contract type',
            error
        })
    }
}
exports.updateContrct = async (req, res, next) => {
    try {
        const contractId = req.params.id;
        const updatedContract = await Contract.findByIdAndUpdate(contractId, req.body)
        return res.status(200).json({
            message : 'Information updated correctly',
            data: updatedContract
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the information',
            error
        })
    }
}

exports.removeContract = async(req, res, next) => {
    try {
        const contractId = req.params.id;
        await Contract.findByIdAndRemove(contractId);
        return res.status(200).json({
            message: 'Removed correctly'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the contract',
            error
        })
    }
}