const fs = require('fs');

function writeFile(fileName, fileContent) {
  try {
    const response = fs.writeFileSync(fileName, fileContent);
    return response
  }
  catch {
    console.log('Erro');
  };
};

module.exports = writeFile;
