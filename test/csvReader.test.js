const fs = require('fs');
const CsvReader = require('../src/csvReader');

jest.mock('fs');

describe('CsvReader', () => {
  let reader;

  beforeEach(() => {
    reader = new CsvReader('path/to/mock.csv');
  });

  test('should read data correctly', async () => {
    const mockData = ['John Doe,30', 'Jane Doe,25'];
    const mockReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === 'data') {
          mockData.forEach((line) => {
            const parts = line.split(',');
            callback({ name: parts[0], age: parts[1] });
          });
        } else if (event === 'end') {
          callback();
        }
        return mockReadStream;
      }),
    };
    fs.createReadStream.mockReturnValue(mockReadStream);

    const data = await reader.readCSV();
    expect(data).toEqual([
      { name: 'John Doe', age: '30' },
      { name: 'Jane Doe', age: '25' }
    ]);
  });

  test('should handle file not found error', async () => {
    fs.createReadStream.mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory');
    });

    await expect(reader.readCSV()).rejects.toThrow('ENOENT: no such file or directory');
  });

  test('should handle invalid CSV format error', async () => {
    const mockReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === 'error') {
          callback(new Error('Invalid CSV format'));
        }
        return mockReadStream;
      }),
    };
    fs.createReadStream.mockReturnValue(mockReadStream);

    await expect(reader.readCSV()).rejects.toThrow('Invalid CSV format');
  });
});
