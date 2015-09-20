//this is here so it is loaded for clients
[] execVM "script\markers.sqf";
[] execVM "script\client.sqf";
[] execVM "script\dialog\objectiveDialog.sqf";
[] execVM "script\dialog\newsDialog.sqf";
  
if (! isServer) exitwith {};

// sock-rpc
[] execVM "lib\log.sqf";
[] execVM "lib\sock.sqf";

[] execVM "script\array_ext.sqf";

[] execVM "script\emptyPositionFinder.sqf";
[] execVM "script\popoRandom.sqf";
[] execVM "script\missionControl.sqf";
[] execVM "script\waiting.sqf";
[] execVM "script\squad.sqf";
[] execVM "script\underdog.sqf";
[] execVM "script\hideout.sqf";
[] execVM "script\depotPositions.sqf";
[] execVM "script\houseFurnisher.sqf";
[] execVM "script\math.sqf";
[] execVM "script\lootbox.sqf";
[] execVM "script\player.sqf";
[] execVM "script\AO.sqf";
[] execVM "script\loot.sqf";
[] execVM "script\lootItems.sqf";
[] execVM "script\loot\lootTable.sqf";
[] execVM "script\depots.sqf";
[] execVM "script\vehicle.sqf";
[] execVM "script\objectiveController.sqf";
[] execVM "script\objectives\supply.sqf";
[] execVM "script\objectives\guard.sqf";
[] execVM "script\objectives\hold.sqf";
[] execVM "script\objectives\assasination.sqf";
[] execVM "script\objectives\military.sqf";
[] execVM "script\objectives\raid.sqf";
[] execVM "script\objectives\manhunt.sqf";
[] execVM "script\equipment.sqf";
[] execVM "script\events.sqf";
[] execVM "script\buildingDestroyer.sqf";
[] execVM "script\airstrike.sqf";
[] execVM "script\airdrop.sqf";
[] execVM "script\timeAndWeather.sqf";
[] execVM "script\reinforcements.sqf";
[] execVM "script\outpost.sqf";
[] execVM "script\lastManStanding.sqf";
[] execVM "script\unmannedVehicle.sqf";

[] execVM "script\baseModules\baseModule.sqf";
[] execVM "script\baseModules\primary1.sqf";
[] execVM "script\baseModules\primary2.sqf";
[] execVM "script\baseModules\primary3.sqf";
[] execVM "script\baseModules\primary4.sqf";
[] execVM "script\baseModules\primary5.sqf";
[] execVM "script\baseModules\primary6.sqf";
[] execVM "script\baseModules\primary7.sqf";
[] execVM "script\baseModules\garage1.sqf";
[] execVM "script\baseModules\weaponCache1.sqf";
[] execVM "script\baseModules\reconStation1.sqf";
[] execVM "script\baseModules\medicalStation1.sqf";
[] execVM "script\baseModules\outpostmap1.sqf";
[] execVM "script\baseModules\heloLandingPad1.sqf";
[] execVM "script\baseModules\vehicleAmmo.sqf";
[] execVM "script\baseModules\irishpub.sqf";
[] execVM "script\baseModules\bodyarmor1.sqf";
[] execVM "script\baseModules\shootingrange1.sqf";
[] execVM "script\baseModules\mortarpit.sqf";
[] execVM "script\baseModules\uavModule1.sqf";
[] execVM "script\baseModules\staticWeaponModule1.sqf";
[] execVM "script\baseModules\mobileBase.sqf";

[] execVM "helpers\itemProperties.sqf";

[{ call getAllPlayers }] execVM "script\civilianVehicles.sqf";

call compile preprocessfile "SHK_pos\shk_pos_init.sqf";
