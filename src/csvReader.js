const fs = require('fs');
const csv = require('csv-parser');

class CsvReader {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = [];
  }

  readCSV() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (row) => this.data.push(row))
        .on('end', () => {
          console.log('CSV file successfully processed');
          resolve(this.data);
        })
        .on('error', (error) => reject(error));
    });
  }
}

module.exports = CsvReader;