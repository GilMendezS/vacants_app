const Comapny = require('../models/company');
exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Comapny.find();
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