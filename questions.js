/**
 * @file questions.js
 * @description This file contains programming exercises for Week 5 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus OO programming in JavaScript.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [27/04/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */

/**
 * Question 1: Account Management Function
 *
 * Objective:
 * Create a function called createAccount that can be called either with new or without.
 * This function returns an account object with deposit, withdraw, and checkAccount methods.
 *
 * Details:
 * - The createAccount function takes two parameters: accountName (string), openingBalance (number).
 * - It returns an object with three methods: deposit, withdraw, and checkAccount.
 * - Both deposit and withdraw methods accept a positive number as a parameter.
 *   - If the withdrawal amount is more than the current balance, it returns "Withdraw over balance".
 *   - Otherwise, it returns "OK".
 * - The checkAccount method returns an object with two attributes: transactions (an array) and balance.
 *   - Each transaction in the transactions array is an object with two attributes: action ("open", "deposit", "withdraw") and amount.
 *
 */
function createAccount(accountName, openingBalance) {
  if (!new.target) {
    return new createAccount(accountName, openingBalance);
  }

  let balance = openingBalance;
  let transactions = [{ action: "open", amount: openingBalance }];

  return {
    deposit(amount) {
      if (typeof amount !== "number" || amount <= 0) return "Invalid amount";
      balance += amount;
      transactions.push({ action: "deposit", amount });
      return "OK";
    },
    withdraw(amount) {
      if (typeof amount !== "number" || amount <= 0) return "Invalid amount";
      if (amount > balance) return "Withdraw over balance";
      balance -= amount;
      transactions.push({ action: "withdraw", amount });
      return "OK";
    },
    checkAccount() {
      return {
        balance,
        transactions
      };
    }
  };
}



/**
 * Question 2: Using Getters and Setters in Function Generated Objects
 *
 * Task:
 * Implement a function called `Person` that initializes an object with private properties for
 * `name` and `age`. Use getters and setters to provide access to these properties.
 * - The `setName` setter should capitalize the first letter of the name before storing it.
 * - The `setAge` setter should validate that the age is a valid number between 0 and 120.
 * If the validation fails, do not update the age and console.log an error message: "Invalid age provided".
 *
 * Implementation:
 */

function Person(initialName, initialAge) {
  let name = capitalizeName(initialName);
  let age = initialAge;

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return {
    get getName() {
      return name;
    },



    set setName(newName) {
      name = capitalizeName(newName);
    },

    get getAge() {
      return age;
    },

    set setAge(newAge) {
      if (typeof newAge === "number" && newAge >= 0 && newAge <= 120) {
        age = newAge;
      } else {
        console.log("Invalid age provided");
      }
    }
  };
}









/**
 * Question 3: Using Classes in JavaScript
 *
 * Objective:
 * Understand and apply fundamental Object-Oriented Programming concepts in JavaScript using classes,
 * including class definitions, inheritance, and polymorphism.
 *
 * Part A: Creating a Car Class
 * Define a Car class with the following specifications:
 * - Properties:
 *   - make (string)
 *   - model (string)
 *   - year (number)
 * - Method:
 *   - getInfo(): Returns a string containing the car's make, model, and year.
 *
 * Part B: Inheriting from Car to Create an ElectricCar Class
 * Extend the Car class to create an ElectricCar class with the following additions:
 * - Property:
 *   - batteryLevel (number): Represents the percentage of battery level.
 * - Method:
 *   - getBatteryInfo(): Returns a string stating the battery level.
 *
 * Part C: Implementing Polymorphism
 * Override the getInfo() method in the ElectricCar class to include battery level information
 * along with the car's make, model, and year.
 *
 * [hint]: please check the test cases to find out the expected output string format
 * Implementation:
 */

class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return `${this.make} ${this.model} ${this.year}`;
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, batteryLevel) {
    super(make, model, year);
    this.batteryLevel = batteryLevel;
  }



  
  getBatteryInfo() {
    return `Battery level at ${this.batteryLevel}%`;
  }

  getInfo() {
    return `${super.getInfo()} with ${this.batteryLevel}% battery`;
  }
}

/**
 * Question 4: Extending Prototype with JSON Operations
 *
 * Task:
 * Extend the Array prototype in JavaScript to include two custom methods:
 * - serialize(): Convert the array to a JSON string.
 * - deserialize(json): Populate the array with elements from a JSON string.
 *
 * Guidelines:
 * Implement these methods directly on the Array.prototype to make them available on all array instances.
 */


// Extending Array.prototype to include serialize method
Array.prototype.serialize = function () {
  return JSON.stringify(this);

};

// Extending Array.prototype to include deserialize method
Array.prototype.deserialize = function (json) {
  this.splice(0, this.length, ...JSON.parse(json));
};

/**
 * Question 5: Shopping Cart Management with Direct Access Getters
 *
 * Implement a function called createShoppingCart which initializes and returns an object representing a shopping cart.
 * This object includes methods for adding items, removing items, and getters for totalPrice and itemNumber.
 *
 * Details:
 * - addItem(id, name, price): Adds an item to the cart or updates its quantity if it already exists.
 * - removeItem(id): Removes an item from the cart based on its id.
 * - check(): Returns an object with the total number of items, the total price, and a detailed list of items (including id, name, price, and quantity).
 * - Getters:
 *   - totalPrice: Returns the total price of all items in the cart.
 *   - itemNumber: Returns the total number of items in the cart.
 *
 * Initial state of the shopping cart should be empty. If an added item already exists, their quantities should be merged.
 * Removing an item should decrement its quantity, and items with a quantity of zero should be removed.
 * Assume all function calls are valid and one id always maps to the same product name and price.
 */

function createShoppingCart() {
  const items = [];

  return {
    addItem(id, name, price) {
      const item = items.find(item => item.id === id);
      item
        ? item.quantity += 1
        : items.push({ id, name, price, quantity: 1 });
    },

    removeItem(id) {
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index].quantity -= 1;
        if (items[index].quantity === 0) {
          items.splice(index, 1);
        }
      }
    },

    get totalPrice() {
      return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    get itemNumber() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    check() {
      return {
        items: [...items], // spread for shallow copy
        itemNumber: this.itemNumber,
        total: this.totalPrice,
      };
    }
  };
}


module.exports = {
  Car,
  ElectricCar,
  createAccount,
  Person,
  Array,
  createShoppingCart,
};
