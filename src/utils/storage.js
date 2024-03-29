const fs = require("fs");

function savePrimesToFile(primes) {
  try {
    fs.writeFileSync("primes.txt", "\n" + primes.join("\n") + "\n", {
      flag: "a",
    });
  } catch (err) {
    console.error("Error writing to primes file:", err);
  }
}

function loadLastPrimeFromFile() {
  try {
    const data = fs.readFileSync("primes.txt", "utf8");
    const rawPrimes = data.split("\n");
    const primes = [
      rawPrimes[rawPrimes.length - 2],
      rawPrimes[rawPrimes.length - 1],
    ]
      .map(Number)
      .filter(Boolean);
    return primes.length > 0 ? primes[primes.length - 1] + 1 : 1;
  } catch (err) {
    console.error("Error reading primes file:", err);
    return null;
  }
}

module.exports = { savePrimesToFile, loadLastPrimeFromFile };
