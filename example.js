const getArchitecture = require('.');

(async () => {
  const arch = await getArchitecture('C:\\Windows\\System32\\cmd.exe');
  console.log(arch); // 'x64'
})();
