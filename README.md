
# Introduction

...

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

### Enable test mode in missionControl.sqf
```
# missionControl.sqf:
missionControl_test = true;
```

### Launch Arma 3 with following paramters:
-showscripterrors -sock_host=::1 -sock_port=1337 -mod=@ikrs;

### Set ENV environment variable to dev for monitor
$env:ENV="dev"

### Launch monitor
node main.js ./config.example


# Environments

## Production

WebApp - http://ikarus.idleplaythings.com/
