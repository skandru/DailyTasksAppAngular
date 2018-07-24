//Require the express package and use express.Router() 
const express = require('express'); 
const router = express.Router();
const dailytasks = require('../models/tasks');
//GET HTTP method to /dailytasks
 router.get('/',(req,res) => { 
   dailytasks.getAllTasks((err,tasks)=>{
     if(err){
       res.json({success:false, message: `Failed to load all tasks. Error:${err}`});

     }else{
       res.write(JSON.stringify({success:true, tasks:tasks}, null,2));
       res.end();
     }
   });
  });
//POST HTTP method to /dailytasks
router.post('/', (req,res,next) => {
   let newTask = new dailytasks({
      title: req.body.title, 
      description: req.body.description, 
      category: req.body.category
  }); 
  dailytasks.addTask(newTask,(err, tasks) => {
     if(err) {
        res.json({success: false, message: `Failed to create a new task.  Error: ${err}`});
  } else
  res.json({success:true, message: "Added successfully."});
  });
  });

//DELETE HTTP method to /dailytasks. 
//Here, we pass in a param which is the object id. 
router.delete('/:id', (req,res,next)=> { 
  //access the parameter which is the id of the item to be deleted 
  let id = req.params.id; 
  //Call the model method deleteListById 
  dailytasks.deleteTaskById(id,(err,task) => { 
    if(err) { res.json({success:false, message: `Failed to delete the list. Error: ${err}`}); 
} else if(task) 
    {
       res.json({success:true, message: "Deleted successfully"}); } else res.json({success:false}); }) 
});
module.exports = router;