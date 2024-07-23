var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_brand',upload.single('brandicon'),function(req,res,next){
    try{
        pool.query("insert into brands (brandname, brandicon) values(?,?)",[req.body.brandname, req.file.filename], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Brand Submitted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.post('/edit_brand_data',function(req,res,next){
    try{
        pool.query("update brands set brandname=? where brandid=?",[req.body.brandname, req.body.brandid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Brand Edited Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.post('/edit_brand_icon',upload.single('brandicon'),function(req,res,next){
    try{
        pool.query("update brands set brandicon=? where brandid=?",[req.file.filename, req.body.brandid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Brand Icon Updated Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.post('/delete_brand_data',function(req,res,next){
    try{
        pool.query("delete from brands where brandid=?",[req.body.brandid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Brand Deleted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.get('/display_all_brands',function(req,res,next){
    try{
    pool.query("select * from brands where brandid!=0",function(error,result){
        if(error)
        {
            res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
            console.log(error);
        }
        else
        {
            res.status(200).json({status:true, message: 'Success', data:result})
        }
    })
}
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})


router.post('/fetch_all_brands_by_subcategoryid',function(req,res,next){
    try{
        pool.query("select * from brands where subcategoryid=?",[req.body.subcategoryid],function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Success', data:result})
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
