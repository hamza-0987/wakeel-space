const ObjectId = require('mongoose').Types.ObjectId; 

const Classroom = require('../models/courses');
const classCode = require('../models/classCode');
const courses = require('../models/courses');
const User = require('../models/user');

exports.createCourse = async (req, res, next) => {
    let currClassCode;
    await classCode.findOne().then(obj => {
        currClassCode = obj.code + 1;
        obj.code = currClassCode;
        obj.save();
    }).catch(err => {
        err.statusCode = 500;
        next(err);
    })

    const newCourse = new courses({
        adminName: req.body.adminName,
        adminEmail: req.body.adminEmail,
        desc: req.body.desc, 
        classCode: currClassCode,
        className: req.body.className,
        fieldName: req.body.fieldName,
        classLevel: req.body.classLevel
    })
    
    newCourse.save()
        .then(result => {
            User.findOne({email: req.body.adminEmail}).then(user => {
                user.classesOwned.push(currClassCode);
                user.save();
            }).catch(err => {
                next(err);
            })
            res.status(201).json({message: "Course created successfully"});
        })
        .catch(err => {
            next(err);
        })
}

exports.getCourses = (req, res, next) => {
    const type = req.body.type;
    const userEmail = req.body.userEmail;
    if (type === "owned") {
        Classroom.find({adminEmail: userEmail})
            .then(results => {
                res.json(results);
            }).catch(err => {
                next(err);
            })
    } else if (type === "enrolled") {
        User.findOne()
            .then(user => {
                Classroom.find()
                    .then(results => {
                        res.json(results);
                    })
                    .catch(err => {
                        next(err);
                    })
            }).catch(err => {
                next(err);
            })
    } else {
        const err = new Error("Invalid params");
        err.statusCode = 422;
        next(err);
    }
}

exports.joinCourse = (req, res, next) => {
    const userEmail = req.body.userEmail;
    const classCode = req.body.classCode;
    Classroom.findOne({classCode: classCode})
        .then(classroom => {
            if (!classroom) {
                const err = new Error("Course with given course code does not exists.");
                err.statusCode = 403;
                next(err);
            }
            if (classroom.members.indexOf(userEmail) >= 0) {
                const err = new Error("User already Enrolled.");
                err.statusCode = 403;
                next(err);
            }
            classroom.members.push(userEmail);
            return classroom.save();
        })
        .then(result => {
            return User.findOne({email: userEmail});
        })
        .then(user => {
            if (user.classesOwned.indexOf(classCode) >= 0) {
                const err = new Error("Users cannot enroll in courses created by themselves.")
                err.statusCode = 403;
                next(err);
            }
            user.classesEnrolled.push(classCode);
            return user.save();
        })
        .then(result => {
            res.json({message: "Course joined successfully!"});
        })
        .catch(err => {
            next(err);
        })
}

exports.deleteCourse = (req, res, next) => {
    const classCode = req.body.classCode;
    // console.log(classCode);
    Classroom.findOneAndDelete({classCode: classCode})
        .then(async classroom => {
            if (!classroom) {
                const err = new Error("CourseCode does not exists");
                err.statusCode = 422;
                next(err);
            } 

            classroom.members.forEach(async memberEmail => {
                await User.findOne({email: memberEmail})
                    .then(user => {
                        if (user) {
                            user.classesEnrolled = user.classesEnrolled.filter(classEnrolledCode => {
                                return classEnrolledCode.toString() !== classCode;
                            });

                            user.classesOwned = user.classesOwned.filter(classOwnedCode => {
                                return classOwnedCode.toString() !== classCode;
                            });

                            user.save();
                        }
                    })
                    .catch(err => {
                        next(err);
                    })
            })

            Discussion.deleteMany({classCode: classCode})
                .then(result => {
                    res.json({message: "Course deleted successfully"});
                })
                .catch(err => {
                    next(err);
                })

        })
        .catch(err => {
            next(err);
        })
}

exports.getCourse = (req, res, next) => {
    const classCode = req.body.classCode;
    Classroom.findOne({classCode: classCode})
        .then(classroom => {
            if (!classroom) {
                const err = new Error("Invalid Coursecode.");
                err.statusCode = 422;
                next(err);
            }

            res.json(classroom);
        })
        .catch(err => {
            next(err);
        })
}

