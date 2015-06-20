objectiveDialog_ID = 10;
objectiveDialog_canDestroy = false;
objectiveDialog_objectives = [];
objectiveDialog_currentObjective = 'Supply';
objectiveDialog_time = -1;
objectiveDialog_showing = false;

objectiveDialog_show = {
  private ["_index"];
  disableSerialization;

  if (objectiveDialog_showing) exitWith {};

  objectiveDialog_showing = true;
  
  _index = 0;
  objectiveDialog_objectives = _this select 0;
  objectiveDialog_currentObjective = _this select 1;
  objectiveDialog_time = _this select 2;
  objectiveDialog_canDestroy = false;
  createDialog "ikrs_ui_co_dialog";

  {
    lbAdd [1500, _x select 0];
    if (_x select 1 == objectiveDialog_currentObjective) then {
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
  objectiveDialog_currentObjective = objectiveDialog_objectives select _index select 1;

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
  if (objectiveDialog_currentObjective == "Supply") exitWith {
    "SUPPLY RUN<br/><br/>Map will contain one or more supply depots."
   + " These supply depots will contain boxes, that will open when"
   + " 20 minutes of game time has elapsed and when a player has been"
   + " near to a box for a while. The box will contain loot backpacks"
   + " that you must bring back to the hideout";
  };

  if (objectiveDialog_currentObjective == "Guard") exitWith {
    "GUARD DUTY<br/><br/>You will be guarding the objective depots."
   + " You will be provided with default equipment. If there are not enough depots to guard"
   + " this objective defaults to SUPPLY RUN. You will get rewards for all enemies you kill in 1km"
   + " radius of the depot.";
  };

  if (objectiveDialog_currentObjective == "Hold") exitWith {
    "HOLD<br/><br/>You must take and hold one of the depots."
   + " When you have held the depot for 10 minutes, you will get a location"
   + " of a supply drop. Secure and loot that drop.";
  };

  if (objectiveDialog_currentObjective == "Assasination") exitWith {
    "ASSASINATION<br/><br/>You will get a target and will know aproximate location of that"
   + " target on the map. If you manage to kill the target, you will be rewarded.";
  };

  "";
};