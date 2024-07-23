var express = require('express');
var router = express.Router();
var pool=require('./pool')



router.post('/show_all_banners',function(req,res){
    try{
      pool.query("select * from banners where bannertype=?",[req.body.bannertype],function(error,result){
       if(error)
       {    console.log(error)
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
  
      
  }) 


  router.get('/show_all_brands',function(req,res){
    try{
      pool.query("select * from brands where brandid!=0",function(error,result){
       if(error)
       {   console.log(error)
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
  
      
  }) 

router.get('/display_all_category',function(req,res){
    try{
      pool.query("select * from category",function(error,result){
       if(error)
       {    console.log(error)
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



    
router.post('/display_all_subcategory_by_categoryid',function(req,res,next){
    try{
        pool.query("SELECT * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
            if(error)
            {
                res.status(500).json({status: false, meassage:'Server Error:Pls Contact Database Administrator...'})
                console.log(error);
            }
            else
            {
                res.status(200).json({status:true, message: 'Success', data:result})
                console.log(result)
            }
        })
    }
        catch(e)
        {
            console.log("Error: ",e)
            res.status(500).json({status: false, message: 'Server Error: Please Contact Server Administrator...'})
        }
    })


    router.post('/display_all_product_details_by_offer',function(req,res,next){
        try{
        pool.query("select PD.*,P.*,PD.description as pd_description, PD.picture as multi_picture, (select C.categoryname from category C where C.categoryid=PD.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid) as brandname,(select CON.concernname from concerns CON where CON.concernid=PD.concernid) as concernname from productdetails PD, products P where PD.productid=P.productid and PD.offertype=?",[req.body.offertype],function(error,result){
            if(error)
            {
                res.status(200).json({status: false, meassage:'Server Error: Pls Contact Database Administrator...'})
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

      
      router.get('/display_all_category',function(req,res){
        try{
          pool.query("select * from category",function(error,result){
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
        router.post('/display_all_productdetail_by_category',function(req,res,next){
            try
            {  console.log("Filter",req.body)
                var pat='%'+req.body.pattern+'%'
                pool.query("select P.*,PR.*,P.picture as multi_picture, P.description as pd_description,(select C.categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid)as brandname,(select Con.concernname from concerns Con where Con.concernid=P.concernid)as concernname from productdetails P,products PR  where (P.productid=PR.productid and P.categoryid=PR.categoryid and P.brandid=PR.brandid and P.subcategoryid=PR.subcategoryid) and (P.categoryid=? or PR.productname  like ?)",[req.body.categoryid,pat],function(error,result){
                    if (error)
                    {  console.log(error)
                        res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
                    }
                    else
                { console.log(result)
                        res.status(200).json({status:true,message:'Success',data:result})
                    }
                })
            }
            catch(e)
            {
                res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
            }
          
          })

module.exports=router;