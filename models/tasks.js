//Require mongoose package
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define dailytasks with task name , description and habit category 
const DailyTasksSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category:{
    type: String,
    required: true,
    enum: ['Health', 'Career', 'Family', 'Investments', 'Office Work']
  }
});

const DailyTasks = module.exports =mongoose.model('DailyTasks',DailyTasksSchema);

//DailyTasks.find() retreives all the tasks
module.exports.getAllTasks = (callback)=>{
  DailyTasks.find(callback);
}

//newTask.save is used to insert the document into MongoDB 
module.exports.addTask= (newTask, callback) => {
  newTask.save(callback); 
 }
//Here we need to pass an id parameter to DailyTasks.remove 
module.exports.deleteTaskById = (id, callback) => { 
 let query = {_id: id}; 
 DailyTasks.remove(query, callback); 
}