const {PythonShell} = require('python-shell')
 
PythonShell.run('pug_preloader.py', null, function (err) {
  if (err) throw err;
  console.log('finished');
});