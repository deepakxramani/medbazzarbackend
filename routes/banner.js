var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_banner_details',upload.any(),function(req,res,next){
  try{
      // console.log("FILES", req.files)
      var files=req.files.map((item)=>{
          return item.filename
      })
      pool.query("insert into banners (bannertype,brandid,picture) values(?,?,?)",[req.body.bannertype,req.body.brandid,files+""], function(error,result){
          if(error)
          {
              res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
              console.log(error);
          }
          else
          {
              res.status(200).json({status:true, message: 'Banners Submitted Successfully...'})
          }
      })
  }
  catch(e)
  {
      console.log("Error: ",e)
      res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
  }
})

module.exports = router;
