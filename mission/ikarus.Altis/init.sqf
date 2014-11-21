if (! isServer) exitwith {};

gameStarted = false;

[] execVM "waiting.sqf";
[] execVM "startGame.sqs";
[] execVM "buildingFinder.sqf";
[] execVM "squad.sqf";

getAllPlayers = {

  if (count playableUnits == 0) exitWith {[player]};
  
  playableUnits
};