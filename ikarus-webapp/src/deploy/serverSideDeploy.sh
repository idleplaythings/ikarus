#!/bin/bash
forever stop ~/ikarus/bundle/main.js || echo "forever not running, ignored"
cd ~/ikarus/
rm -rf ~/ikarus/bundle
tar xfzs ikarus.tgz > /dev/null 2> /dev/null
cd ~/ikarus/bundle/programs/server
npm install
cd ~/ikarus/bundle/programs/server/npm/npm-bcrypt
npm uninstall bcrypt || echo "bcrypt not found, not deleting"
npm install bcrypt
cd ~/ikarus/
PORT=3000 ROOT_URL="https://ikarus.idleplaythings.com" MONGO_URL=mongodb://localhost:27017/ikarus forever start ~/ikarus/bundle/main.js
rm ~/ikarus/ikarus.tgz

echo All done, should be running
