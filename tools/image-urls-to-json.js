
process.stdin.setEncoding('utf8');

var input = '';

var items = [];

process.stdin.on('readable', function () {
  var chunk = process.stdin.read();

  if (chunk) {
    input += chunk;

    while (true) {
      var inputMatch = input.match(/^[^\n]+\n/);
      if (!inputMatch || inputMatch.length < 1) {
        break;
      }

      input = input.replace(inputMatch[0], '');

      var url = inputMatch[0].trim();
      var urlMatch = url.match(/150px-Arma3_Cfg(Vehicles|Weapons)_(.+).jpg$/);

      items.push({armaClass: urlMatch[2], img: urlMatch[0]});
    }
  }
});

process.stdin.on('end', function () {
  console.log(JSON.stringify(items));
  process.exit();
});
