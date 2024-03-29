const { isPrime } = require("./src/utils/primes");
const {
  loadLastPrimeFromFile,
  savePrimesToFile,
} = require("./src/utils/storage");

let continueSearching = true;

function findPrimes(max, lastPrime = 1) {
  return new Promise((resolve, reject) => {
    let primes = [];
    let i = lastPrime;

    const intervalId = setInterval(() => {
      if (!continueSearching || i > max) {
        clearInterval(intervalId);
        resolve(primes);
      }

      const batchSize = 1000; // Adjust as needed
      const end = Math.min(i + batchSize, max);

      for (; i <= end; i++) {
        if (isPrime(i)) {
          primes.push(i);
        }
      }

      console.log(
        `i: ${i} / ${Number.MAX_SAFE_INTEGER}, Primes: ${primes.length}`
      ); // Adjust as needed
    }, 0);
  });
}

process.on("SIGINT", () => {
  console.log("End of line");
  continueSearching = false;
});

async function main() {
  let lastPrime = 1;
  const max = Number.MAX_SAFE_INTEGER;
  let primeList = [];

  try {
    lastPrime = loadLastPrimeFromFile();
    primeList = await findPrimes(max, lastPrime);
    savePrimesToFile(primeList);
    console.log(
      `Saved ${primeList.length} primes up to last found: ${
        primeList[primeList.length - 1]
      }`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
