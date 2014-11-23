
startGame = {
  gameStarted = true;
  1000 cutText ["GAME STARTED", "PLAIN"];
  
  call hideout_createHideoutForSquads;
  call hideout_movePlayersToHideout;
  call assembleSquads;
  // call other relevant functions to setup the mission
};


if (!MISSION_CONTROL_ENABLED) then {
  sleep 5;
  [] call startGame;
}