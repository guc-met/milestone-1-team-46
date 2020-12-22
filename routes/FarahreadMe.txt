Functionality view Missing Hours for a staff member
Route: /HR/viewMissingHours
Request type: GET
Request body: {"id":5,"month":12}
Response  missing : [{"id":"hr-5","missing_date":11,"missing_hours":-1.9000000000000004}]

Functionality view Missing Days for a staff member
Route: /HR/viewMissingHours
Request type: GET
Request body: {
  "id":1,
  "month":12
  
}
Response  [
    "2020-12-12",
    "2020-12-14",
    "2020-12-15",
    "2020-12-16",
    "2020-12-21",
    "2020-12-22",
    "2020-12-23",
    "2020-12-24",
    "2020-12-26",
    "2020-12-28",
    "2020-12-29",
    "2020-12-30",
    "2020-12-31",
    "2021-1-2",
    "2021-1-4",
    "2021-1-5",
    "2021-1-6",
    "2021-1-7",
    "2021-1-9"
]




Functionality Update salary for a staff member
Route: /HR/UpdateSalary
Request type:POST
Request body:{
  "id":10,
  "salary":5000}
Response {
    "name": "newbie2",
    "salary": 4972.222222222223,
    "email": "newb22@yahoo.com"
}

Functionality add missing Sign in for a staff member
Route: /HR/AddMissingSignIn
Request type:POST
Request body {
  "id":10,
  "time":"2020-03-18T17:46:36.931+00:00"
  
}
Response {
    "ID": 10,
    "HR_id": 20,
    "time": "2020-03-18T17:46:36.931+00:00"
}



Functionality add missing Sign out for a staff member
Route: /HR/AddMissingSignOut
Request type:POST
Request body {
  "id":10,
  "time":"2020-03-18T19:46:36.931+00:00"
  
}

Response {
    "ID": 10,
    "HR_id": 20,
    "time": "2020-03-18T19:46:36.931+00:00"
}


Functionality add staff member
Route: /HR/AddStaffMember
Request type: POST
Request body {
 "name":"test",
 "email":"test11@gmail.com",
 "role":["hr"],
 "department":"Engineering",
 "faculty":"MET"

  
}

Response {
    "name": "test",
    "ID": "hr-45",
    "email": "test11@gmail.com",
    "Office": "C10",
    "Day-Off": [
        "Saturday"
    ],
    "Department": "Engineering",
    "Faculty": "MET"
}

Another test 
Request {
    "name": "test",
    "ID": "hr-45",
    "email": "test11@gmail.com",
    "Office": "C10",
    "Day-Off": [
        "Saturday"
    ],
    "Department": "Engineering",
    "Faculty": "MET"
}
Response 
please enter a unique email


Functionality Update Staff Member 
Route: /HR/UpdateStaffMember
Request Type PUT
Request body {
 "id":35,
 "department":"Engineering",
 "faculty":"IET"

  
}

Response {
    "name": "newbie",
    "ID": "ac-35",
    "email": "newbie@yahoo.com",
    "Day-Off": [],
    "Department": "Engineering",
    "Faculty": "IET"
}

Functionality Delete Staff Member 
Route /HR/DeleteStaffMember
Request Type POST
Request body {
 "id":35,
 "department":"Engineering",
 "faculty":"IET"
}
  
Response "deleted staff member successfully"

Functionality view Attendance
route /HR/viewAttendance
Request Type GET
Reqest body {
 "id":1,
 "month":12
}

Response Sign ins :
[{"id":"hr-20","time":"2020-12-17T17:47:52.941Z","HR_id":null},{"id":"hr-20","time":"2020-12-17T18:18:30.596Z","HR_id":null},{"id":"hr-20","time":"2020-12-18T17:08:19.443Z","HR_id":null},{"id":"hr-20","time":"2020-12-19T14:52:45.734Z","HR_id":null},{"id":"hr-20","time":"2020-12-19T15:14:44.572Z","HR_id":null}]
Signs outs :
[{"id":"hr-20","time":"2020-12-17T17:51:26.837Z","HR_id":null},{"id":"hr-20","time":"2020-12-17T18:19:02.604Z","HR_id":null}]


Functionality Assign Course instructor 
Route: /HOD/assignCourseInstructor
Request type:POST
Request body{
 "id":20,
 "course":"maths1"
}

