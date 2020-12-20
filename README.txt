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
