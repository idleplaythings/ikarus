//this is here so it is loaded for clients
 [] execVM "script\markers.sqf";
  
if (! isServer) exitwith {};


gameStarted = false;
// set to true if mission control node.js server is available
MISSION_CONTROL_ENABLED = false;

// sock-rpc
[] execVM "lib\log.sqf";
[] execVM "lib\sock.sqf";

[] execVM "missionControl.sqf";
[] execVM "waiting.sqf";
[] execVM "startGame.sqf";
[] execVM "buildingFinder.sqf";
[] execVM "squad.sqf";
[] execVM "script\hideout.sqf";
[] execVM "script\depotPositions.sqf";
[] execVM "script\houseFurnisher.sqf";
[] execVM "script\math.sqf";
[] execVM "script\lootbox.sqf";
[] execVM "player.sqf";

call compile preprocessfile "SHK_pos\shk_pos_init.sqf";