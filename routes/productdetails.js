var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_product_details',upload.any(),function(req,res,next){
    try{
        // console.log("FILES", req.files)
        var files=req.files.map((item)=>{
            return item.filename
        })
        pool.query("insert into productdetails (categoryid,subcategoryid,brandid,productid,productsubname,concernid,description,weight,weighttype,type,packaging,qty,price,offerprice,offertype,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.productsubname,req.body.concernid,req.body.description,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.qty,req.body.price,req.body.offerprice,req.body.offertype, files+""], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Product Details Submitted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.post('/edit_product_details_data',function(req,res,next){
    try{
        pool.query("UPDATE productdetails SET categoryid=?, subcategoryid=?,brandid=?,productid=?,productsubname=?,description=?,weight=?,weighttype=?,type=?,packaging=?,qty=?,price=?,offerprice=?,offertype=? WHERE productdetailid=?",[req.body.categoryid,req.body.subcategoryid, req.body.brandid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.qty,req.body.price,req.body.offerprice,req.body.offertype, req.body.productdetailid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Product Details Edited Successfully!'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})


router.post('/delete_product_details_data',function(req,res,next){
    try{
        pool.query("delete from productdetails where productdetailid=?",[req.body.productdetailid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Product Details Deleted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log("Error: ",e)
        res.status(200).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
    }
})

router.get('/display_all_product_details',function(req,res,next){
    try{
    pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid) as brandname,(select P.productname from products P where P.productid=PD.productid) as productname from productdetails PD",function(error,result){
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


router.post('/edit_product_picture',function(req,res,next){
    try{
        pool.query("UPDATE productdetails SET categoryid=?, subcategoryid=?,brandid=?,productid=?,productsubname=?,description=?,weight=?,weighttype=?,type=?,packaging=?,qty=?,price=?,offerprice=?,offertype=? WHERE productdetailid=?",[req.body.categoryid,req.body.subcategoryid, req.body.brandid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.qty,req.body.price,req.body.offerprice,req.body.offertype, req.body.productdetailid], function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Product Details Edited Successfully!'})
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