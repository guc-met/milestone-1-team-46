Functionality : log in onto the system
Route : /
Request type : POST 
Request body : {"email":"muhadsamir123@hotmail.com" , "password" : "123456"}
Response : {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4NTc3NTcwfQ.hnyDmgKvoXkcNeBmmgw7l81s6YSKEFZYV3VXt6ZZdk4",
    "member": {
        "id": 1,
        "email": "muhadsamir123@hotmail.com"
    }
}



Functionality : Sign in for attendance
Route : /signin
Request type : POST 
Response : added a sign-in entry of id: 5


Functionality : Sign out for attendance
Route : /signout
Request type : POST 
Response : added a sign-out entry of id: 5



Functionality : view information in a user profile
Route : /viewprofile
Request type : GET 
Response : {"name":"Ahmed Mohamed,
       "ID":"hr-4",
       "email": "ahmedmohamed@gmail.com",
       "Office": "C7-222",
       "Day-Off": "Tuesday",
       "Annual Leave Balance": "10",
       "Accidental Leave Balance": "2",
       "Department": "Laser cutting department",
       "Faculty": "Faculty of absolute useless arts and crafts"}




Functionality : update information in a user profile
Route : /updateprofile
Request type : POST 
Request body : {"office" :"C7-420" , "dayoff" : "Saturday"}
Response : {"name":"Ahmed Mohamed,
       "ID":"hr-4",
       "email": "ahmedmohamed@gmail.com",
       "Office": "C7-420",
       "Day-Off": "Saturday",
       "Annual Leave Balance": "10",
       "Accidental Leave Balance": "2",
       "Department": "Laser cutting department",
       "Faculty": "Faculty of absolute useless arts and crafts"}


Functionality: view schedule
Route: /ac/viewschedule
Request type: GET
Response: schedule of academic . Example of a single schedule: {
    "_id": "5fdcdaaf9466d62b44be9bee",
    "id": 5,
    "Saturday": [
        {
            "_id": "5fdcdaaf9466d62b44be9bef",
            "location": "3am s3d",
            "course": "acl",
            "time": "8:15"
        },
        {
            "_id": "5fdcdaaf9466d62b44be9bf0",
            "location": "3am s3d",
            "course": "acl",
            "time": "10:00"
        }
    ],
    "Sunday": [
        {
            "_id": "5fdcdaaf9466d62b44be9bf1",
            "location": "3am s3d",
            "course": "acl",
            "time": "10:00"
        }
    ],
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "__v": 0
}


Functionality: submit replacement request with the id of the replacement member
Route: ac/replacementrequest
Request type: POST
Request body:{"repId":2}

Functionality: view replacement request that both I submitted and was submitted to me
Route: ac/replacementrequest
Request type: GET
Response body:  [
    {
        "status": "Pending",
        "_id": "5fdce4e9ee563f745c7deb92",
        "sender_id": 5,
        "type": "replacememt",
        "time": "2020-12-18T17:20:41.357Z",
        "__v": 0
    }
]


Functionality: get  submitted requests 
Route: ac/viewallrequests
Request type: GET
Request body: {"status":"Pending"}
Response: Array of requests . Example of requests: [
    {
        "status": "Pending",
        "_id": "5fdce4e9ee563f745c7deb92",
        "sender_id": 5,
        "type": "replacememt",
        "time": "2020-12-18T17:20:41.357Z",
        "__v": 0
    }
]





Functionality: send a slot linking request
Route: /ac/slotlinking
Request type: POST
Request body: { "slotId":"5fdd0e74b7f2d37b1cdb07a5"}


Functionality: send a change-day-off request
Route: /ac/changedayoff
Request type: POST
Request body: { "dayOff":"Saturday"}

Functionality: send a leave request
Route: /ac/leaverequest
Request type: POST
Request body: {"type":"annual leave","info": "2","day":"2020-12-30"}

Functionality: send a leave request
Route: /ac/leaverequest
Request type: POST
Request body: {"type":"aacidental leave","info": "2","day":"2020-12-10"}

