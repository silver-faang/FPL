// Create a function isPalindrom , which gets a string as a parameter and returns true or false as the result of checking if string is a palindrome or not (reads the same from left to right and from right to left)

function isPalindrome(str) {
    const length = str.length;
    for (let i = 0; i < Math.floor(length / 2); i++) {
        if (str[i] !== str[length - 1 - i]) {
            return false;
        }
    }
    return true;
}

// Test the function
str1 = 'radar';
str2 = 'hello';
console.log(str1, " is palindrome: ", isPalindrome(str1));
console.log(str2, " is palindrome: ", isPalindrome(str2));

//better code with consideration to posssibility of .()[]{}_ in string 

function palindrome(str) {
    var re = /[\W_]/g;  // regular exp can also be written as /[^a-zA-Z0-9]/g
    str = str.toLowerCase().replace(re, '');
    var len = str.length;
    for (var i = 0; i < len/2; i++) {
      if (str[i] !== str[len - 1 - i]) {
          return false;
      }
    }
    return true;
   }
//palindrome("A man, a plan, a canal. Panama");
str3="A man, a plan, a canal. Panama";
console.log(str3, " is palindrome: ", palindrome(str3));
