
# Introduction

Ikarus is a team vs team mod for Arma 3 with player progression tracked in a web app.

# License

Ikarus is licences under [Arma Public License Share Alike (APL-SA)](http://www.bistudio.com/community/licenses/arma-public-license-share-alike) 

# Running

## WebApp

1. Install https://www.meteor.com/
1. `cd ikarus-webapp/src`
1. `meteor --settings env/dev.json`
1. Open http://localhost:3000/
1. Configure steam login by following instructions on the page.

### Tests

1. `cd ikarus-webapp`
1. npm install
1. npm test


## Arma3 & Monitor


### Launch Arma 3 with following paramters:
-showscripterrors -sock_host=::1 -sock_port=1337 -mod=@ikarus;

### Set ENV environment variable to dev for monitor
$env:ENV="dev"

### Launch monitor
node main.js ./config.example


# Environments

## Production

WebApp - http://ikarus.idleplaythings.com/
