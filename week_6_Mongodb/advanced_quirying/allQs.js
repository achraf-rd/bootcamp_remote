const vscode = require('vscode');

// Filtering:
Model.find({ field: 'value' });
// In this example we are simply finding the document where field='value'.
// Logical Operators:
Model.find({
  $or: [{ field1: 'value1' }, { field2: 'value2' }],
  $and: [{ field3: 'value3' }, { field4: 'value4' }]
});
// This example uses logical operators $or and $and to perform OR and AND operations on multiple conditions.
// Comparison Operators:
Model.find({
  field: { $gt: 10, $lt: 20 }
});
// Here, we're using the $gt (greater than) and $lt (less than) operators to find documents where the 'field' value is between 10 and 20.
// Inclusion/Exclusion:
Model.find({
  field: { $in: ['value1', 'value2'] }
});
// This query returns documents where the 'field' value is either 'value1' or 'value2'. Conversely, we can use $nin for exclusion.
// Date Range:
Model.find({
  dateField: { $gte: new Date('2022-01-01'), $lte: new Date('2022-12-31') }
});
// This example filters documents with a 'dateField' value within a specific date range.
// Combining Conditions:
Model.find({
  $and: [
    { field1: 'value1' },
    { $or: [{ field2: 'value2' }, { field3: 'value3' }] }
  ]
});
// Complex queries can be built by combining multiple conditions with logical operators.



// Sorting: Sorting is crucial when you want to retrieve documents in a specific order. In Mongoose, you can use the sort() method.
User.find()
  .sort({ age: 1 })
  .then((users) => {
    console.log(users);
  });
// Here we are sorting the collection of users ascending 1, we can perform a descending sort as well by using -1.
// Pagination: Pagination helps you limit the number of documents returned in a single query, making it more efficient, especially for large datasets.
User.find()
  .skip(2)
  .then((users) => {
    console.log(users);
  });
// In this example we are using the skip() method to ignore a certain amount of documents.
User.find()
  .limit(5)
  .then((users) => {
    console.log(users);
  });
// Now we are using the limit() method to specify the amount of documents we want to retrieve.
const pageSize = 10;
const pageNumber = 3;

User.find()
  .skip((pageNumber - 1) * pageSize)//skip the first n docs ({| | |} [|]4 |)  | = 10
  .limit(pageSize)//get the first m docs after 
  .then((users) => {
    console.log(users);
  });

//If pageNumber is 1, skip would be 0, and the query would return the first 10 documents.
// If pageNumber is 2, skip would be 10, and the query would return the next 10 documents.
// If pageNumber is 3, skip would be 20, and so on.

// Using the previous methods combined we can perform pagination where pageSize is the number of documents returned and the pageNumber is the index of pagination we are performing.
// Aggregation: Aggregation is a powerful feature for transforming and processing data. You can perform complex operations using the aggregation pipeline.
User.aggregate([
  {
    $group: {
      _id: "$age",
      count: { $sum: 1 },
    },
  },
]).then((users) => {
  console.log(users);
});
// The $group stage groups the users by their age, and the $sum accumulator counts the number of users in each age group.
User.aggregate([
  {
    $group: {
      _id: "",
      averageAge: { $avg: "$age" }
    }
  }
]).then((user) => {
  console.log(user);
});
// In this example, the $avg accumulator calculates the average age of all users.

//output :

// [
//     { _id: 25, count: 3 },
//     { _id: 30, count: 5 },
//     // ... and so on for other age groups
//   ]
  
// Adding Validation Rules:
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    },
    age: {
        type: Number,
        min: [18, 'Must be at least 18 years old'],
    },
});

Explanation:
/************************************************************************************************* 
[a-zA-Z0-9._%+-]+: This part specifies the local part of the email address before the '@' symbol.
It allows one or more characters that can be letters (both uppercase and lowercase), digits, dots,
underscores, percent signs, plus signs, or hyphens.

@: This is the literal '@' symbol that separates the local part from the domain part of the email address.

[a-zA-Z0-9.-]+: This part specifies the domain part of the email address. It allows one or more characters
 that can be letters (both uppercase and lowercase), digits, dots, or hyphens.

\.: This is the literal dot (.) that separates the main domain from the top-level domain (TLD).

[a-zA-Z]{2,}: This specifies the TLD and ensures it consists of at least two letters, allowing for
 country code TLDs.

The overall regular expression is designed to match a standard email address format, ensuring that it
 includes a local part, '@' symbol, domain part, and a valid top-level domain
 */