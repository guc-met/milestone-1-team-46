const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const signIn = require('../../models/SignIn');
const leaves = require('../../models/leaves');
const signOut = require('../../models/SignOut');
const HourBalance = require('../../models/HourBalance');
const { sign } = require("jsonwebtoken");
require('dotenv').config();

route.get('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    if(! member.hr){
        return res.status(400).json({msg:"unauthorized you can't access this page"});        
    }

    let pre="";
    if(member.hr)
    {
        pre="hr-";
    }
    else{
        pre="ac-";
    }
    const memid=pre+member.no;
    const month=req.body.month;
    // const day=req.body.day; 
    const allIns=  await signIn.find({id : id});
    const allOuts=  await signOut.find({id : id});
    const leave=await leaves.find({id:id});
    let output = []
    let Signins = []
    let Signouts = []
    let leaveDays=[]
    let totalhours=0;
    let SignInHours=0;
    let SignInMins=0;
    let SignOutHours=0;
    let SignOutMins=0;
    let NextSignInHours=0;
    let NextSignInMins=0;
    let NextSignOutHours=0;
    let NextSignOutMins=0;
    let somehours=0;
    let someminutes=0;
    let missing_hours=0;
    let object ;

    if(month){

        let curHourBalance= await HourBalance.findOne({"id":id,"month":month});

        await HourBalance.findOneAndUpdate({id:id , month:month},{$set :{"hours": 0 }});
    

        //         // check if there's a leave
        for(i = 0 ; i<leave.length ; i++){
            var leaveDay=new Date(leave[i].date).getDate();
            var leaveMonth=new Date(leave[i].date).getMonth()+1
            if( month==leaveMonth){
            var Duration=leave[i].Duration;
           let counter=0;
           for(j=0;j<Duration;j++){
          leaveDays[j]=(new Date(leave[i].date).getDate() + counter);
          counter++;
           }
        
          

        }}

        
      
        for(i = 0 ; i<allIns.length ; i++){
            if(new Date(allIns[i].time).getMonth()+1 == month){
          object = {
                  id : memid,
                  time : allIns[i].time,
                 
          }
          Signins.push(object);

        }
        }
         
            //sign outs

        for(i = 0 ; i<allOuts.length ; i++){
            if((allOuts[i].time).getMonth()+1 == month){
          object = {
                  id : memid,
                  time : allOuts[i].time,
                  
          }
          Signouts.push(object);

        }
        }

    //    console.log(allOuts);
       
       
    
     
    
           if(Signins.length>1){
               console.log("i have to be here");
           for( j=0;j<Signins.length-1 ;j++){
            if(!(leaveDays.includes(Signins[j].time.getDate()))){
            if(Signins[j].time.getDate() == Signouts[j].time.getDate()){ 
                // no missing sign-ins or outs
            if(Signins[j].time.getDate() != Signins[j+1].time.getDate()){  // ideal case sign in & out once early
                 let inTime=Signins[j].time.getHours();
                 let inMins=(Signins[j].time.getMinutes()/60);
                 let outTime=Signouts[j].time.getHours();
                 let outMins=(Signouts[j].time.getMinutes()/60);
                 let hours= outTime-inTime;
                 let minutes=outMins-inMins;
                //  console.log("total minutes"+(hours+minutes));
                 if (hours+minutes <8.4){
                     missing_hrs=(8.4-(hours+minutes))
                    //  console.log("missing_Hrs"+missing_hrs);
                    //  console.log("missing hours is " +missing_hrs);
                    object={
                        id:memid,
                        missing_date: Signins[j].time.getDate(),
                        missing_hours:  missing_hrs,
                    }
                    output.push(object);
            }
        }
        else{
                if(Signins[j].time.getDate() == Signins[j+1].time.getDate() ){ // get next sign in
                 SignInHours=Signins[j].time.getHours();
                 SignInMins=(Signins[j].time.getMinutes()/60);
                 SignOutHours=Signouts[j].time.getHours();
                 SignOutMins=(Signouts[j].time.getMinutes()/60);
                 NextSignInHours=Signins[j+1].time.getHours();
                 NextSignInMins=(Signins[j+1].time.getMinutes()/60);
                 NextSignOutHours=Signouts[j+1].time.getHours();
                 NextSignOutMins=(Signouts[j+1].time.getMinutes()/60);
                 


                 somehours=SignOutHours-SignInHours + (NextSignOutHours-NextSignInHours) -1;
                 someminutes=SignOutMins-SignInMins + (NextSignOutMins-NextSignInMins);

   
                 console.log("sign in hours"+ j+ SignInHours);
                 console.log("sign in mins"+ j+ SignInMins);
                 console.log("sign out hours"+ j+ SignOutHours);
                 console.log("sign out mins"+ j+ SignOutMins);
                 console.log("sign in next hours"+ j+ NextSignInHours);
                 console.log("sign in next mins"+ j+ NextSignInMins);
                 console.log("sign out next hours"+ j+ NextSignOutHours);
                 console.log("sign out next mins"+ j+ NextSignOutMins);
                 console.log("some hours is"+ somehours);
                 console.log("some minutes is"+ someminutes); 
                 totalhours = (somehours + someminutes);
                 console.log("total hours is"+ totalhours);
               //  totalins +=SignInHours+SignInMins;
           
                

                }
                   

    
           }

        // code here
    }}
           
            
         

            
             if (totalhours <8.4){
                 missing_hours=8.4-totalhours;
                 console.log("missing hours is"+ missing_hours);
                object={
                    id:memid,
                    missing_date: Signins[j].time.getDate(),
                    missing_hours: -missing_hours
                }
                output.push(object);
        
            
            }}
            let curHourBalance= await HourBalance.findOne({"id":id});
            if (curHourBalance==null){
                let Hours = new HourBalance({
                    id:id,
                    month:month,
                    hours:-missing_hours,
                    
                   })
                 await  Hours.save();
    
                
            }
            else{

            let curHour=curHourBalance.hours;
            // console.log(curHour);
            await HourBalance.findOneAndUpdate({id:id , month : month},{$set :{"hours": curHour-missing_hours }});
           
            
        }
    }
   

    //   console.log("missing hours is"+missing_hours);

            // return res.send("missing hours : " + JSON.stringify(output));
           
         
           else{
                if(!(leaveDays.includes(Signins[0].time.getDate()))){
                    console.log("my length is 1");
                if(Signins[0].time.getDate() == Signouts[0].time.getDate()){ 
                    // console.log("definitely here");
                    // no missing sign-ins or outs
             // ideal case sign in & out once early
                     let inTime=Signins[0].time.getHours();
                     let inMins=(Signins[0].time.getMinutes()/60);
                     let outTime=Signouts[0].time.getHours();
                     let outMins=(Signouts[0].time.getMinutes()/60);
                     let hours= outTime-inTime;
                     let minutes=outMins-inMins;
                    //  console.log("total minutes"+(hours+minutes));
                     if (hours+minutes <8.4){
                         missing_hrs=(8.4-(hours+minutes))
                         console.log("missing_Hrs"+missing_hrs);
                        //  console.log("missing hours is " +missing_hrs);
                        object={
                            id:memid,
                            missing_date: Signins[0].time.getDate(),
                            missing_hours:  missing_hrs,
                        }
                        output.push(object);
                }
                
            
    
                
               }
                let curHourBalance= await HourBalance.findOne({"id":id,"month":month});
                if (curHourBalance===null){
                    let Hours = new HourBalance({
                        id:id,
                        hours:missing_hrs,
                        month:month,
                       })
                     await  Hours.save();
        
                    
                
            }
            else{
                let curHour=curHourBalance.hours;
                // console.log(curHour);
                await HourBalance.findOneAndUpdate({id:id,"month":month},{$set :{"hours": curHour+missing_hours }});
            }
              
               
    
        //   console.log("missing hours is"+missing_hours);
    
                // return res.send("missing hours : " + JSON.stringify(output));
               }     }
           }

    
    //    return res.send("leave days : " + JSON.stringify(leaveDays));
    // return res.send("outs : " + JSON.stringify(Signouts) + "ins :"+JSON.stringify(Signins));
    return res.send("missing : " + JSON.stringify(output) );
    
   
   
    
}
)
module.exports = route;