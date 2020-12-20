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
    const allIns=  await signIn.find({id : id});
    const allOuts=  await signOut.find({id : id});
   
    let object ;

    if(month) {
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
       
       
       
       
       
       
           
  
    return res.send("sign ins: " + JSON.stringify(signins) +""+ "signs outs :"+ JSON.stringify(signouts));
    
   
    }
    
}
)

module.exports = route;