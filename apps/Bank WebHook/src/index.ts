import  express  from "express";
import db from  "@repo/db/index" ;

const app = express() 
app.post('/', (req,res) => {
   const paymentInformation = {
     token: req.body.token,
     userId : req.body.user_identifier,
     amount : req.body.amount
   } ;
   db.balance.update({
    where : {
        userId : paymentInformation.userId
    },
    data : {
        amount : {
            increment : paymentInformation.amount
        }
    }
   })
})