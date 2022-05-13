const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth')

const classroomController = require('../controllers/courses');

router.post('/createCourse', classroomController.createCourse);
router.post('/getCourses', isAuth, classroomController.getCourses);
router.post('/joinCourse', classroomController.joinCourse);
router.post('/getCourse', classroomController.getCourse);
router.delete('/deleteCourse', classroomController.deleteCourse);

module.exports = router; 