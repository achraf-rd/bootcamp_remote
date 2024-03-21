//mongoos is a odm (object data model) for mongodb and node.js
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, unique: true },
});

// Create a Model: Create a Mongoose model by associating the schema with a specific collection in the database.
const User = mongoose.model("User", userSchema);
// Use the Model: Now we can use the User model to perform CRUD operations on the associated collectio
// const newUser = new User({
//   name: "User",
//   email: "achraf@arkx.group",
//   age: 25,
// });

// newUser
//   .save()
//   .then((user) => console.log("User created succesfully: ", user))
//   .catch((error) => console.log("Error creating user: ", error));

async function userpattern() {
//find all users-------------------------------------
// User.find()
//   .then((users) => console.log(users))
//   .catch((error) => console.log("Error: ", error));


//find user-------------------------------------
// try{
// const target  = await User.findOne({ name: "User" })
// if(!target){
//   console.log('user not found');
// }
// console.log(target);
// }catch(error){
//     console.log('Error find user: ',error);
//     }
//update user-------------------------------------
try {
   const data = await User.findOneAndUpdate({ name: "User" }, {$set : { age: 30 }})
   if(!data){
    console.log('user not found to update');
   }else{
   console.log('updated user :',data);
   }
} catch (error) {
    console.log('Error update user: ',error);
}

//delete user-------------------------------------
try {
    const data = await User.findOneAndDelete({ name: "User" });
   if(!data){
    console.log('user not found to delete');
   }else {
       console.log('user deleted successfully ',data);
   }
} catch (error) {
    console.log('Error delete user: ',error); 
}
// Close the Mongoose connection
mongoose.connection.close()
  .then(() => {
    console.log('Mongoose connection closed');
  })
  .catch((error) => {
    console.error('Error closing Mongoose connection:', error);
  });

}
userpattern();