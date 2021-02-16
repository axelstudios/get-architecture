const fs = require('fs');

module.exports = file => {
  return new Promise((resolve, reject) => {
    // Check that file is readable
    fs.access(file, fs.constants.F_OK | fs.constants.R_OK, error => {
      if (error) {
        reject(new Error(`${file} ${error.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`));
        return;
      }

      // Open file
      fs.open(file, 'r', (error, fd) => {
        if (error) {
          reject(error);
          return;
        }

        // Determine offset to PE header
        let buffer = Buffer.alloc(4);
        fs.read(fd, buffer, 0, 4, 0x3C, error => {
          if (error) {
            reject(error);
            return;
          }

          // Read PE header
          const offset = hexToDec(littleEndian(buffer));
          buffer = Buffer.alloc(2);
          fs.read(fd, buffer, 0, 2, offset + 0x18, error => {
            if (error) {
              reject(error);
              return;
            }

            const hex = littleEndian(buffer);
            const result = hex === '020b' ? 'x64' : (hex === '010b' ? 'x86' : null);

            if (result === null) {
              reject(new Error('Unknown'));
            } else {
              resolve(result);
            }
          });
        });
      });
    });
  });
};

function littleEndian(buffer) {
  return buffer.toString('hex').match(/../g).reverse().join('');
}

function hexToDec(hex) {
  return Number.parseInt(hex, 16);
}
