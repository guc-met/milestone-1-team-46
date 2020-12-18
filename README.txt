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
Route: ac/replacementrequest
Request type: GET
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

Functionality: submit slot linking request
Route: ac/replacementrequest
Request type: POST


Functionality: get  slot linking requests 
Route: ac/replacementrequest
Request type: GET
Response: Array of requests . Example of requests: [
    {
        "status": "Pending",
        "_id": "5fdceaab33137e43080b945f",
        "sender_id": 10,
        "type": "slot linking",
        "time": "2020-12-18T17:45:15.542Z",
        "__v": 0
    }
]





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