Functionality: send a leave request
Route: /ac/leaverequest
Request type: POST
Request body: {"type":"sick leave","info": "2","day":"2020-12-30","document": "https://drive.google.com/file/d/1TBbV3paVB4Y-_kKR4iNJAJqBe2yWkZw6/view?usp=sharing"}

Functionality: send a leave request
Route: /ac/leaverequest
Request type: POST
Request body: {"type":"maternity leave","info": "2","day":"2020-12-30","document": "https://drive.google.com/file/d/1TBbV3paVB4Y-_kKR4iNJAJqBe2yWkZw6/view?usp=sharing"}

Functionality: send a leave request
Route: /ac/leaverequest
Request type: POST
Request body: {"type":"comoensatio leave","info": "2ZAHEGT","day":"2020-12-30"}



Functionality: cancel a pending request
Route: /ac/cancelrequest
Request type: POST
Request body: {"reqId":"5fddceb5beebcb4a94ae9dc7"}



Functionality : reset a staff member password
Route : /resetpw
Request type : POST
Request body : {"oldPassword" : "45678" , "newPassword" : "9876"}
Example output : {
    "id": "ac-1",
    "email": "muhadsamir123@hotmail.com",
    "password": "9876"
}



Functionality : View all sign ins and sign outs , or for a specified month 
Route : /viewatt
Request type : POST
Request body : {"month" : 3 }
Example output : 
Sign ins : [
    {
        "id": "ac-1",
        "time": "2020-03-17T17:46:36.931Z",
        "HR_id": null
    }]
    Signs outs : [
    {
        "id": "ac-1",
        "time": "2020-12-17T17:51:26.837Z",
        "HR_id": null
    }]





Functionality : View missing days where the staff didnt attend or sign in for a specified month 
Route : /viewmissdays
Request type : POST
Request body : {"month" : 3 }
Example output : [
    "2020-3-11",
    "2020-3-14",
    "2020-3-15",
    "2020-3-16"]]


Functionality : View missing hours where the staff didnt continue a full day for a specified month 
Route : /viewmisshours
Request type : POST
Request body : {"month" : 3 }
Example output : missing : [
    {
        "id": "ac-1",
        "missing_date": 17,
        "missing_hours": 6.316666666666667
    }
]








Functionality: Add a location/room to the system.
Route: /HR/AddLocation
Request type: POST
Request body: {
"location" : "B12-808",
"roomType" :   "lab",
"maxCapacity" : "69" 
}

Functionality: update a location/room on the system.
Route: /HR/UpdateLocation
Request type: POST
Request body: {
    "location" : "B12-808",
    "roomType" : "hall",
    "maxCapacity" : 25

}
Example output :  {
        "_id": "5fe0ed567e74711c70bc92a6",
        "location": "B12-808",
        "roomtype": "hall",
        "maxcapacity": 25,
        "__v": 0
    }

Functionality: delete a location/room from the system.
Route: /HR/AddLocation
Request type: POST
Request body: {
"location" : "B12-808",
"roomType" :   "lab",
"maxCapacity" : "69" 
}    


Functionality : add a course to a certain department in a certain faculty
Route : /HR/AddCourse
Request type : POST
Request body : {
    "facultyName" : "Faculty of absolute useless crafts",
    "departmentName" : "Laser cutting department",
    "courseName" : "Precise Edge cutting",
    "courseCode" : "PEC101",
    "ccId" : 3,
    "labs" : 2,
    "lectures" : 2,
    "tutorials" : 1,
    "totalSlots" : 5
}

Example output :{
    "_id": "5fde719df76fff51e0aca066",
    "name": "Faculty of absolute useless crafts",
    "departments": [
        {
            "_id": "5fde886501461f2660f7fa5c",
            "name": "Laser cutting department",
            "HOD": 2,
            "courses": [
                {
                    "ccId": 3,
                    "_id": "5fdf2b7877713a479817f072",
                    "coursename": "Precise Edge cutting",
                    "coursecode": "PEC101",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                }
            ]
        },
        {
            "_id": "5fde889ce947297d84d2adac",
            "name": "Steel cutting department",
            "HOD": 2,
            "courses": []
        }
    ],
    "__v": 6
}





