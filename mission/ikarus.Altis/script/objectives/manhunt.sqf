objective_manhunt_construct = {};

objective_manhunt_displayName = {
  "Manhunt"
};

objective_manhunt_joinInProgress = {
  _this call objective_manhunt_setPlayerRating;
};

objective_manhunt_setPlayerRating = {
  _this call objective_supply_setPlayerRating;
};

objective_manhunt_onObjectivesCreated = {
  
};

objective_manhunt_addBriefingAndMarkers = {
  private ["_position", "_type", "_radius", "_offset"];
  _position = _this select 0;
  _type = _this select 1;
  _radius = 1000;
  _offset = _radius / 2;

  _position = [_position, _offset] call SHK_pos;
  {
    [[_position, _radius], "markers_createMilitaryBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach (call getAllPlayers);
};

objective_manhunt_validate = {
  private ["_squad"];
  _squad = _this select 0;

  //if (count squads < 2) exitWith {false;};

  "IKRS_signal_device" in ([_squad] call loot_findSquadLoot);
};

objective_manhunt_overridesAppearance = {
  false;
};

objective_manhunt_insideDepot = {};

objective_manhunt_onKilled = {};

objective_manhunt_onDisconnected = {};

objective_manhunt_canOpenLootBoxes = {true;};

objective_manhunt_defaultIfNeccessary = {};

objective_manhunt_overrideHideoutCache = {false;};

objective_manhunt_markSignalDevices = {
  private ["_containers", "_positions"];
  _positions = [];

  {
    if ("IKRS_signal_device" in ([_x] call objective_manhunt_checkObject)) then {
      _positions pushBack getPos _x;
    };
  } forEach allMissionObjects "";

  {
    [[_positions], "markers_updateManhuntMarkers", _x, false, true] call BIS_fnc_MP;
  } forEach ([['raid']] call objectiveController_getPlayersWithoutObjectives);

};

objective_manhunt_checkObject = {
  private ["_object", "_lootList"];
  _object = _this select 0;
  _lootList = [];

  if (isAgent teamMember _object) exitWith {
    [];
  };

  if ( _object isKindOf "car" or _object isKindOf "Helicopter" ) then {
    {
      _lootList = _lootList + ([_x] call loot_checkUnit);
    } forEach crew _object;
  };
  
  if (_object isKindOf "man") then {
    _lootList = _lootList + ([_object] call loot_checkUnit);
  } else {
    _lootList = _lootList + ([_object] call loot_checkContainer);
  };

  _lootList;
};

objective_manhunt_triangulate = {
  systemChat "triangulate";
};

"triangulation" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;

  [_unit] call objective_manhunt_triangulate;
};

_this spawn {
  
  waitUntil {call missionControl_getElapsedTime > 0};
  //waitUntil {call missionControl_getElapsedTime > (60 * 2)};

  if (count ([['manhunt']] call objectiveController_getSquadsWithObjectives) == 0) exitWith {};

  while { true } do {
    sleep 1;
    call objective_manhunt_markSignalDevices;
  }
};