const express = require("express");
const route = express.Router();
const staffMember=require("../../models/staffMember");
const Schedule=require("../../models/Schedule");
const room=require("../../models/Room");

require('dotenv').config();

route.post('/', async(req,res)=>{
    let member= await staffMember.findOne({id:req.id});
    if(!member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
 
  
    const HRid=req.id;
     member= await staffMember.findOne({id:HRid});
    if(! member.hr){
        return res.status(400).json({msg:"unauthorized you can't access this page"});        
    }
    let cc,ac,ci,hod=false;
    let hr=false;
    let dayOff="";
    let office="";
    const name=req.body.name;
    const role=req.body.role;
    const email=req.body.email;
    const department=req.body.department;
    const faculty=req.body.faculty;
     cc=req.body.cc;
     ci=req.body.ci;
     hr=req.body.hr;
     hod=req.body.hod;
     ac=req.body.ac;
  //   const email=req.body.email;
    // const salary=req.body.salary;
    // const office=req.body.office;  //passing parameters
        if(ac==true){
            ac=true;
        }
        if(hr==true){
            hr=true;
            dayOff="Saturday";
        }
        if(cc==true){
            cc=true;
        }
        if(hod==true){
            hod=true;
        }
        if(ci==true){
            ci=true;
        }
        
  
    let member2= await staffMember.findOne({email:email});
    if (member2 !=null){
        return res.status(400).json({msg:"please enter a unique email"});  
    }

    if(!email && !department && !faculty && !email && !name){
        return res.status(400).json({msg:"please fill all fields"});  
    }

    if(!email){
        return res.status(400).json({msg:"please enter an email"});

    }

    if(!department){
        return res.status(400).json({msg:"please enter a department"});

    }

    if(!faculty){
        return res.status(400).json({msg:"please enter a faculty"});

    }
    if(ac!=true && cc!=true && ci!=true && hod!=true && hr!=true){
        return res.status(400).json({msg:"please choose a role"});
    }

    if(ac==true && cc==true && ci==true && hod==true && hr==true){
        return res.status(400).json({msg:"you cant choose all roles"});
    }

   
    

    const curRoom=await room.find({roomtype:"office"});
    for(i=0;i<curRoom.length;i++){
        if (curRoom[i].currcapacity +1 <=curRoom[i].maxcapacity){
            office=curRoom[i].location;
            await room.findOneAndUpdate({location:curRoom[i].location},{$set :{"currcapacity": curRoom[i].currcapacity+1}});
        }
    }
    if(name){

        
          let NewStaff = new staffMember({
            name:name,
            hr:hr,
            ac:ac,
            cc:cc,
            ci:ci,
            hod:hod,
            email:email,
            department:department,
            faculty:faculty,
            daysOff:dayOff,
            office:office
            
           })
         await  NewStaff.save();

       
           
    }
    else{
        return res.status(401).json({ msg: "you must enter staff's name " })
    }
    
     member= await staffMember.findOne({email:email});
    let pre="";
    if(member.hr)
    {
        pre="hr-";
    }
    if(member.ac){
        pre="ac-";
    }
    const memid=pre+member.no;

    let schedule = new Schedule({
        id:member.id
         
        })
      await  schedule.save();
    
    res.json({
       "name":member.name,
       "ID with role":memid,
       "ID":member.id,
       "email":member.email,
       "Office":member.office,
       "Day-Off":member.daysOff,
       "Annual Leave Balance":member.annualLeaveBalance,
       "Accidental Leave Balance":member.accidentalLeaveBalance,
       "Department":member.department,
       "Faculty":member.faculty,
    //    "Salary":member.Salary
    })
    // res.send("added new staff member successfully")
}
)

module.exports = route;