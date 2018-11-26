const express = require('express');
const router = express.Router();
const multer = require('multer');
const CompanyController = require('../controllers/company');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/companies/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }
    else {
        cb(new Error('Only .jpeg or .png files are accepted'), false)
    }
}
const upload = multer({
    storage,
    limits: {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter
})
router.get('/', CompanyController.getCompanies);

router.post('/', upload.single('companyImage'), CompanyController.addCompany);

router.get('/:id', CompanyController.getCompany);

router.put('/:id', CompanyController.updateCompany);

module.exports = router;