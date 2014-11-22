if (! isServer) exitwith {};

gameStarted = false;

// sock-rpc
[] execVM "lib\log.sqf";
[] execVM "lib\sock.sqf";

[] execVM "missionControl.sqf";
[] execVM "waiting.sqf";
[] execVM "startGame.sqs";
[] execVM "buildingFinder.sqf";
[] execVM "squad.sqf";
[] execVM "hideout.sqf";
[] execVM "player.sqf";

// set to true if mission control node.js server is available
MISSION_CONTROL_ENABLED = false;

call compile preprocessfile "SHK_pos\shk_pos_init.sqf";