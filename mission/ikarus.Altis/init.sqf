if (! isServer) exitwith {};

gameStarted = false;

[] execVM "waiting.sqf";
[] execVM "startGame.sqs";
[] execVM "buildingFinder.sqf";
[] execVM "squad.sqf";
[] execVM "hideout.sqf";
[] execVM "player.sqf";

call compile preprocessfile "SHK_pos\shk_pos_init.sqf";