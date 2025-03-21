/**
 * @file questions.js
 * @description Peer Review Workshop 3 Questions
 */
/**
 * Exercise 1: Filters out negative numbers from an array.
 * @param {number[]} numbers
 * @return {number[]}
 */
function filterNegativeNumbers(numbers) {
    return numbers.filter(number => number >= 0);
  }
  
  /**
   * Exercise 2: Doubling Numbers Divisible by Three
   * 
   * @param {number[]} numbers 
   * @return {number[]} 
   */
  function doubleDivisibleByThree(numbers) {
    return numbers.filter((n) => n % 3 == 0).map((n) => n * 2);
  }
  
  /**
   * Exercise 3: Selecting High-Performing Students with a Specific Hobby
   * 
   * @param {Object[]} students 
   * @return {Object[]}
   */
  function selectHighPerformingStudents(students) {
    return students.filter(student => student.GPA >= 5 && student.hobbies.includes('coding')).map(student => ({name: student.name, email: student.email})).sort((a, b) => a.name.localeCompare(b.name));
  
  }
  
  /**
   * Exercise 4: Aggregating Student Data with `reduce()`
   * 
   * @param {Object[]} students 
   * @return {Object} 
   */
  function aggregateStudentData(students) {
   
    const studentNum = students.length;
  
    const studentAvgGPA = students.reduce((a, e) => a + e.GPA, 0) / studentNum;
  
    const codingStudents = students.filter((s) => s.hobbies.includes("coding"));
    const codingStudentNum = codingStudents.length;
  
    const codingStudentGPA = codingStudents.reduce((a, e) => a + e.GPA, 0) / codingStudentNum;
  
    return {
      studentNum,
      studentAvgGPA,
      codingStudentNum,
      codingStudentGPA,
    };
  }
  
  
  
  /*
   * Exercise 5: Swapping Between Sentence and CamelCase Forms
   * 
   * @param {string} input 
   * @return {string} 
   */
  function swapForm(input) {
    if (input.includes(" ")) {
      
      return input.split(" ").map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1)).join(""); 
    } else {
    
      return input
        .replace(/([A-Z])/g, " $1") .toLowerCase(); 
    }
  }
  
  
  module.exports = {
    filterNegativeNumbers,
    doubleDivisibleByThree,
    selectHighPerformingStudents,
    aggregateStudentData,
    swapForm,
  };
  