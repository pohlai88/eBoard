// Practice File - Try changing and experimenting here!
// Lines starting with // are comments (notes for humans)

// LESSON 1: Console Log (Print Messages)
console.log("🎉 My first line of code!");

// LESSON 2: Variables (Store Information)
let myName = "Student"; // Change "Student" to your name!
let favoriteNumber = 7; // Change this to your favorite number

console.log("My name is:", myName);
console.log("My favorite number is:", favoriteNumber);

// LESSON 3: Math Operations
let sum = 10 + 5;
let product = 10 * 5;
console.log("10 + 5 =", sum);
console.log("10 × 5 =", product);

// LESSON 4: Functions (Reusable Code Blocks)
function sayHello(name: string) {
  console.log("👋 Hello,", name + "!");
}

sayHello("World");
sayHello(myName);

// LESSON 5: Conditionals (Making Decisions)
let age = 20; // Try different numbers!

if (age >= 18) {
  console.log("✅ You are an adult");
} else {
  console.log("❌ You are a minor");
}

// YOUR TURN! Try these challenges:
// 1. Add your own console.log message
// 2. Create a variable with your favorite food
// 3. Create a function that adds two numbers
// 4. Change the age variable and see what happens

console.log(
  "\n✨ Practice complete! Try editing this file and run: deno run practice.ts",
);
