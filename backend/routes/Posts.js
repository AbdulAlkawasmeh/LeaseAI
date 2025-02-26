const express=require('express')
const router=express.Router()
const {Posts}=require("../models")


router.get("/", async(req, res)=> {
    const ListOfPosts=await Posts.findAll()
    res.json(ListOfPosts)

});

router.post("/", async(req, res) =>{
    const post=req.body;
    await Posts.create(post);
    res.json(post);

});


router.delete("/delete-all", async (req, res) => {
  try {
    await Posts.destroy({ where: {} }); 
    res.json({ message: "All posts deleted successfully!" });
  } catch (error) {
    console.error("Error deleting posts:", error);
    res.status(500).json({ error: "Failed to delete posts", details: error.message });
  }
});





module.exports=router