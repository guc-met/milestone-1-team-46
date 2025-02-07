const express = require("express");
const route = express.Router({mergeParams: true});
const requests=require("../../models/Requests");
const StaffMembers=require("../../models/staffMember");
const Faculties=require("../../models/Faculties")


route.post("/", async(req, res)=>{
    try{
    //getting the day of the leave
   
    //getting the HOD
    const memId=req.id;
    const mem=  await StaffMembers.findOne({id:memId});
   
    if(! mem){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
   if(!mem.ac){
        return res.status(401).json({msg:"unauthorized"});            
   }
    const memFaculty=mem.faculty;
    const memDepartment=mem.department;
    const faculty=await Faculties.findOne({name:memFaculty});
    const departments=faculty.departments;
    let hodId=0;

   // console.log(departments);
    for(let i=0;i<departments.length;i++)
    {
        if(departments[i].name==memDepartment)
        {
            hodId=departments[i].HOD;
        }

    }
    //getting type of leave, info and day
    const type=req.body.type;
    const info=req.body.info;
   
    const reqDay=req.body.day;
    const annualBalance= mem.annualLeaveBalance;
    const accidentalBalance=mem.accidentLeaveBalance;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy+"-"+mm+"-"+dd;
    if(type=="annual leave")
    {
       console.log(today);
       console.log(reqDay);
        if(reqDay<today)
        {
            res.send("Can not submit annual leave after the targetted day");
        }
        else
        {
            if(info>annualBalance)
            {
                res.send("You have in sufficient Annual Balance");
            }
            else {
                const r1=new requests(
                    {
                        sender_id: req.id,
                        receiver_id:hodId,
                        type: type,
                        info: info,
                        day:reqDay
                    }
                )
               await r1.save().then(()=>{
                   res.send("Request submitted successfully");
                   console.log(`Request submitted successfully ${r1}`);
                  
                } ).catch(err=>{
                    console.log(err.message);
                });

            }

        }
    }
    if(type=="accidental leave")
    {
      
            if(info>accidentalBalance || info > annualBalance)
            {
                res.send("You have in sufficient  Balance");
            }
            else {
                const r1=new requests(
                    {
                        sender_id: req.id,
                        receiver_id:hodId,
                        type: type,
                        info: info,
                        day:reqDay
                    }
                )
               await r1.save().then(()=>{
                   res.send("Request submitted successfully");
                   console.log(`Request submitted successfully ${r1}`);
                  
                } ).catch(err=>{
                    console.log(err.message);
                });

            }

        
    }  
    if(type=="sick leave")
    {
        const date1=new Date(reqDay);
        const date2= new Date();
        const diffDays = date2.getDate() - date1.getDate(); 
  
        console.log(diffDays);
        if(diffDays>3)
        {
            res.send("Can not submit sick leave after more than 3 days");
        }
        else
        {
           const document=req.body.documents;
                const r1=new requests(
                    {
                        sender_id: req.id,
                        receiver_id:hodId,
                        type: type,
                        info: info,
                        day:reqDay,
                        document:document

                    }
                )
               await r1.save().then(()=>{
                   res.send("Request submitted successfully");
                   console.log(`Request submitted successfully ${r1}`);
                  
                } ).catch(err=>{
                    console.log(err.message);
                });

            

        }

        
    }
    if(type=="maternity leave")
    {
        if(mem.gender!="female")
        {
            res.send("Male Acamdemic members can not submit maternity leave requests");
        }
        else
        {
           const document=req.body.documents;
                const r1=new requests(
                    {
                        sender_id: req.id,
                        receiver_id:hodId,
                        type: type,
                        info: info,
                        day:reqDay,
                        document:document

                    }
                )
               await r1.save().then(()=>{
                   res.send("Request submitted successfully");
                   console.log(`Request submitted successfully ${r1}`);
                  
                } ).catch(err=>{
                    console.log(err.message);
                });

            

        }

        
    }
      
        
    if(type=="compensation leave")
    {
       
                if(info==null)
                {
                    res.send("compensation leaves must have a reason")
                }
          else{
                const r1=new requests(
                    {
                        sender_id: req.id,
                        receiver_id:hodId,
                        type: type,
                        info: info,
                        day:reqDay,
                        

                    }
                )
               await r1.save().then(()=>{
                   res.send("Request submitted successfully");
                   console.log(`Request submitted successfully ${r1}`);
                  
                } ).catch(err=>{
                    console.log(err.message);
                });
            }

            

        

        
    }

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})



module.exports = route;
