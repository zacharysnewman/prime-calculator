function isPrime(number) {
  if (number <= 1) {
    return false;
  }
  if (number <= 3) {
    return true;
  }

  if (number % 2 === 0 || number % 3 === 0) {
    return false;
  }

  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }

  return true;
}

function findPrimes(max) {
  const primes = [];
  for (let i = 1; i <= max; i++) {
    if (i % 10000000 === 0) {
      console.log(`i: ${i}, Primes: ${primes.length}`);
    }

    if (isPrime(i)) {
      primes.push(i);
      // console.log(i); // Print prime numbers as they're found
    }
  }
  return primes;
}

const max = Number.MAX_SAFE_INTEGER;
const primeList = findPrimes(max);
console.log("List of prime numbers up to", max, ":", primeList);
