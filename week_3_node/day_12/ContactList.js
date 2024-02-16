const readline = require('readline');
const { EventEmitter } = require('events');

class Contact {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }
}

class ContactList extends EventEmitter {
  constructor() {
    super();
    this.contacts = [];
  }

  addContact(name, phone) {
    const newContact = new Contact(name, phone);
    this.contacts.push(newContact);
  }

  listContacts() {
    console.log('\nContact List:');
    this.contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.name} - ${contact.phone}`);
    });
  }
  // arrow function to avoid this binding problem 
  searchfor(target) {
    let foundes = this.contacts.filter((e)=> e.name.toLowerCase().trim() === target.toLowerCase().trim())
    if(foundes.length>0){
    foundes.forEach((e,index) => {
      console.log(`${index + 1}. ${e.name} - ${e.phone}`);
        })
    }else{console.log(`No elements with name ${target} found in the collection`);}
}
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const contactList = new ContactList();



function prompt(input) {
  return new Promise((resolve, reject) => {
    rl.question(input, (answer) => {
      resolve(answer);
    });

    // Handle errors using the 'error' event
    /* rl.on('error', (error) => {
      reject(error);
    }); */
    //error in memory (node:14776) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 error listeners added to [Interface]. Use emitter.setMaxListeners() to increase limit
    //* w can handle this error by remove the error listener like in the function below
  });
}

/* function prompt(input) {
  return new Promise((resolve, reject) => {
    // Define the event listener function
    function handleAnswer(answer) {
      resolve(answer);
      // Remove the 'error' event listener after resolving the answer
      rl.removeListener('error', handleError);
    }

    // Define the 'error' event listener function
    function handleError(error) {
      reject(error);
      // Remove the 'error' event listener after rejecting with an error
      rl.removeListener('error', handleError);
    }

    // Add the 'line' event listener for user input
    rl.once('line', handleAnswer);

    // Add the 'error' event listener for handling errors
    rl.on('error', handleError);

    // Ask the question
    rl.question(input, () => {
      // No need to do anything here since the 'line' event will trigger
    });
  });
} */

  


contactList.on('addcontact', async () => {
  let name = await prompt("name : ");
  let phone  = await prompt("phone : ");
  contactList.addContact(name,phone)
 
  askForAction();
});

contactList.on('list',() => {
  contactList.listContacts();
  askForAction();
})

contactList.on('search', async () => {
  target = await prompt("give me the contact name that you search for : ");
  contactList.searchfor(target);
  askForAction();
})


async function askForAction() {
  let choice = await prompt('\nChoose an action:\n1. Add Contact\n2. List Contacts\n3. Search for contact\n4. Exit \nEnter your choice: ')
    switch (choice) {
      case '1':
        contactList.emit('addcontact');
        break;
      case '2':
        contactList.emit('list');
        break;
      case '4':
        rl.close();
        break;
      case '3' : 
      contactList.emit('search');
      break;
      default:
        console.log('Invalid choice. Please enter a valid option.');
        askForAction();
    }
  }


// Start the application
askForAction();
