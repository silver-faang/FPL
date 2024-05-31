// Create a function fizzBuzz , which outputs numbers from 1 to 100. If number is multiple of 3 - output Fizz instead the number. If number is multiple of 5 - output Buzz instead the number. If number is multiple both of 3 and 5 - output FizzBuzz . Try to realize the function without usage of if , switch or ternary operator - ? :

function fizzBuzz() {
    for (let number = 1; number <= 100; number++) {
        console.log(
            (!(number % 3) && !(number % 5) && "FizzBuzz") ||
            (!(number % 3) && "Fizz") ||
            (!(number % 5) && "Buzz") ||
            number
        );
    }
}

fizzBuzz();