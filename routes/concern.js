var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_concern_details',upload.single('picture'), function(req, res, next) {
    try{
      pool.query("insert into concerns (concernname,picture) values(?,?)",[req.body.concernname, req.file.filename],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Concern Details Submitted Successfully...',data:result})
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });


  router.get('/display_all_concerns',function(req,res){
    try{
      pool.query("select * from concerns",function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Success',data:result})
          console.log(result)
       }
      
      })
  
   }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  });


  router.post('/edit_concern_data',function(req, res, next) {
    try{
      pool.query("update concerns set concernname=? where concernid=?",[req.body.concernname,req.body.concernid],function(error,result){
       if(error)
       {  
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})
           console.log(error)
      }
           
       else
       {
          res.status(200).json({status:true,message:'Concern Updated Successfully...'})
  
       }
      
      })
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });

  router.post('/edit_concern_picture',upload.single('picture'),function(req, res, next) {
    try{
      pool.query("update concerns set picture=? where concernid=?",[req.file.filename,req.body.concernid],function(error,result){
       if(error)
       {  
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})
           console.log(error)
      }
       else
       {
          res.status(200).json({status:true,message:'Picture Updated Successfully...'})
  
       }
      
      })
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });

  router.post('/delete_concern_data',function(req, res, next) {
    try{
      pool.query("delete from concerns where concernid=?",[req.body.concernid],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Category Deleted Successfully...',data:result})
          // console.log(result)
       }
      
      })
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });
module.exports = router;