Response {
    "name": "ashry",
    "ID": "hr-20",
    "ci": true,
    "email": "metsttaff@hotmail.com",
    "Office": "C701",
    "Day-Off": [
        "Sunday"
    ],
    "Annual Leave Balance": 5,
    "Department": "MET",
    "Faculty": "engineering"
}


Functionality Delete course instructor
Route /HOD/deleteCourseInstructor
Request type delete

Request body {
 "id":20,
 "course":"maths1"
}

Response{
    "name": "ashry",
    "ID": "ac-20",
    "ci": false,
    "email": "metsttaff@hotmail.com",
    "Office": "C701",
    "Day-Off": [
        "Sunday"
    ],
    "Annual Leave Balance": 5,
    "Department": "MET",
    "Faculty": "engineering"
}

Functionality Update Course instructor
Route /HOD/UpdateCourseInstructor
Request type:PUT
Request body{
 "Oldid":"5",
  "Newid":"20",
 "course":"maths1"
}

Response{
 "name": "ashry",
    "ID": "ac-20",
    "ci": true,
    "email": "metsttaff@hotmail.com",
    "Office": "C701",
    "Day-Off": [
        "Sunday"
    ],
    "Annual Leave Balance": 5,
    "Department": "MET",
    "Faculty": "engineering"
}

Functionality all staff in HOD or staff members in courses 
Route /HOD/viewStaff
Request type GET
Request body{

}

Response [
    {
        "password": "$2a$10$M71iMAJwfMVuKXOl2QnfC.0xZXlxwoxEcl/LAQbSEeVfrtnvUR4jO",
        "hod": false,
        "ac": false,
        "cc": true,
        "ci": false,
        "daysOff": [
            "Sunday"
        ],
        "faculty": "engineering",
        "department": "MET",
        "courses": [
            "db"
        ],
        "_id": "5fdcac2a2086c71ec45007d5",
        "salary": 5000,
        "name": "ashry",
        "gender": "Male",
        "email": "metstaff@hotmail.com",
        "office": "C701",
        "annualLeaveBalance": 5,
        "hr": true,
        "no": 5,
        "id": 5,
        "__v": 2
    },
    {
        "password": "$2a$10$NfVoyasnXyYjGd/IWc4oL.hWklzqwr541NPr6rg.X6DtypZMIY7yS",
        "hod": true,
        "ac": true,
        "cc": false,
        "ci": true,
        "daysOff": [
            "Sunday"
        ],
        "faculty": "engineering",
        "department": "MET",
        "courses": [
            "db",
            "acl",
            "maths1"
        ],
        "_id": "5fde1871165ff15874523275",
        "salary": 3000,
        "name": "ashry",
        "gender": "Male",
        "email": "metsttaff@hotmail.com",
        "office": "C701",
        "annualLeaveBalance": 5,
        "hr": false,
        "no": 20,
        "id": 20,
        "__v": 0
    },
    {
        "password": "$2a$10$b..8v3c/QbAONIkxSZrzzewuNb8vQWDAYWO8pf/tw.ovlr53VIo6q",
        "hod": true,
        "ac": false,
        "cc": false,
        "ci": false,
        "daysOff": [
            "Sunday"
        ],
        "faculty": "engineering",
        "department": "MET",
        "courses": [
            "acl",
            "db"
        ],
        "_id": "5fdf521085ddbc481093380f",
        "salary": 3000,
        "name": "ashry",
        "gender": "Male",
        "email": "muhadsamir123@hotmail.com",
        "office": "C701",
        "annualLeaveBalance": 5,
        "hr": false,
        "no": 41,
        "id": 1,
        "__v": 0
    },
    {
        "password": "$2a$10$.9cdfRilTEU0/ty10b7Rw.gyP2vHKdQqeOcvhQh1GgBVnPb38neVm",
        "hod": true,
        "ac": false,
        "cc": false,
        "ci": false,
        "daysOff": [
            "Sunday"
        ],
        "faculty": "engineering",
        "department": "MET",
        "courses": [
            "acl",
            "db"
        ],
        "_id": "5fe0a414e3081e638855a224",
        "name": "lola",
        "gender": "Female",
        "email": "lola@gmail.com",
        "office": "C701",
        "annualLeaveBalance": 6,
        "hr": false,
        "no": 42,
        "id": 74,
        "__v": 0
    }
]
