const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error)); 

const userSchema = new mongoose.Schema({
    //Create a user schema with fields name, email, age and a createdAt of type Date with a default value set to the current date and time
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    });



const User = mongoose.model("User", userSchema);

function createUser(name , email , age){

const newUser = new User({name : name , email: email , age : age , createdAt});
newUser.save()
.then((user) => console.log("User created succesfully: ", user))
.catch((error) => console.log("Error creating user: ", error));

}

async function fetchUsers() {
    try {
        const  Us = await User.find();
        if(!User){
            console.log('users not found'); 
        }else{
            console.log('all users : ');
            Us.forEach((user)=> console.log(user.name+' '+user.email+' '+user.age))
        }
        
    } catch (error) {
        console.log('Error: ', error); 
    }
}

async function fetchUserByNameAndEmail(name,email) {
    try{ 
        let query = {};
        if (name) {
        query.name = name;
        }

    if (email) {
      query.email = email;
    }
    const  Us = await User.find(query);
            if(!Us || Us.length === 0){
                console.log('user not found');
                }else{
                console.log(Us);
                }
    }catch(err){
        console.log('Error find user: ',err);
    }
}

async function updateUser(name,up) {
    try{
        const  Us = await User.findOneAndUpdate({name : name},{$set : up});
        if(!Us){
            console.log('user not found');
        }
    console.log(Us);
;    }catch(err){
        console.log('Error update user: ',err);
    }
}
//  
async function deleteUserByDate(name,datethreshold) {
    try {
        //delet all users created befor datethreshold
        const data = await User.deleteMany({createdAt : {$lt : datethreshold}})
       if(!data){
        console.log('user not found to delete');
       }else {
           console.log('user deleted successfully we deleted :  ',data.deletedCount,' users');
       }
    } catch (error) {

        console.log('Error delete user: ',error); 
    }
}

async function foo(){
    try{
    await fetchUsers()
    await fetchUserByNameAndEmail('achraf1');
    await deleteUserByDate('arkadian',new Date('2024-03-01T14:00:00.000Z'))
    mongoose.connection.close();
    }catch(err){
    console.log('closing error ',err)
    }

}


foo();



