const Company = require('../models/company');
exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        return res.status(200).json({
            data: companies
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching companies',
            error
        });
    }
}
exports.addCompany = async (req, res, next) => {
    const company = new Company({
        title: req.body.name,
        imageUrl: req.file ? req.file.path : '',
        description : req.body.description
    })
    try {
        await company.save();
        return res.status(200).json({
            message: 'Company saved!',
            data: company
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the company',
            error
        });
    }
}
exports.getCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        return res.status(200).json({
            data: company
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Company not found',
            error
        });
    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndUpdate(companyId, req.body);
        return res.status(200).json({
            'message': 'Company modified correctly',
            data: company
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Company not updated',
            error
        });
    }
}
exports.removeCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        await Company.findByIdAndRemove(companyId);
        return res.status(200).json({
            message: 'Company removed correctly'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the company not updated',
            error
        });
    }
}