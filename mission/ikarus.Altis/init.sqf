//this is here so it is loaded for clients
 [] execVM "script\markers.sqf";
  
if (! isServer) exitwith {};

// sock-rpc
[] execVM "lib\log.sqf";
[] execVM "lib\sock.sqf";

[] execVM "script\missionControl.sqf";
[] execVM "script\waiting.sqf";
[] execVM "script\squad.sqf";
[] execVM "script\hideout.sqf";
[] execVM "script\depotPositions.sqf";
[] execVM "script\houseFurnisher.sqf";
[] execVM "script\math.sqf";
[] execVM "script\lootbox.sqf";
[] execVM "script\player.sqf";
[] execVM "script\AO.sqf";
[] execVM "script\loot.sqf";
[] execVM "script\objectiveController.sqf";
[] execVM "script\objectives\supply.sqf";
[] execVM "script\equipment.sqf";
[] execVM "script\events.sqf";

[] execvm "script\zlt_civveh.sqf";

call compile preprocessfile "SHK_pos\shk_pos_init.sqf";