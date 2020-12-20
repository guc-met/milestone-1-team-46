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
    const sID=req.body.id;
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
    const allIns=  await signIn.find({id : sID});
    const allOuts=  await signOut.find({id : sID});
    const leave=await leaves.find({id:sID});
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

    if(month)


    {

        //         // check if there's a leave
        for(i = 0 ; i<leave.length ; i++){
            var leaveDay=new Date(leave[i].date).getDate();
            var leaveMonth=new Date(leave[i].date).getMonth()+1
            if( month==leaveMonth){
            var Duration=leave[i].Duration;

           leaveDays[0]=new Date(leave[i].date).getDate()-1
           leaveDays[1]=new Date(leave[i].date).getDate()
           let counter=1;
           for(j=2;j<Duration;j++){
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
       
       
       
       
     
       
           
           for( j=0;j<Signins.length-1;j++){
            if(!(leaveDays.includes(Signins[j].time.getDate()))){
            if(Signins[j].time.getDate() == Signouts[j].time.getDate()){ // no missing sign-ins or outs
            if(Signins[j+1].time.getDate() != Signins[j].time.getDate()){  // ideal case sign in & out once early
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
            }}
            
            else{
             for( i=0;i<Signins.length-1;i++){
                 if((Signins[i+1].time.getDate())!= undefined){
                 if(Signins[i].time.getDate() ==Signins[i+1].time.getDate()){ // get next sign in
                  SignInHours=Signins[i].time.getHours();
                  SignInMins=(Signins[i].time.getMinutes()/60);
                  SignOutHours=Signouts[i].time.getHours();
                  SignOutMins=(Signouts[i].time.getMinutes()/60);
                  NextSignInHours=Signins[i+1].time.getHours();
                  NextSignInMins=(Signins[i+1].time.getMinutes()/60);
                  NextSignOutHours=Signouts[i+1].time.getHours();
                  NextSignOutMins=(Signouts[i+1].time.getMinutes()/60);
                  


                  somehours=SignOutHours-SignInHours + (NextSignOutHours-NextSignInHours) ;
                  someminutes=SignOutMins-SignInMins + (NextSignOutMins-NextSignInMins);

    
                //   console.log("sign in hours"+ i+ SignInHours);
                //   console.log("sign in mins"+ i+ SignInMins);
                //   console.log("sign out hours"+ i+ SignOutHours);
                //   console.log("sign out mins"+ i+ SignOutMins);
                //   console.log("sign in next hours"+ i+ NextSignInHours);
                //   console.log("sign in next mins"+ i+ NextSignInMins);
                //   console.log("sign out next hours"+ i+ NextSignOutHours);
                //   console.log("sign out next mins"+ i+ NextSignOutMins);
                  totalhours += (somehours + someminutes);
                //  totalins +=SignInHours+SignInMins;
            }
                 }

                 
                    

             }
            }

             if (totalhours <8.4){
                 missing_hours=8.4-totalhours;
                object={
                    id:memid,
                    missing_date: Signins[j].time.getDate(),
                    missing_hours:  totalhours-8.4
                }
                output.push(object);
        
            
            }}
            let curHourBalance= await HourBalance.findOne({"id":sID});
            let curHour=curHourBalance.hours;
            // console.log(curHour);
            await HourBalance.findOneAndUpdate({id:sID},{$set :{"hours": curHour-missing_hours }});
            if (curHour==null){
            let Hours = new HourBalance({
                id:sID,
                hours:missing_hours,
                
               })
             await  Hours.save();

            
        }
    }

    //   console.log("missing hours is"+missing_hours);

            // return res.send("missing hours : " + JSON.stringify(output));
           }     

    }
    //    return res.send("leave days : " + JSON.stringify(leaveDays));
    return res.send("outs : " + JSON.stringify(Signouts));
    // return res.send("missing : " + JSON.stringify(output) );
    
   
   
    
}
)
module.exports = route;