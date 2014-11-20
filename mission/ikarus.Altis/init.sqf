if (!isserver) exitwith {};

gameStarted = true;

[] execVM "waiting.sqf";
[] execVM "startGame.sqs";
[] execVM "buildingFinder.sqf";