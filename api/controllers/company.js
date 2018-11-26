const Company = require('../models/company');
exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        return res.status(200).json({
            data: companies
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching companies',
            error
        })
    }
}
exports.addCompany = async (req, res, next) => {
    console.log(req.body)
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
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the company',
            error
        })
    }
}