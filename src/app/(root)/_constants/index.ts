import { Monaco } from "@monaco-editor/react";
import { Theme } from "../../../types";

type LanguageConfig = Record<
  string,
  {
    id: string;
    label: string;
    logoPath: string;
    apiRuntime: { language: string; version: string };
    monacoLanguage: string;
    defaultCode: string;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    apiRuntime: { language: "javascript", version: "18.15.0" }, // api that we're gonna be using
    monacoLanguage: "javascript",
    defaultCode: `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);`,
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    apiRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python Playground
numbers = [1, 2, 3, 4, 5]

# Map numbers to their squares
squares = [n ** 2 for n in numbers]
print(f"Original numbers: {numbers}")
print(f"Squared numbers: {squares}")

# Filter for even numbers
even_numbers = [n for n in numbers if n % 2 == 0]
print(f"Even numbers: {even_numbers}")

# Calculate sum
numbers_sum = sum(numbers)
print(f"Sum of numbers: {numbers_sum}")`,
  },
  java: {
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    apiRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `public class Main {
  public static void main(String[] args) {
      // Create array
      int[] numbers = {1, 2, 3, 4, 5};
      
      // Print original numbers
      System.out.print("Original numbers: ");
      printArray(numbers);
      
      // Calculate and print squares
      int[] squares = new int[numbers.length];
      for (int i = 0; i < numbers.length; i++) {
          squares[i] = numbers[i] * numbers[i];
      }
      System.out.print("Squared numbers: ");
      printArray(squares);
      
      // Print even numbers
      System.out.print("Even numbers: ");
      for (int n : numbers) {
          if (n % 2 == 0) System.out.print(n + " ");
      }
      System.out.println();
      
      // Calculate and print sum
      int sum = 0;
      for (int n : numbers) sum += n;
      System.out.println("Sum of numbers: " + sum);
  }
  
  private static void printArray(int[] arr) {
      for (int n : arr) System.out.print(n + " ");
      System.out.println();
  }
}`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.png",
    apiRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    // Create vector
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Print original numbers
    std::cout << "Original numbers: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;
    
    // Calculate squares
    std::vector<int> squares;
    std::transform(numbers.begin(), numbers.end(), 
                  std::back_inserter(squares),
                  [](int n) { return n * n; });
    
    std::cout << "Squared numbers: ";
    for (int n : squares) std::cout << n << " ";
    std::cout << std::endl;
    
    // Filter even numbers
    std::cout << "Even numbers: ";
    for (int n : numbers) {
        if (n % 2 == 0) std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // Calculate sum
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum of numbers: " << sum << std::endl;
    
    return 0;
}`,
  }
};

export const THEMES: Theme[] = [
  { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
  { id: "vs-light", label: "VS Light", color: "#ffffff" },
  { id: "monokai", label: "Monokai", color: "#272822" },
  { id: "solarized-dark", label: "Solarized Dark", color: "#002b36" },
];

export const THEME_DEFINITONS = {
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "string", foreground: "E6DB74" },
      { token: "keyword", foreground: "F92672" },
      { token: "number", foreground: "AE81FF" },
      { token: "type", foreground: "66D9EF" },
      { token: "class", foreground: "A6E22E" },
      { token: "function", foreground: "A6E22E" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "F92672" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#75715E",
      "editor.selectionBackground": "#49483E",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorCursor.foreground": "#F8F8F2",
      "editor.selectionHighlightBackground": "#49483E",
    },
  },
  "solarized-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "586e75" },
      { token: "string", foreground: "2aa198" },
      { token: "keyword", foreground: "859900" },
      { token: "number", foreground: "d33682" },
      { token: "type", foreground: "b58900" },
      { token: "class", foreground: "b58900" },
      { token: "function", foreground: "268bd2" },
      { token: "variable", foreground: "b58900" },
      { token: "operator", foreground: "859900" },
    ],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
      "editorLineNumber.foreground": "#586e75",
      "editor.selectionBackground": "#073642",
      "editor.lineHighlightBackground": "#073642",
      "editorCursor.foreground": "#839496",
      "editor.selectionHighlightBackground": "#073642",
    },
  },
};

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    });
  });
};