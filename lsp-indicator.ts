// LSP Indicator File - This file demonstrates LSP features
// Open this file in Cursor to verify Deno LSP is working
//
// ✅ If LSP is active, you should see:
//    - Type information on hover
//    - Auto-completion suggestions
//    - Go-to-definition (Ctrl+Click / Cmd+Click)
//    - Error squiggles for type errors
//    - CodeLens showing references
//    - Inlay hints showing types

// Test 1: Deno global - hover over 'Deno' to see Deno namespace
console.log("Deno version:", Deno.version.deno);

// Test 2: Type inference - hover over 'data' to see inferred type
const data = { name: "test", value: 42 };

// Test 3: Function with types - hover to see signature
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Test 4: Auto-completion - type 'Deno.' and see available methods
const _version = Deno.version;

// Test 5: Type error detection - uncomment line below to see error squiggle
// const error: string = 123; // Type 'number' is not assignable to type 'string'

// Test 6: Go-to-definition - Ctrl+Click (Cmd+Click) on 'greet' to navigate
// Test 7: Find references - right-click on 'data' → Find All References
// Test 8: CodeLens - see reference count above 'greet' function
// Test 9: Inlay hints - see parameter types inline in function calls
// Test 10: Import suggestions - type 'import' and see suggestions

// Example with proper types
interface User {
  id: string;
  name: string;
}

// Test 11: Interface usage - hover over 'user' to see User type
const user: User = { id: "1", name: "Test" };

// Test 12: Type narrowing - LSP should understand the type
if (user.id) {
  console.log(user.name); // LSP knows user.name is string here
}

export { data, greet, user };