Functionality : Delete a course from a certain department in a certain faculty
Route : /HR/DeleteCourse
Request type : POST
Request body : {
    "facultyName" : "Faculty of absolute useless crafts",
    "departmentName" : "Laser cutting department",
    "courseName" : "Laser Wielding",
    "courseCode" : "LW202",
    "ccId" : 3,
    "labs" : 2,
    "lectures" : 2,
    "tutorials" : 1,
    "totalSlots" : 5
}
Example output : {
    "_id": "5fde719df76fff51e0aca066",
    "name": "Faculty of absolute useless crafts",
    "departments": [
        {
            "_id": "5fde886501461f2660f7fa5c",
            "name": "Laser cutting department",
            "HOD": 2,
            "courses": [
                {
                    "ccId": 3,
                    "_id": "5fdf2b7877713a479817f072",
                    "coursename": "Precise Edge cutting",
                    "coursecode": "PEC101",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                },
                {
                    "ccId": 3,
                    "_id": "5fdf2c0677713a479817f073",
                    "coursename": "Production means",
                    "coursecode": "PE505",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                }
            ]
        },
        {
            "_id": "5fde889ce947297d84d2adac",
            "name": "Steel cutting department",
            "HOD": 2,
            "courses": []
        }
    ],
    "__v": 10
}




Functionality : update a course from a certain department in a certain faculty
Route : /HR/UpdateCourse
Request type : POST
Request body : {
    "facultyName" : "Faculty of absolute useless crafts",
    "departmentName" : "Laser cutting department",
    "oldCourseName" : "Laser Wielding",
    "oldCourseCode" : "LW202",
    "courseName" : "Polymer refining",
    "courseCode" : "PR301",
    "ccId" : 6,
    "labs" : 6,
    "lectures" : 6,
    "tutorials" : 2,
    "totalSlots" : 14
}
Example output : 
{
    "_id": "5fde719df76fff51e0aca066",
    "name": "Faculty of absolute useless crafts",
    "departments": [
        {
            "_id": "5fde886501461f2660f7fa5c",
            "name": "Laser cutting department",
            "HOD": 2,
            "courses": [
                {
                    "ccId": 3,
                    "_id": "5fdf2b7877713a479817f072",
                    "coursename": "Precise Edge cutting",
                    "coursecode": "PEC101",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                },
                {
                    "ccId": 3,
                    "_id": "5fdf2c0677713a479817f073",
                    "coursename": "Production means",
                    "coursecode": "PE505",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                },
                {
                    "ccId": 6,
                    "_id": "5fdf3a20d91de06c4c714dce",
                    "coursename": "Polymer refining",
                    "coursecode": "PR301",
                    "labs": 6,
                    "lectures": 6,
                    "tutorials": 2,
                    "totalslots": 14
                }
            ]
        },
        {
            "_id": "5fde889ce947297d84d2adac",
            "name": "Steel cutting department",
            "HOD": 2,
            "courses": []
        }
    ],
    "__v": 11
}





Functionality : add a new department inside a faculty
Route : /HR/AddDepartment
Request type : POST
Request body : 
{
    "facultyName" : "Faculty of absolute useless crafts",
    "departmentName" : "Spaceships department",
    "departmentHOD" : 2

}
Example output : 
{
    "_id": "5fde719df76fff51e0aca066",
    "name": "Faculty of absolute useless crafts",
    "departments": [
        {
            "_id": "5fde886501461f2660f7fa5c",
            "name": "Laser cutting department",
            "HOD": 2,
            "courses": [
                {
                    "ccId": 3,
                    "_id": "5fdf2b7877713a479817f072",
                    "coursename": "Precise Edge cutting",
                    "coursecode": "PEC101",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                },
            ]
        },
        {
            "_id": "5fde889ce947297d84d2adac",
            "name": "Steel cutting department",
            "HOD": 2,
            "courses": []
        },
        {
            "_id": "5fdf3c3d86c5513198a05a23",
            "name": "Spaceships department",
            "HOD": 2,
            "courses": []
        }
    ],
    "__v": 12
}


