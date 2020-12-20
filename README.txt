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


Functionality: submit replacement request
Route: ac/replacementrequest
Request type: POST


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
Request body: {"type":"Annual leave","info": "2"}

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

