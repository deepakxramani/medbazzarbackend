var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')


router.post('/submit_subcategory',upload.single('picture'),function(req,res,next){
    try{
        pool.query("insert into subcategory (categoryid,subcategoryname, picture) values(?,?,?)",[req.body.categoryid, req.body.subcategoryname, req.file.filename], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Sub Category Submitted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})



router.post('/edit_subcategory_data',function(req,res,next){
    try{
        pool.query("UPDATE subcategory SET categoryid=?, subcategoryname=? WHERE subcategoryid=?",[req.body.categoryid,req.body.subcategoryname, req.body.subcategoryid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Sub Category Edited Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.post('/edit_subcategory_picture',upload.single('picture'),function(req,res,next){
    try{
        pool.query("update subcategory set picture=? where subcategoryid=?",[req.file.filename, req.body.subcategoryid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Sub Category Icon Updated Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.post('/delete_subcategory_data',function(req,res,next){
    try{
        pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Sub Category Deleted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.get('/display_all_subcategory',function(req,res,next){
    try{
    pool.query("SELECT S.*, (SELECT C.categoryname FROM category C WHERE C.categoryid = S.categoryid) AS categoryname FROM subcategory S",function(error,result){
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


router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
    try{
        pool.query("SELECT subcategoryid, subcategoryname FROM subcategory where categoryid=?",[req.body.categoryid],function(error,result){
            if(error)
            {
                res.status(500).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
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
            res.status(500).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
        }
    })


module.exports = router;
