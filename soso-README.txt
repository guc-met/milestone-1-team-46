23- View Dayoff func :-
Functionality : view day off for staff memebers
Route : "./routes/HOD/viewdayoff"
Request type : GET
Example output : {
 {
        "password": "$2a$10$nKVztSgZnEpxRqhuSN3X9.Ofo9UNKuQSRrHthbK7J2HazuJtdoSde",
        "hod": true,
        "ac": false,
        "cc": false,
        "ci": false,
        "daysOff": [
            "Thursday"
        ],
        "faculty": null,
        "department": null,
        "courses": [],
        "salary": 19000,
        "_id": "5fdb966296daff5f384244ac",
        "name": "Muhad",
        "gender": "Male",
        "email": "muhadsamir123@hotmail.com",
        "office": "C605",
        "annualLeaveBalance": 5,
        "hr": false,
        "no": 1,
        "id": 1,
        "__v": 0
    }

24- View request func :-
Functionality : view request "change-day-off" for staff memebers
Route : "./routes/HOD/viewrequests"
Request type : GET
Example output :
   [ {
        "password": "$2a$10$UDpXjmTT1DnuAlB5vxVbyOBv3fTaW7Z0dQA27tEn993TKblatpuBC",
        "hod": true,
        "ac": false,
        "cc": false,
        "ci": true,
        "daysOff": [
            "Sunday"
        ],
        "faculty": "engineering",
        "department": "MET",
        "courses": [],
        "salary": 3000,
        "_id": "5fdc7efe6e875c3bb0d260f4",
        "name": "slim",
        "gender": "Male",
        "email": "ci@hotmail.com",
        "office": "C701",
        "annualLeaveBalance": 5,
        "hr": false,
        "no": 2,
        "id": 2,
        "__v": 0
    }]
25- View coverage func :-
Functionality : view course coverage for courses in hod department
Route : "./routes/HOD/viewcoverage"
Request type : GET
Example output :
    [
    {
        "coursename": "db",
        "coursecode": "1234",
        "ccId": null,
        "ciId": null,
        "_id": "5fdf5313b916e421d03a89f4",
        "__v": 0
    },
    {
        "coursename": "acl",
        "coursecode": "123",
        "ccId": null,
        "ciId": null,
        "_id": "5fdf5313b916e421d03a89f5",
        "__v": 0
    }
]
26- View teaching assigmnet func :-
Functionality : view teaching assigmnet offer by hod department
Route : "./routes/courseInstructorRoutes/viewcourse"
Request type : GET
Example output :
    [
    {
        "assigneeid": 1,
        "_id": "5fdd0e7709d2b033740f0fad",
        "slot": {
            "_id": "5fdd0e7709d2b033740f0fae",
            "location": "c7.109",
            "course": "csen603",
            "time": "10:00"
        },
        "ccId": 10,
        "__v": 0
    },
    {
        "assigneeid": 35,
        "_id": "5fdd0e74b7f2d37b1cdb07a5",
        "slot": {
            "_id": "5fdd0e74b7f2d37b1cdb07a6",
            "location": "c7.109",
            "course": "csen603",
            "time": "10:00"
        },
        "ccId": 10,
        "__v": 0
    }
]
27- View course coverage func :-
Functionality : view coverage of course(s) course instructor is assigned to.
Route : "./routes/courseInstructorRoutes/viewcourse"
Request type : GET
Example output :
    [
    {
        "assigneeid": 1,
        "_id": "5fdd0e7709d2b033740f0fad",
        "slot": {
            "_id": "5fdd0e7709d2b033740f0fae",
            "location": "c7.109",
            "course": "csen603",
            "time": "10:00"
        },
        "ccId": 10,
        "__v": 0
    },
    {
        "assigneeid": 35,
        "_id": "5fdd0e74b7f2d37b1cdb07a5",
        "slot": {
            "_id": "5fdd0e74b7f2d37b1cdb07a6",
            "location": "c7.109",
            "course": "csen603",
            "time": "10:00"
        },
        "ccId": 10,
        "__v": 0
    }
]
28- View slots assigmnet func :-
Functionality : View the slots' assignment of course(s) course instructor is assigned to.
Route : "./routes/courseInstructorRoutes/viewslots"
Request type : GET
Example output :
    [
    {
        "assigneeid": 1,
        "_id": "5fdd0e7709d2b033740f0fad",
        "slot": {
            "_id": "5fdd0e7709d2b033740f0fae",
            "location": "c7.109",
            "course": "csen603",
            "time": "10:00"
        },
        "ccId": 10,
        "__v": 0,
        "coursename": "maths1"
    }
]

29- accept request func :-
Functionality : accept a request sent to hod.
Route : "./routes/HOD/acceptrequest"
Request type : Post
Example input 1 :
{
    "_id": "5fddc78db6f8d80c504d6cac"

}
output : Day off changed!

Example input 2 :{
    
"_id":"5fddceeae760f72b981d18a5"

}
output : "New leave created!"



30- reject request func :-
Functionality : reject a request sent to hod.
Route : "./routes/HOD/rejectrequest"
Request type : Post
Example input :
{
    "sender_id": 2,
    "receiver_id": 1,
    "type": "annual leave",
    "status": "Pending"

}
output : Request Rejected!