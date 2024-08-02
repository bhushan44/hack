const Retreat=require("../models/retreatschema")
async function createretreat(req,res){
  
   
   const urls= req.files.map((e)=>{
        return( e.location)
    })
    const {name,location,description,features,styles,skillLevel,benefits,program,price}=req.body
    images=[...urls]
    // console.log(urls,"bnch")
    try{
        const retreatdata= new Retreat({
            name,location,description,features,styles,skillLevel,benefits,program,price,images
        })
     const data=await   retreatdata.save()
     res.json({
        status:"success",
        message:"retreat created successfully",
        data

     })

    }
    catch(e){
        res.json({
            status:'fail',
            message:e.message

        })

    }
   

}
module.exports={createretreat}