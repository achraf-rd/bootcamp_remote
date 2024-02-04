/* 
async function fetchUserData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Corrected line: call .json() method
    //console.log(data);
    return data ;
  } catch (error) {
    console.error('FATAL ERROR:', error.message);
  }
}
let app ;
fetchUserData('https://dummyjson.com/users').then((data)=> app = data );

console.log(app);
 */

async function fetchUserData() {
    try {
      const response = await fetch('https://dummyjson.com/users');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  }
  
  function processUserData(users) {
    const filteredUsers = users.filter(user => user.gender.toLowerCase() !== 'male');
  
    const mappedUsers = filteredUsers.map(user => `Name: ${user.firstName + ' ' + user.lastName}, Age: ${user.age}`);
  
    return mappedUsers;
  }
  
  function summarizeAge(users) {
    // Use reduce to calculate the total age of all male users

    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    return totalAge;
    
  }
  
  async function main() {
    try {
      const userData = await fetchUserData();
    // distructuring to retrive only the users array and remove "total" "skip"
      const { users } = userData;
  
      const processedUsers = processUserData(users);
  
      const totalAge = summarizeAge(users);
  
      console.log('Processed Users:');
      processedUsers.map(user => console.log(`- ${user}`));
  
      console.log(`Total Age of Active Users: ${totalAge}`);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  
  main();
  