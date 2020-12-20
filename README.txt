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

