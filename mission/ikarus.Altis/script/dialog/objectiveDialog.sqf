objectiveDialog_ID = 10;
objectiveDialog_canDestroy = false;
objectiveDialog_objectives = [];
objectiveDialog_currentObjective = 'Supply';
objectiveDialog_time = -1;
objectiveDialog_showing = false;

objectiveDialog_show = {
  private ["_index"];
  disableSerialization;
  call newsDialog_close;

  if (objectiveDialog_showing) exitWith {};

  objectiveDialog_showing = true;
  
  _index = 0;
  objectiveDialog_objectives = _this select 0;
  objectiveDialog_currentObjective = _this select 1;
  objectiveDialog_time = _this select 2;
  objectiveDialog_canDestroy = false;
  createDialog "ikrs_ui_co_dialog";
  
  //systemChat str objectiveDialog_objectives;

  {
    lbAdd [1500, _x select 0];
    if (_x select 1 == (objectiveDialog_currentObjective select 1)) then {
      lbSetCurSel [1500, _index];
    };
    _index = _index + 1;
  } forEach objectiveDialog_objectives;

  (findDisplay 10 displayCtrl 1001) ctrlSetStructuredText parseText call objectiveDialog_getDescription;

  [] spawn objectiveDialog_showTime;
  
};

objectiveDialog_showTime = {
  private ["_text"];

  while {objectiveDialog_time > -1 && objectiveDialog_time >= time} do {
    _text = "READY " + str floor (objectiveDialog_time - time) + "s";
    ctrlSetText [1600, _text];
    sleep 1;
  };
};

objectiveDialog_chooseObjective = {
  private ["_index", "_objective"];
  _index = _this select 1;
  objectiveDialog_currentObjective = objectiveDialog_objectives select _index;

  chooseObjective = [player, objectiveDialog_currentObjective];
  publicVariableServer "chooseObjective";

  // This is for singleplayer testing
  if (isServer) then {
    private ['_squad'];
    _squad = [player] call getSquadForUnit;

    [_squad, objectiveDialog_currentObjective] call objectiveController_changeSquadObjective;
  };

  (findDisplay 10 displayCtrl 1001) ctrlSetStructuredText parseText call objectiveDialog_getDescription;
};

objectiveDialog_ready = {
  objectiveDialog_showing = false;
  objectiveDialog_canDestroy = true;
  objectiveDialog_time = -1;
  findDisplay 10 closeDisplay 1;
};

objectiveDialog_getDescription = {
  private ["_type"];

  _type = objectiveDialog_currentObjective select 1;

  if (_type == "Supply") exitWith {
    "SUPPLY RUN<br/><br/>In this objective you must go trough multiple intel locations in the early game"
   + " and assault a depot during the end game. "
   + " Rewards include high amount of low level loot and a change for small amount of medium loot.";
  };

  if (_type == "Guard") exitWith {
    "GUARD DUTY<br/><br/>You will be opposing other squads, trying to prevent them from succeeding in their objectives."
   + " If there are too many guards "
   + " this objective defaults to SUPPLY RUN. You will get rewards for all enemies you kill in 1km"
   + " radius of the depot and from loot boxes you secure.";
  };

  if (_type == "Hold") exitWith {
    "HOLD<br/><br/>You must take and hold one of the depots."
   + " When you have held the depot for 10 minutes, you will get a location"
   + " of a supply drop. Secure that drop.";
  };

  if (_type == "Assasination") exitWith {
    "ASSASINATION<br/><br/>You will get a target and will know aproximate location of that"
   + " target on the map. If you manage to kill the target, you will be rewarded.";
  };

  if (_type == "Military") exitWith {
    "MILITARY BASE RAID<br/><br/>This mission will consume intelligence item. Map will contain"
    + " one military base that all squads will fight over. Military base will contain the best equipment"
    + " available.";
  };

  if (_type == "Manhunt") exitWith {
    "Signal<br/><br/>This mission requires the signal device item. You can use the signal device to triangulate the location of an equipment cache. However, the signal device will also reveal your position on map. Signal device is also required to open the equipment cache.";
  };

  if (_type == "Raid") exitWith {
    private ["_name", "_renownGain", "_renownLoss"];

    _name = objectiveDialog_currentObjective select 0;
    _renownGain = objectiveDialog_currentObjective select 2 select 2;
    _renownLoss = objectiveDialog_currentObjective select 2 select 1;
    
    _name + "<br/><br/>You will need to enter the enemy base and hold their equipment container for 5 minutes."
    + " If you win the raid, you will gain renown equal to 5% of enemy renown (total of "+(str _renownGain)+"). If you lose the raid, you will lose "+(str _renownLoss)+" of your own renown."
    + " You will not be able to accomplish other missions.";

  };

  if (_type == "Delivery") exitWith {
    "DELIVERY<br/><br/>In this objective you are tasked to deliver merchandise to three consecutive locations."
    + " You need 9 pieces of merchandise to select this objective. Please read the task briefing for further details after objectives have been generated.";
  };


  "";
};