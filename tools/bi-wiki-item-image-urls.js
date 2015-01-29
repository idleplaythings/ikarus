
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var https = require('https');
var q = require('q');
var _ = require('underscore');
var util = require('util');

var get = function (url) {
  return q.Promise(function (resolve) {
    https.get(url, function (res) {
      var buffer = '';
      res.on('data', function (data) {
        buffer += data;
      });
      res.on('end', function () {
        resolve(buffer);
      });
    });
  });
};

var pages = [
  'https://community.bistudio.com/wiki/Arma_3_CfgPatches_CfgVehicles',
  'https://community.bistudio.com/wiki/Arma_3_CfgPatches_CfgWeapons'
];

var images = q.all(pages.map(get)).then(function (pages) {
  return _(pages.map(function (content) {
    return $(content).find('.wikitable img').map(function(i, img) {
      return img.src.replace('about:', 'https://community.bistudio.com');
    }).toArray();
  })).flatten(true);
});

images.then(function(images) {
  console.log(images.join('\n'));
});

