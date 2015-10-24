#!/bin/bash
cd ..
cp -f ../../mission/ikarus.Altis/script/loot/lootTable.sqf ./features/loot/client/lootTable.js
meteor bundle ikarus.tgz
scp -C ikarus.tgz ikarus@ikarus.idleplaythings.com:~/ikarus/
rm ikarus.tgz
cd deploy
ssh ikarus@ikarus.idleplaythings.com 'bash -s' < serverSideDeploy.sh
