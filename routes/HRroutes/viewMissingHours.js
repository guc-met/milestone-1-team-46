const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const signIn = require('../../models/SignIn');
const leaves = require('../../models/leaves');
const signOut = require('../../models/SignOut');
const { sign } = require("jsonwebtoken");
require('dotenv').config();

route.get('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
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
    const day=req.body.day; 
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
    let object ;

    if(month && day)


    {

        //         // check if there's a leave
        for(i = 0 ; i<leave.length ; i++){
            var leaveDay=new Date(leave[i].date).getDate();
            var leaveMonth=new Date(leave[i].date).getMonth()+1
            if(  (leaveDay >= 11 && leaveDay <= day) && month==leaveMonth){
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
            if(new Date(allOuts[i].time).getMonth()+1 == month){
          object = {
                  id : memid,
                  time : allOuts[i].time,
                  
          }
          Signouts.push(object);

        }
        }
       
       
       
       
       
       
           
           for( j=0;j<Signins.length;j++){
            if(!(leaveDays.includes(Signins[j].time.getDate()))){
            if(Signins[j].time.getDate() == Signouts[j].time.getDate()){
            if( Signins.length==1 ||Signins[j].time.getDate() != Signins[j+1].time.getDate()){  // ideal case sign in & out once early
                 let inTime=ins[j].time.getHours();
                 let inMins=(ins[j].time.getMinutes()/60);
                 let outTime=outs[j].time.getHours();
                 let outMins=(outs[j].time.getMinutes()/60);
                 let hours= outTime-inTime;
                 let minutes=outMins-inMins;
                 console.log("total minutes"+(hours+minutes));
                 if (hours+minutes <8.4){
                     missing_hrs=(8.4-(hours+minutes))
                     console.log("missing_Hrs"+missing_hrs);
                    object={
                        id:memid,
                        missing_date: ins[j].time.getDate(),
                        missing_hours:  missing_hrs,
                    }
                    output.push(object);
            }}
            else{
             for( i=0;i<Signins.length-1;i++){
                 console.log("ins length"+ Signins.length);
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

    
                  console.log("sign in hours"+ i+ SignInHours);
                  console.log("sign in mins"+ i+ SignInMins);
                  console.log("sign out hours"+ i+ SignOutHours);
                  console.log("sign out mins"+ i+ SignOutMins);
                  console.log("sign in next hours"+ i+ NextSignInHours);
                  console.log("sign in next mins"+ i+ NextSignInMins);
                  console.log("sign out next hours"+ i+ NextSignOutHours);
                  console.log("sign out next mins"+ i+ NextSignOutMins);
                  totalhours += (somehours + someminutes);
                //  totalins +=SignInHours+SignInMins;
            }
                 }

                 
                    

             }
            }

             if (totalhours <8.4){
                object={
                    id:memid,
                    missing_date: Signins[j].time.getDate(),
                    missing_hours:  8.4-totalhours
                }
                output.push(object);
        
            
            }}
        }

     

            // return res.send("leave days : " + JSON.stringify(leaveDays));
           }     

    }
    //    return res.send("leave days : " + JSON.stringify(leaveDays));
    // return res.send("outs : " + JSON.stringify(Signouts)+ "ins" + JSON.stringify(Signins));
    return res.send("missing : " + JSON.stringify(output) );
    
   
   
    
}
)
module.exports = route;