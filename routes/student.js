// Student Routes
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyStudent } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes require student authentication
router.get('/dashboard', verifyStudent, studentController.getDashboard);
router.get('/certificates', verifyStudent, studentController.getCertificates);
router.get('/certificates/:certificateId', verifyStudent, studentController.getCertificateDetails);
router.get('/certificates/:certificateId/verify', verifyStudent, studentController.verifyCertificateOnBlockchain);
router.post('/career-insights', verifyStudent, studentController.getCareerInsights);
router.patch('/portfolio/visibility', verifyStudent, studentController.updatePortfolioVisibility);
router.patch(
	'/profile',
	verifyStudent,
	upload.fields([
		{ name: 'profile_photo', maxCount: 1 },
		{ name: 'cv', maxCount: 1 }
	]),
	studentController.updateProfile
);

module.exports = router;
