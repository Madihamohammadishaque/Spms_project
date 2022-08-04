const express = require('express');
const router = express.Router();
const pool = require('./db.js');
const mysqlPassword = require('mysql-password');
const dateFormat = require('dateformat');

router.get('/testapi', (req, res) => {
  console.log(('hello'));
});

/* Gets semester details */
router.get('/api/get/semester-details', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM SEMESTER';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

/*  Input semester values */
router.post('/api/put/semesterdata', (req, res) => {
  console.log('season: ' + req.body.season);
  console.log('year: ' + req.body.year);
  console.log('startDate: ' + req.body.startDate);
  console.log('endDate: ' + req.body.endDate);
  const season = req.body.season.toString();
  const year = req.body.year;
  const startDate = dateFormat(req.body.startDate, "isoDate");
  const endDate = dateFormat(req.body.endDate, "isoDate");
  const semesterData = req.body;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO SEMESTER (season, year, startDate, endDate) VALUES (?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [season, year, startDate, endDate], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Semester Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Semester Data Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get School table values
router.get('/api/get/schools', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM SCHOOL';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Input school data
router.post('/api/put/schooldata', (req, res) => {
  console.log('schoolName: ' + req.body.schoolName);
  console.log('location: ' + req.body.location);
  console.log('deanInChargeName: ' + req.body.deanInChargeName);
  const schoolName = req.body.schoolName;
  const location = req.body.location;
  const deanInCharge = req.body.deanInChargeName;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO SCHOOL (schoolName, location, deanInCharge) VALUES (?, ?, ?);';

    // Use the connection
    connection.query(sql, [schoolName, location, deanInCharge], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"School Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"School Data Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Department table values
router.get('/api/get/department', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM DEPARTMENT';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Insert Department data into Department table
router.post('/api/put/departmentdata', (req, res) => {
  console.log('deptID: ' + req.body.deptID);
  console.log('schoolName: ' + req.body.schoolName);
  console.log('location: ' + req.body.location);
  console.log('deptName: ' + req.body.deptName);
  console.log('deptHeadID: ' + req.body.deptHeadID);
  const deptID = req.body.deptID;
  const schoolName = req.body.schoolName;
  const location = req.body.location;
  const deptName = req.body.deptName;
  const deptHeadID = req.body.deptHeadID

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO DEPARTMENT (deptID, schoolName, deptName, location, deptHeadID) VALUES (?, ?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [deptID, schoolName, deptName, location, deptHeadID], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Department Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Department Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Degree Programs table values
router.get('/api/get/degreeprogram', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM DEGREE_PROGRAM;';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert Degree Programs into table
router.post('/api/put/degreeprogramdata', (req, res) => {
  console.log('degreeID: ' + req.body.degreeID);
  console.log('degreeTitle: ' + req.body.degreeTitle);
  console.log('deptID: ' + req.body.deptID);
  const degreeID = req.body.degreeID;
  const degreeTitle = req.body.degreeTitle;
  const deptID = req.body.deptID;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO DEGREE_PROGRAM (degreeID, degreeTitle, deptID) VALUES (?, ?, ?);';

    // Use the connection
    connection.query(sql, [degreeID, degreeTitle, deptID], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Degree Program Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Degree Program Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Course table values
router.get('/api/get/course', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM COURSE';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert course values data into COURSE table
router.post('/api/put/course', (req, res) => {
  console.log('courseID: ' + req.body.courseID);
  console.log('courseTitle: ' + req.body.courseTitle);
  console.log('courseDescription: ' + req.body.courseDescription);
  console.log('creditHour: ' + req.body.creditHour);
  console.log('deptID: ' + req.body.deptID);
  console.log('degreeID: ' + req.body.degreeID);
  const courseID = req.body.courseID;
  const courseTitle = req.body.courseTitle;
  const courseDescription = req.body.courseDescription;
  const creditHour = req.body.creditHour;
  const deptID = req.body.deptID;
  const degreeID = req.body.degreeID;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO COURSE (courseID, courseTitle, courseDescription, creditHour, deptID) VALUES (?, ?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [courseID, courseTitle, courseDescription, creditHour, deptID], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Course Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Course Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Degree Program Courses table values
router.get('/api/get/degreeprogramcourse', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM DEGREE_PROGRAM_COURSE';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert DEGREE_PROGRAM_COURSE values data into DEGREE_PROGRAM_COURSE table
router.post('/api/put/degreeprogramcourse', (req, res) => {
  console.log('courseID: ' + req.body.courseID);
  console.log('degreeID: ' + req.body.degreeID);
  const courseID = req.body.courseID;
  const degreeID = req.body.degreeID;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO DEGREE_PROGRAM_COURSE (degreeID, courseID) VALUES (?, ?);';

    // Use the connection
    connection.query(sql, [degreeID, courseID], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Degree Program Course Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Degree Program Course Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Account table values
router.get('/api/get/facultyaccounts', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM ACCOUNT as a, FACULTY as f where accountType="Faculty" and a.accountID = f.fAccountID;';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert Account values data into ACCOUNT table
router.post('/api/put/facultyaccount', (req, res) => {
  console.log('fAccountID: ' + req.body.fAccountID);
  console.log('firstName: ' + req.body.firstName);
  console.log('lastName: ' + req.body.lastName);
  console.log('phoneNumber: ' + req.body.phoneNumber);
  console.log('email: ' + req.body.email);
  console.log('password: ' + req.body.password);
  console.log('accountType: ' + req.body.accountType);
  const fAccountID = req.body.fAccountID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const accountType = req.body.accountType;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO ACCOUNT (accountID, firstName, lastName, phoneNumber, email, password, accountType) VALUES (?, ?, ?, ?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [fAccountID, firstName, lastName, phoneNumber, email, password, 'Faculty'], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Account Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Account Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Faculty table values
router.get('/api/get/faculty', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM FACULTY';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert Account values data into FACULTY table
router.post('/api/put/faculty', (req, res) => {
  console.log('fAccountID: ' + req.body.fAccountID);
  console.log('fDeptID: ' + req.body.fDeptID);
  console.log('fDateHired: ' + req.body.fDateHired);
  console.log('fSpecialization: ' + req.body.fSpecialization);

  const fAccountID = req.body.fAccountID;
  const fDeptID = req.body.fDeptID;
  const fDateHired = req.body.fDateHired;
  const fSpecialization = req.body.fSpecialization;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO FACULTY (fAccountID, deptID, dateHired, specialization) VALUES (?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [fAccountID, fDeptID, fDateHired, fSpecialization], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Faculty Account Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Faculty Account Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// Get Student table values
router.get('/api/get/studentaccount', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM ACCOUNT as a, STUDENT as s where accountType="Student" and a.accountID = s.sAccountID;';

    // Use the connection
    connection.query(sql, (error, data) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": data});
  	  	} else {
          res.json({"status": 200, "message": 'success', "response": data});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert student Account values data into ACCOUNT table
router.post('/api/put/studentaccount', (req, res) => {
  console.log('sAccountID: ' + req.body.accountID);
  console.log('firstName: ' + req.body.firstName);
  console.log('lastName: ' + req.body.lastName);
  console.log('phoneNumber: ' + req.body.phoneNumber);
  console.log('email: ' + req.body.email);
  console.log('password: ' + req.body.password);
  console.log('accountType: ' + req.body.accountType);
  const sAccountID = req.body.accountID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const accountType = req.body.accountType;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO ACCOUNT (accountID, firstName, lastName, phoneNumber, email, password, accountType) VALUES (?, ?, ?, ?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [sAccountID, firstName, lastName, phoneNumber, email, password, 'Student'], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Student Account Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Student Account Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert Account values data into STUDENT table
router.post('/api/put/student', (req, res) => {
  console.log('sAccountID: ' + req.body.sAccountID);
  console.log('sDeptID: ' + req.body.sDeptID);
  console.log('sMajor: ' + req.body.sMajor);
  console.log('sDateOfAdmission: ' + req.body.sDateOfAdmission);
  console.log('studentType: ' + req.body.studentType);

  const sAccountID = req.body.sAccountID;
  const sDeptID = req.body.sDeptID;
  const sMajor = req.body.sMajor;
  const sDateOfAdmission = req.body.sDateOfAdmission;
  const studentType = req.body.studentType;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO STUDENT (sAccountID, deptID, major, dateOfAdmission, studentType) VALUES (?, ?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [sAccountID, sDeptID, sMajor, sDateOfAdmission, studentType], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Student Account Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Student Account Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

// insert Offered Course values data into OFFERED COURSES table
router.post('/api/put/offeredcoursedata', (req, res) => {
  console.log('offeredCourseID: ' + req.body.offeredCourseID);
  console.log('semesterSeason: ' + req.body.semesterSeason);
  console.log('semesterYear: ' + req.body.semesterYear);
  console.log('courseCoordinatorID: ' + req.body.courseCoordinatorID);

  const offeredCourseID = req.body.offeredCourseID;
  const semesterSeason = req.body.semesterSeason;
  const semesterYear = req.body.semesterYear;
  const courseCoordinatorID = req.body.courseCoordinatorID;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'INSERT INTO OFFERED_COURSES (offeredCourseID, semesterSeason, semesterYear, courseCoordinatorID) VALUES (?, ?, ?, ?);';

    // Use the connection
    connection.query(sql, [offeredCourseID, semesterSeason, semesterYear, courseCoordinatorID], (error, results, fields) => {
      console.dir(fields);
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
            res.send({
              "code":200,
              "success":"Student Account Data Entered."
            });
        }
        else {
          res.send({
            "code":204,
            "success":"Student Account Data Not Entered."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

router.post('/login', (req, res) => {
  console.log('username: ' + req.body.accountID);
  console.log('password: ' + req.body.password);
  const accountType = req.body.accountType;
  const accountID = req.body.accountID;
  const password = req.body.password;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM ACCOUNT AS ac WHERE accountID = ?';

    // Use the connection
    connection.query(sql, [accountID, accountType], (error, results, fields) => {
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "success":"Error Ocurred."
        })
      }
      else {
        console.log('The solution is: ', results);
        if (results.length >0){
          console.log(results[0].password);
          if (results[0].password == password && results[0].accountType == accountType){
            
            res.send({
              "code":200,
              "success":"Login Sucessfull."
            });
          }
          else {
            res.send({
              "code":204,
              "success":"Username and password do not match."
            });
          }
        }
        else {
          res.send({
            "code":204,
            "success":"Username does not exits."
          });
        }
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

module.exports = router;