const readline = require('readline');

const contacte = {
    name : "" ,
    phone : ""
} 

const collection = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function searchfor(target){
        let foundes = collection.filter((e)=> e.name.toLowerCase.trim === target.toLowerCase.trim)
        if(foundes.length>0){
        foundes.forEach((e) => {
            console.log( `name : ${e.name} ; phone : ${e.phone}`);
            })
        }else{console.log(`No elements with name ${target} found in the collection`);}
        showMenu();
}

function showMenu() {
  console.log('---------------------------');
  console.log('1. Add a contact');
  console.log('2. View all contacts');
  console.log('3. Search for a contact');
  console.log('4. Exit');
  console.log('---------------------------');
  rl.question('Enter your choice: ', handleUserInput);
}

function handleUserInput(choice) {
  switch (choice) {
    case '1':
        rl.question('name: ', (name) => {
            contacte.name = name;
            console.log("name added");
            rl.question('phone number: ', (phone) => {
                contacte.phone = phone;
                console.log("phone added");
                collection.push(contacte);
                showMenu();
                }); 
            });
            
    break;
    case '2':
        collection.forEach((e) => {
        console.log( `name : ${e.name} ; phone : ${e.phone}`);
        })
    break;
    case '3':
        rl.question('give the name that you search for: ',searchfor);
        break;
    case '4':
      console.log('Exiting the program.');
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please enter a valid option.');
  }

  if (choice !== '4') {
    showMenu();
  }
}

// Start the application by showing the menu
showMenu();
