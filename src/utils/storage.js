const fs = require("fs");

// Function to read the first line from a file
function readFirstLine(filePath) {
  try {
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(1024); // Buffer size for reading
    const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
    fs.closeSync(fd);
    return buffer.toString("utf8", 0, bytesRead);
  } catch (err) {
    console.error("Error reading first line:", err);
    return null;
  }
}

// Function to update the first line in a file
function updateFirstLine(filePath, newFirstLine) {
  try {
    const fd = fs.openSync(filePath, "r+");
    fs.writeSync(fd, newFirstLine, 0, newFirstLine.length, 0);
    fs.closeSync(fd);
  } catch (err) {
    console.error("Error updating first line:", err);
  }
}

// Function to save primes to a file
function savePrimesToFile(primes) {
  try {
    const filePath = "primes.txt";
    const fileContent = readFirstLine(filePath);

    // Find the position of the first newline character
    const firstNewlineIndex = fileContent.indexOf("\n");
    if (firstNewlineIndex === -1) {
      console.error("Error: Invalid file format.");
      return;
    }

    // Parse the number of primes found from the first line
    const numPrimes = parseInt(
      fileContent.slice(0, firstNewlineIndex).trim(),
      10
    );
    const newNumPrimes = numPrimes + primes.length;

    // Convert the new number of primes to a string
    const newFirstLine = `${newNumPrimes}\n`;

    // Update the first line in the file
    updateFirstLine(filePath, newFirstLine);

    // Append the new primes to the file
    fs.appendFileSync(filePath, "\n" + primes.join("\n") + "\n");
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
    return (primes.length > 0 ? primes[primes.length - 1] : 1) + 1;
  } catch (err) {
    console.error("Error reading primes file:", err);
    return null;
  }
}

module.exports = { savePrimesToFile, loadLastPrimeFromFile };