Functionality : delete a department inside a faculty
Route : /HR/DeleteDepartment
Request type : POST
Request body :
 {
    "facultyName" : "Faculty of absolute useless crafts",
    "departmentName" : "Cartoon crafts and paper department",
    "departmentHOD" : 4

}
Example output :{
    "_id": "5fde719df76fff51e0aca066",
    "name": "Faculty of absolute useless crafts",
    "departments": [
        {
            "_id": "5fde886501461f2660f7fa5c",
            "name": "Laser cutting department",
            "HOD": 2,
            "courses": [
                {
                    "ccId": 3,
                    "_id": "5fdf2b7877713a479817f072",
                    "coursename": "Precise Edge cutting",
                    "coursecode": "PEC101",
                    "labs": 2,
                    "lectures": 2,
                    "tutorials": 1,
                    "totalslots": 5
                }
            ]
        },
        {
            "_id": "5fde889ce947297d84d2adac",
            "name": "Steel cutting department",
            "HOD": 2,
            "courses": []
        },
        {
            "_id": "5fdf3c3d86c5513198a05a23",
            "name": "Spaceships department",
            "HOD": 2,
            "courses": []
        }
    ],
    "__v": 12
}




Functionality : update a department inside a faculty
Route : /HR/UpdateDepartment
Request type : POST
Request body :
{
    "facultyName" : "Faculty of absolute useless crafts",
    "oldDepartmentName" : "Spaceships department",
    "departmentName" : "Origami crafts and paper department",
    "departmentHOD" : 4

}
Example output :

{
    "_id": "5fde719df76fff51e0aca066",
    "name": "Faculty of absolute useless crafts",
    "departments": [
        {
            "_id": "5fde886501461f2660f7fa5c",
            "name": "Laser cutting department",
            "HOD": 2,
            "courses": []
        },
        {
            "_id": "5fde889ce947297d84d2adac",
            "name": "Steel cutting department",
            "HOD": 2,
            "courses": []
        },
        {
            "_id": "5fdf3c3d86c5513198a05a23",
            "name": "Origami crafts and paper department",
            "HOD": 4,
            "courses": []
        }
    ],
    "__v": 12
}



Functionality : add a faculty
Route : /HR/AddFaculty
Request type : POST
Request body :
{
    "name" : "Faculty of applied arts",
    "departments" : [{
        "name" : "Product and Design Department",
        "HOD" : "1",
        "courses" : [{
            "coursename" : "How To Foam Craft",
            "coursecode" : "FC404"
        }]
    }]
}
Example output :

{
    "_id": "5fdf41d0d0c4ca77742b8f46",
    "name": "Faculty of applied arts",
    "departments": [
        {
            "_id": "5fdf41d0d0c4ca77742b8f47",
            "name": "Product and Design Department",
            "HOD": 1,
            "courses": [
                {
                    "ccId": null,
                    "_id": "5fdf41d0d0c4ca77742b8f48",
                    "coursename": "How To Foam Craft",
                    "coursecode": "FC404"
                }
            ]
        }
    ],
    "__v": 0
}



Functionality : update a faculty
Route : /HR/UpdateFaculty
Request type : POST
Request body :
{
    "name" : "Faculty of applied arts",
    "newName" : "Faculty of architecture",
    "departments" : [{
        "name" : "Product and Design Department",
        "HOD" : "1",
        "courses" : [{
            "coursename" : "How To Foam Craft",
            "coursecode" : "FC404"
        }]
    }]
}
Example output :

[
    {
        "_id": "5fdf41d0d0c4ca77742b8f46",
        "name": "Faculty of architecture",
        "departments": [
            {
                "_id": "5fdf41d0d0c4ca77742b8f47",
                "name": "Product and Design Department",
                "HOD": 1,
                "courses": [
                    {
                        "ccId": null,
                        "_id": "5fdf41d0d0c4ca77742b8f48",
                        "coursename": "How To Foam Craft",
                        "coursecode": "FC404"
                    }
                ]
            }
        ],
        "__v": 0
    }
]




