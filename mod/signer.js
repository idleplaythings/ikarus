var fs = require('fs');
var exec = require('child_process').exec;

var sign = process.argv[2];
var key = process.argv[3];
var folder = process.argv[4];

if (! folder || ! sign || ! key) {
  console.log("Usage node signer.js (path to DSSignFile.exe) (path to private key) (path to pbo folder)");
  process.exit();
}

var files = fs.readdirSync(folder);

files.filter(function(filename) {
  if (! filename) {
    return false;
  }

  return filename.indexOf('.pbo') > -1;
}).forEach(function(pbo) {

  var oldPath = folder + "/" + pbo;
  var path = folder + "/" + pbo.toLowerCase();
  if (pbo.indexOf('.bisign') > -1) {
    fs.unlinkSync(oldPath);
  } else {
    fs.renameSync(oldPath, path+"temp");
    fs.renameSync(path+"temp", path);
    var command = '"'+sign + '" "' + key + '" "' + path + '"';
    //console.log(command);
    
    exec(command,
      function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    
  }
  
  console.log(pbo);
});