var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      var hasMushrooms = function(item) {
        return (item === 'mushrooms')
      }
      productsICanEat = products.filter(function(pizza) {
        return (!pizza.containsNuts && !_(pizza.ingredients).any(hasMushrooms))
      })

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1,1000).reduce(function(acc,val) {
      if (val % 3 === 0 || val % 5 === 0) {
        return acc + val;
      } else {
        return acc;
      }
    }, 0)    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    _(products).chain()
           .map(function(pizza){ return pizza.ingredients})
           .flatten()
           .reduce(function(count, currentIngredient){
              return ingredientCount[currentIngredient] = (ingredientCount[currentIngredient] || 0) + 1
           }, ingredientCount)

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

/*********************************************************************************/

  it("should find the largest prime factor of a composite number", function () {

    function isPrime(num) {
      if (num < 2) { return false; }
      var i = 2;
      while (i <= Math.sqrt(num)) {
        if (num % i === 0) { return false; }
        i++;
      }
      return true;
    }

    function listFactors(num) {
      var factors = [];
      for (var i = 1; i <= num; i++) {
        if (num % i === 0) {
          factors.push(i);
        }
      }
      return factors;
    }

    function largestPrimeFactor(num) {
      return listFactors(num).filter(isPrime).pop();
    }

    expect(largestPrimeFactor(9007199)).toBe(991)

  });

  /*********************************************************************************/

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(string) {
      return string.split('').reverse().join('') === string;
    }

    function threeDigitProductPalindrome () {
      var largest = 0;
      for (var i = 999 ; i >= 100; i--) {
        for (var j = 999 ; j >= 100 ; j--) {
          var product = i * j;
          if (isPalindrome(product.toString()) && product > largest) {
            largest = product;
          }
        }
      }
      return largest;
    }

    expect(threeDigitProductPalindrome()).toBe(906609);

  });

  /*********************************************************************************/

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    function smallestDivisibleFromOneThroughTwenty () {
      var answer = 0;
      var i = 20;
      var isFound = false;
      while (!isFound) {
        var isDivisible = true;
        for (var j = 1; j <= 20; j++) {
          if (i % j !== 0) {
            isDivisible = false;
          }
        }
        if (isDivisible) {
          answer = i;
          isFound = true;
        }
        i += 20;
      }
      return answer;
    }

    expect(smallestDivisibleFromOneThroughTwenty()).toBe(232792560)
    
  });

  /*********************************************************************************/

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function differenceSumsAndSquares(num) {
      var numbers = [];
      for (var i = 1 ; i <= num ; i++) {
        numbers.push(i);
      }
      var sumOfSquares = numbers.reduce(function(acc, val){
        return acc + Math.pow(val, 2);
      })
      var squareOfSums = Math.pow(numbers.reduce(function(acc, val){
              return acc + val;
            }), 2)

      return squareOfSums - sumOfSquares;
    }

    expect(differenceSumsAndSquares(10)).toBe(2640)

  });

  /*********************************************************************************/

  it("should find the 10001st prime", function () {

    function isPrime(num) {
      if (num < 2) { return false; }
      var i = 2;
      while (i <= Math.sqrt(num)) {
        if (num % i === 0) { return false; }
        i++;
      }
      return true;
    }

    function getPrime(num) {
      var primes = [];
      var i = 2
      while(primes.length < num) {
        if (isPrime(i)) {
          primes.push(i);
        }
        i++;
      }
      return primes.pop()
    }

    expect(getPrime(10001)).toBe(104743)

  });

});