Functionality : de;ete a faculty
Route : /HR/DeleteFaculty
Request type : POST
Request body :
{
    "name" : "Faculty of architecture"
   
}
Example output :
Deleted faculty Faculty of architecture
>>>>Course Instructor Routes

Functionality: View all the staff in a course instructor's department or per course along with their profiles.
Route: /ci/viewstaff
Request type: GET
Request body: {"course":"db"}
Response: Array of staff members, for example:{
password:"$2a$10$UDpXjmTT1DnuAlB5vxVbyOBv3fTaW7Z0dQA27tEn993TKblatpuBC"
"hod":false,
"ac":false,
"cc":false,
"ci":true,
"dayOff":"Saturday",
"faculty":"engineering",
"department":"MET",
"salary":3000,
"name":"slim",
"gender":"Male",
"email":"ci@hotmail.com",
"office":"C701",
"annualLeaveBalance":5,
"hr":false,
"no":2,
"id":2
}


Functionality: Assign an academic member in each of a course instructor's course(s) to be a course coordinator.
Route: /ci/assgincc
Request type: POST
Request body: {"course":"db","id":"5"}


Functionality: Assign an academic member to an unassigned slots in course(s) he/she is assigned to.
Route: /ci/slots
Request type: POST
Request body: {"ass_id":"5","slot_id":"5fde87e9f13b8555682f75c3"}


Functionality: Update an academic member to an unassigned slots in course(s) he/she is assigned to.
Route: /ci/slots
Request type: PUT
Request body: {"ass_id":"5","slot_id":"5fde87e9f13b8555682f75c3"}


Functionality: delete assignment of academic member in course(s) he/she is assigned to.
Route: /ci/slots
Request type: DELETE
Request body: {"slot_id":"5fde87e9f13b8555682f75c3"}


Functionality: Assign an academic member to an unassigned slots in course(s) he/she is assigned to.
Route: /ci/slots
Request type: POST
Request body: {"ass_id":"5","slot_id":"5fde87e9f13b8555682f75c3"}


Functionality: Remove an assigned academic member in course(s) he/she is assigned to.
Route: /ci/assignees
Request type: POST
Request body: { "ass_id":"5",  "course":"math"}



>>>>Course Coordinator Routes

Functionality: Add course slot(s) in a course coordinator's course.
Route: /cc/slots
Request type: POST
Request body: {"location":"c7.203","time":"11:45","day":"Monday","type":"lab"}

Functionality: Delete course slot(s) in a course coordinator's course.
Route: /cc/slots
Request type: DELETE
Request body: {"id":"5fddbdddb77d5c139405ce39"}

Functionality: Update course slot(s) in a course coordinator's course.
Route: /cc/slots
Request type: PUT
Request body: {"id":"5fddbdddb77d5c139405ce39","location":"c7.203","time":"11:45","day":"Monday","type":"lab"}

Functionality: view course slot(s) in a course coordinator's course.
Route: /cc/slots
Request type: GET
Request body: {"id":"5fddbdddb77d5c139405ce39"}
Response: Array of teaching slots, for example:
     {
        "assigneeid": null,
        "_id": "5fdd1f4bb5678e47985c84b7",
        "slot": {
            "_id": "5fdd1f4bb5678e47985c84b8",
            "location": "c7.203",
            "time": "11:45",
            "day":"Monday",
            "course": "db"
        },
        "ccId": 5,
        "__v": 0
    }

Functionality: view "slot linking" request(s) from academic members linked to a course coordinator's course.
Route: /cc/requests
Request type: GET
Response: Array of requests, for example:
    {
    "_id":"5fde3f9ff3262636089555de",
    "status":"Pending",
    "sender_id":14,
    "receiver_id":10,
    "type":"slot linking",
    "info":"5fdd0fc25c246170e02f354f",
    "time":{"$date":{"$numberLong":"1608400799219"}},
    "__v":0
    }

Functionality: Accept/reject "slot linking" requests from academic members linked to a course coordinator's course.
Route: /cc/requests
Request type: POST
Request body: {"id":"1234564345432","accepted":true}

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

