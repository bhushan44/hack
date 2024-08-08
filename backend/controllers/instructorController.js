const Instructor=require("../models/instructormodel")
async function createinstructor(req,res){
    const images=req.file.location;
    const { name, bio, qualifications} = req.body;
    try{
        const instructor= new Instructor({
            name:name,
            bio:bio,
            qualifications:qualifications?qualifications.split(",").map(quali=>quali.trim()):[],
            photo:images
        })
        const data = instructor.save();
        res.json({
      status: "success",
      message: "Instructor created successfully",
      data:data
    })
    }catch(e){
        res.json({
            status: "fail",
            message: e.message
          });
    }
}
async function getinstructor(req,res){
    try {
        const data = await Instructor.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving Instructor', error: error.message });
      }   
}
module.exports= {createinstructor,getinstructor}