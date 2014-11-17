'use strict';

var fs = require('fs');

var weapons = ["arifle_Katiba_F", "arifle_Katiba_F", "arifle_Katiba_F", "arifle_Katiba_F"];

fs.writeFile("box.Stratis/weapons.sqf", JSON.stringify(weapons), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("weapons.sqf generated");
    }
}); 