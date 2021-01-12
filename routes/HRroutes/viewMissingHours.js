const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const signIn = require('../../models/SignIn');
const leaves = require('../../models/leaves');
const signOut = require('../../models/SignOut');
const HourBalance = require('../../models/HourBalance');
const { sign } = require("jsonwebtoken");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    const sID=req.body.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    if(! member.hr){
        return res.status(400).json({msg:"unauthorized you can't access this page"});        
    }

    let mem= await staffMember.findOne({id:sID});
        if(! mem){
            return res.status(400).json({msg:"this staff member doesn't exist"});        
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
    let missing_arrs=[];
    let object ;

    if(month){

        let curHourBalance= await HourBalance.findOne({id:sID,month:month});
       await HourBalance.findOneAndDelete({id:sID,month:month});
    

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
        
          

        }
    }

        
      
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

        if (Signouts.length !=Signins.length){
            res.send("please enter  equal signs in and outs to calculate the staff missing hours");
        }

    //    console.log(allOuts);
       
     

       

       if(Signins.length==0 || Signouts.length==0){
        res.send("you dont have signins or outs in the specified month");
    }
    
     
    
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
                 let nextinTime=(Signins[j+1].time.getHours());
                 let nextinMins=(Signouts[j+1].time.getMinutes()/60);
                 let nextoutTime=Signouts[j+1].time.getHours();
                 let nextoutMins=(Signouts[j+1].time.getMinutes()/60);
                 let hours= outTime-inTime ;
                 let nexthours=(nextoutTime-nextinTime);
                 let minutes=outMins-inMins; 
                 let nextminutes=(nextoutMins-nextinMins);
                 console.log("time in is"+ inTime);
                 console.log("in mins is"+ inMins);
                 console.log("time out is"+ outTime);
                 console.log("out mins is"+ outMins);
                 console.log("next time in is"+ nextinTime);
                 console.log("next in mins is"+ nextinMins);
                 console.log("next out time in is"+ nextoutTime);
                 console.log("next out mins is"+ nextoutMins);

                //  console.log("total minutes"+(hours+minutes));
                 if ((hours+minutes) <8.4){
                     missing_hours=(8.4-(hours+minutes))
                    //  console.log("missing_Hrs"+missing_hrs);
                    //  console.log("missing hours is " +missing_hrs);
                    object={
                        id:memid,
                        missing_date: Signins[j].time.getDate(),
                        missing_hours: -missing_hours,
                    }
                    output.push(object);
                    missing_hours=(8.4-(nexthours+nextminutes));
                    missing_arrs.push(missing_hours);
                    console.log("my second missing_hrs"+ missing_hours);
                   
            }
            else{
                extra_hours=(hours+minutes)-8.4
                console.log(" also here");
                object={
                    id:memid,
                    date: Signins[j].time.getDate(),
                    hours:  extra_hours,
                }
                output.push(object);
            }
        }
        else{
            console.log("i accessed this" + j);
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

   
                 console.log("sign in hours"+  SignInHours);
                 console.log("sign in mins"+  SignInMins);
                 console.log("sign out hours"+  SignOutHours);
                 console.log("sign out mins"+  SignOutMins);
                 console.log("sign in next hours"+  NextSignInHours);
                 console.log("sign in next mins"+  NextSignInMins);
                 console.log("sign out next hours"+  NextSignOutHours);
                 console.log("sign out next mins"+  NextSignOutMins);
                 console.log("some hours is"+ somehours);
                 console.log("some minutes is"+ someminutes); 
                 totalhours = (somehours + someminutes);
                 console.log("total hours is"+ totalhours);
               //  totalins +=SignInHours+SignInMins;
           
                

                }
                   

    
           }

      
    }}
           
            
         

            
       
        }



        for( j=Signins.length-2;j<Signins.length-1 ;j++){
            if(!(leaveDays.includes(Signins[j].time.getDate()))){
            if(Signins[j].time.getDate() == Signouts[j].time.getDate()){ 
                // no missing sign-ins or outs
            if(Signins[j].time.getDate() != Signins[j+1].time.getDate()){  // ideal case sign in & out once early
                 let inTime=Signins[j].time.getHours();
                 let inMins=(Signins[j].time.getMinutes()/60);
                 let outTime=Signouts[j].time.getHours();
                 let outMins=(Signouts[j].time.getMinutes()/60);
                 let nextinTime=(Signins[j+1].time.getHours());
                 let nextinMins=(Signouts[j+1].time.getMinutes()/60);
                 let nextoutTime=Signouts[j+1].time.getHours();
                 let nextoutMins=(Signouts[j+1].time.getMinutes()/60);
                 let hours= outTime-inTime ;
                 let nexthours=(nextoutTime-nextinTime);
                 let minutes=outMins-inMins; 
                 let nextminutes=(nextoutMins-nextinMins);
                 console.log("time in is"+ inTime);
                 console.log("in mins is"+ inMins);
                 console.log("time out is"+ outTime);
                 console.log("out mins is"+ outMins);
                 console.log("next time in is"+ nextinTime);
                 console.log("next in mins is"+ nextinMins);
                 console.log("next out time in is"+ nextoutTime);
                 console.log("next out mins is"+ nextoutMins);

                //  console.log("total minutes"+(hours+minutes));
                 if ((hours+minutes) <8.4){
                     missing_hours=(8.4-(nexthours+nextminutes))
                    //  console.log("missing_Hrs"+missing_hrs);
                    //  console.log("missing hours is " +missing_hrs);
                    object={
                        id:memid,
                        missing_date: Signins[j+1].time.getDate(),
                        missing_hours: -missing_hours,
                    }
                    output.push(object);
                    missing_hours=(8.4-(nexthours+nextminutes));
                    missing_arrs.push(missing_hours);
                    console.log("my second missing_hrs"+ missing_hours);
               
            }
            else{
                extra_hours=(hours+minutes)-8.4
                console.log(" also here");
                object={
                    id:memid,
                    date: Signins[j].time.getDate(),
                    hours:  extra_hours,
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

   
                //  console.log("sign in hours"+  SignInHours);
                //  console.log("sign in mins"+ SignInMins);
                //  console.log("sign out hours"+  SignOutHours);
                //  console.log("sign out mins"+  SignOutMins);
                //  console.log("sign in next hours"+  NextSignInHours);
                //  console.log("sign in next mins"+  NextSignInMins);
                //  console.log("sign out next hours"+  NextSignOutHours);
                //  console.log("sign out next mins"+  NextSignOutMins);
                //  console.log("some hours is"+ somehours);
                //  console.log("some minutes is"+ someminutes); 
                 totalhours = (somehours + someminutes);
                //  console.log("total hours is"+ totalhours);
               //  totalins +=SignInHours+SignInMins;
               if (totalhours <8.4){
                 missing_hours=8.4-totalhours;
                 console.log("missing hours is"+ missing_hours);
            
                object={
                    id:memid,
                    missing_date: Signins[j+1].time.getDate(),
                    missing_hours: -missing_hours
                }
                output.push(object);
                
            }
                }
                   

    
           }

        // code here
    }}
           
            
         

            
          
         
        }
            // let curHourBalance= await HourBalance.findOne({"id":sID});
            // console.log("testing this" +curHourBalance);
            // console.log("missing hours is"+ missing_hours)
            if(missing_hours ==0){
                res.send("you dont have any missing hours");
            }
            // console.log("and right here");

    }
   

    //   console.log("missing hours is"+missing_hours);

            // return res.send("missing hours : " + JSON.stringify(output));
           
         
           else{  // ideal case sign in & out once early
                if(!(leaveDays.includes(Signins[0].time.getDate()))){
                    console.log("my length is 1");
                if(Signins[0].time.getDate() == Signouts[0].time.getDate()){ 
                    // console.log("definitely here");
                    // no missing sign-ins or outs
             
                     let inTime=Signins[0].time.getHours();
                     let inMins=(Signins[0].time.getMinutes()/60);
                     let outTime=Signouts[0].time.getHours();
                     let outMins=(Signouts[0].time.getMinutes()/60);
                     let hours= outTime-inTime;
                     let minutes=outMins-inMins;
                     console.log("hour in "+ inTime);
                     console.log("minute in "+ inMins);
                     console.log("hour out "+ outTime);
                     console.log("min out "+ inTime);
                      console.log("total time"+(hours+minutes));
                     if (hours+minutes <8.4){
                         missing_hrs=(8.4-(hours+minutes))
                         console.log("missing_Hrs hereeee"+-(missing_hrs));
                        //  console.log("missing hours is " +missing_hrs);
                        object={
                            id:memid,
                            missing_date: Signins[0].time.getDate(),
                            missing_hours:  -missing_hrs,
                        }
                        output.push(object);
                }
                else{
                    console.log("im here too");
                    extra_hrs=(hours+minutes)-8.4
                    object={
                        id:memid,
                        date: Signins[0].time.getDate(),
                        extra_hours: extra_hrs,
                    }
                    output.push(object);
                }

       
                
            
    
                
               }
                
        
                    
                
            }
              
               
    
               } 
              
           }

    
 
   let finalhours=0;
    for(i=0;i<output.length;i++){
finalhours +=output[i].missing_hours;
    }
    let curHourBalance= await HourBalance.findOne({"id":sID,"month":month});
                if (curHourBalance=== null){
                    console.log("got here");
                    let Hours = new HourBalance({
                        id:sID,
                        hours:finalhours,
                        month:month,
                       })
                     await  Hours.save();
                    }
    return res.send( JSON.stringify(output));
    
   
   
    
}
)
module.exports = route;