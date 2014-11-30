
startGame = {
  ['lockServer'] call sock_rpc;
  1000 cutText ["GAME STARTED", "PLAIN"];
  
  call hideout_createHideoutForSquads;
  call hideout_movePlayersToHideout;
  call assembleSquads;
  call events_setEventHandlers;
  call objectiveController_createObjectives;
  
  // call other relevant functions to setup the mission
};


if (!MISSION_CONTROL_ENABLED) then {
  sleep 5;
  [] call startGame;
}