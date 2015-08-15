var fs = require('fs');
var execSync = require('child_process').execSync;


var folder = process.argv[2];
var destination = process.argv[3] || 'C:/Users/Aatu/workspace/arma/mod/icons';
var Pac2PacE = process.argv[4] || 'C:/Steam/SteamApps/common/Arma 3 Tools/TexView2/Pal2PacE.exe';

if (! folder) {
  console.log("Usage: node iconExtractor.js (path to folder with paa files) (path to destination) (path Pal2PacE.exe)");
  process.exit();
}

var files = fs.readdirSync(folder);

files.filter(function(filename) {
  if (! filename) {
    return false;
  }

  return filename.indexOf('.paa') > -1;
}).forEach(function(paa) {
  var original = folder + "/" + paa;
  var png = paa.split(".")[0] + ".png";
  var target = destination + "/" + png;

  var command = '"'+Pac2PacE + '" "' + original + '" "' + target + '"';
  var result = execSync(command, []);
  console.log("extracting ", paa);
});
