objective_military_vehicles = [
  'BAF_Jackal2_L2A1_D',
  'BAF_Jackal2_L2A1_W',
  'I_MRAP_03_F',
  'B_MRAP_01_F',
  'O_MRAP_02_F',
  'UAZ_AGS30'
];

objective_military_helicopters = [
  'B_Heli_Light_01_F'
];

objective_military_construct = {};

objective_military_displayName = {
  "Military base raid"
};

objective_military_joinInProgress = {
  _this call objective_military_setPlayerRating;
};

objective_military_setPlayerRating = {
  _this call objective_supply_setPlayerRating;
};

objective_military_onObjectivesCreated = {
  {
    [_x] call objective_military_populateDepot;
  } forEach depots_military_depots;
};

objective_military_populateDepot = {
  private ["_depotData", "_intelligence"];
  _depotData = _this select 0;
  _intelligence = call objective_military_consumeIntelligence;

  switch (_intelligence) do {
    case "IKRS_intelligence_weapon": {
      [_depotData] call objective_military_populateWeaponDepot;
    };
    case "IKRS_intelligence_vehicle": {
      [_depotData, (objective_military_vehicles call BIS_fnc_selectRandom)] call objective_military_populateVehicleDepot;
    };
    case "IKRS_intelligence_helo": {
      [_depotData, (objective_military_helicopters call BIS_fnc_selectRandom)] call objective_military_populateVehicleDepot;
    };
    default {[_depotData] call objective_military_populateWeaponDepot};
  };
};

objective_military_populateWeaponDepot = {
  private ["_depotData"];
  _depotData = _this select 0;

  {
    if (typeOf _x == "Land_CargoBox_V1_F") then {
      [getPosAsl _x, direction _x] call lootbox_createMilitaryWeaponBox;
    };
  } forEach (_depotData select 1);

  [(_depotData select 1), 'weapon'] call objective_military_addBriefingAndMarkers;
};

objective_military_populateVehicleDepot = {
  private ["_depotData", "_boxes", "_vehicleClass"];
  _depotData = _this select 0;
  _vehicleClass = _this select 1;
  _boxes = [];

  {
    if (typeOf _x == "Land_CargoBox_V1_F") then {
      _boxes pushBack ([getPosAsl _x, direction _x] call lootbox_createMilitaryVehicleBox);
    };
  } forEach (_depotData select 1);

  {
    if (typeOf _x == "C_Offroad_01_F") then {
      private ["_vehicle"];
      _vehicle = [
        _vehicleClass,
        getpos _x,
        direction _x
      ] call vehicle_spawnVehicle;

      [_vehicle] call vehicle_needsKey;
    };
  } forEach (_depotData select 1);

  [(_boxes call BIS_fnc_selectRandom), ['IKRS_vehicle_key']] call lootBox_addExtraLoot;

  [(_depotData select 0), 'vehicle'] call objective_military_addBriefingAndMarkers;
};

objective_military_addBriefingAndMarkers = {
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

objective_military_consumeIntelligence = {
  private ["_result"];
  _result = "";
  {
    if ([_x, "IKRS_intelligence_weapon"] call hasDisconnectedLoot) exitWith {
      [_x, ["IKRS_intelligence_weapon"]] call removeDisconnectedLoot;
      _result = "IKRS_intelligence_weapon";
    };

    if ([_x, "IKRS_intelligence_vehicle"] call hasDisconnectedLoot) exitWith {
      [_x, ["IKRS_intelligence_vehicle"]] call removeDisconnectedLoot;
      _result = "IKRS_intelligence_vehicle";
    };

    if ([_x, "IKRS_intelligence_helo"] call hasDisconnectedLoot) exitWith {
      [_x, ["IKRS_intelligence_helo"]] call removeDisconnectedLoot;
      _result = "IKRS_intelligence_helo";
    };
  } forEach squads;

  _result;
};

objective_military_validate = {
  private ["_squad"];
  _squad = _this select 0;

  if (count squads < 2) exitWith {false;};

  ([_squad, "IKRS_intelligence_weapon"] call hasDisconnectedLoot)
  or ([_squad, "IKRS_intelligence_vehicle"] call hasDisconnectedLoot)
  or ([_squad, "IKRS_intelligence_helo"] call hasDisconnectedLoot);
};

objective_military_overridesAppearance = {
  false;
};

objective_military_insideDepot = {};

objective_military_onKilled = {};

objective_military_onDisconnected = {};

objective_military_canOpenLootBoxes = {true;};

objective_military_defaultIfNeccessary = {};

objective_military_overrideHideoutCache = {false;};