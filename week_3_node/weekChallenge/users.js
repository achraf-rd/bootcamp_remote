const fs = require('fs/promises');
const path = require('path');
const readline = require('readline');


const rl = readline.createInterface({   
    input: process.stdin,
    output: process.stdout
});

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
class User {
  constructor(accountID, name, pin, balance = 0, transactions = []) {
    this.accountID = accountID;
    this.name = name;
    this.pin = pin;
    this.balance = balance;
    this.transactions = transactions;
  }

  deposit(amount, date) {
    const depositTransaction = { type: 'deposit', amount, date };
    this.transactions.push(depositTransaction);
    this.balance += amount;
  }

  withdraw(amount, date) {
    if (this.balance >= amount) {
      const withdrawTransaction = { type: 'withdraw', amount, date };
      this.transactions.push(withdrawTransaction);
      this.balance -= amount;
    } else {
      console.error('Insufficient funds.');
    }
  }
}

class UserDataStorage {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readUserData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or has invalid JSON, return an empty array
      return [];
    }
  }

  async writeUserData(usersData) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(usersData, null, 2), 'utf8');
      console.log('User data updated successfully.');
    } catch (error) {
      console.error('Error writing user data:', error.message);
    }
  }

  generateUniqueID(existingIDs) {
    let newID;
    do {
      newID = `ACC${Math.floor(Math.random() * 9000) + 1000}`;
    } while (existingIDs.includes(newID));
    return newID;
  }

  generateUniquePin(existingPins) {
    let newPin;
    do {
      newPin = Math.floor(Math.random() * 9000) + 1000;
    } while (existingPins.includes(newPin));
    return newPin;
  }

  async addUser(name) {
    const usersData = await this.readUserData();
    const existingIDs = usersData.map(user => user.accountID);
    const existingPins = usersData.map(user => user.pin);

    const newID = this.generateUniqueID(existingIDs);
    const newPin VC= this.generateUniquePin(existingPins);

    const newUser = new User(newID, name, newPin);
    usersData.push(newUser);

    await this.writeUserData(usersData);
    console.log(`User ${name} added successfully with accountID ${newID} and pin ${newPin}.`);
  }

  async authenticateUser() {
    const usersData = await this.readUserData();

    const accountID = await prompt('Enter your accountID: ');
    const pin = await prompt('Enter your pin: ', true);

    const authenticatedUser = usersData.find(user => user.accountID === accountID && user.pin === pin);

    if (authenticatedUser) {
      console.log(`Welcome, ${authenticatedUser.name}!`);
    } else {
      console.error('Invalid credentials. Authentication failed.');
    }
    rl.close();
  }
  
}



async function main() {
  const usersFilePath = path.join(__dirname, 'users.json');
  const userDataStorage = new UserDataStorage(usersFilePath);

  // Example: Add a new user
  await userDataStorage.addUser('Alice');

  // Example: Authenticate a user
  await userDataStorage.authenticateUser();
}

// Run the main function
main();
