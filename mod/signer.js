var fs = require('fs');
var execSync = require('child_process').execSync;


var key = process.argv[2];
var sign = process.argv[3] || "C:/Steam/SteamApps/common/Arma 3 Tools/DSSignFile/DSSignFile.exe";
var folder = process.argv[4]|| "C:/Steam/SteamApps/common/Arma 3/@ikarus/addons";

if (! folder || ! sign || ! key) {
  console.log("Usage node signer.js (path to private key) (path to DSSignFile.exe) (path to pbo folder)");
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
  if (pbo.indexOf('.bisign') > -1) {
    fs.unlinkSync(oldPath);
    console.log("deleting old ", pbo);
  }
});

files = fs.readdirSync(folder);

files.filter(function(filename) {
  if (! filename) {
    return false;
  }

  return filename.indexOf('.pbo') > -1;
}).forEach(function(pbo) {

  var oldPath = folder + "/" + pbo;
  var path = folder + "/" + pbo.toLowerCase();
  if (pbo.indexOf('.bisign') == -1) {
    fs.renameSync(oldPath, path+"temp");
    fs.renameSync(path+"temp", path);
    var command = '"'+sign + '" "' + key + '" "' + path + '"';
    
    var result = execSync(command, []);
    console.log("signing ", pbo);
  }
});