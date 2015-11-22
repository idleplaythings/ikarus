objective_raid_raids = []; // raider squad, defender squad, amount held, raid over
objective_raid_increment = 0.33;

objective_raid_construct = {};

objective_raid_added = {
  private ["_squad", "_data"];
  _squad = _this select 0;
  _data = _this select 1;
  _targetSquad = [(_data select 0)] call getSquadById;

  objective_raid_raids pushBack [_squad, _targetSquad, 0, false];
};

objective_raid_removed = {
  private ["_squad"];
  _squad = _this select 0;

  objective_raid_raids = [objective_raid_raids, {
    private ["_squad2"];
    _squad2 = _this select 0;
    ([_squad2] call getSquadId) != ([_squad] call getSquadId);
  }] call AEX_filter;
};

objective_raid_getRaidDataForSquad = {
  private ["_squad", "_candidates"];
  _squad = _this select 0;

  _candidates = [objective_raid_raids, {
    private ["_squad2"];
    _squad2 = _this select 0;
    ([_squad2] call getSquadId) == ([_squad] call getSquadId);
  }] call AEX_filter;

  if (count _candidates == 0) exitWith {nil;};

  _candidates select 0;
};

objective_raid_displayName = {
  "Raid"
};

objective_raid_squadCanRaidOtherSquad = {
  private ["_squad", "_targetSquad"];
  _squad = _this select 0;
  _targetSquad = _this select 1;

  if ! ([_squad] call objective_raid_canRaid) exitWith {false;};
  if ([_squad] call getSquadId == [_targetSquad] call getSquadId) exitWith {false;};
  if ! ([_targetSquad] call objective_raid_canBeRaided) exitWith {false;};
  if (([_targetSquad] call getRenown) < ([_squad] call getRenown)) exitWith {false;};

  true;
};

objective_raid_getValidRaids = {
  private ["_squad", "_raidable", "_renownLoss"];
  _squad = _this select 0;

  if (count squads == 3) exitWith {[]};

  _renownLoss = ([_squad] call getRenown) * 0.05;

  if ! ([_squad] call objective_raid_canRaid) exitWith {[];};

  _raidable = [squads, {
    private ["_squad2"];
    _squad2 = _this;
    [_squad, _squad2] call objective_raid_squadCanRaidOtherSquad;
  }] call AEX_filter;

  _raidable = [_raidable, {
    private ["_squad2"];
    _squad2 = _this;
    [
      "Raid " + ([_squad2] call getCompanyName),
      "raid",
      [
        [_squad2] call getSquadId,
        _renownLoss,
        ([_squad2] call getRenown) * 0.05
      ]
    ]
  }] call AEX_map;

  _raidable;
  //disable raids for now!
  [];
};

objective_raid_canRaid = {
  private ["_squad"];
  _squad = _this select 0;

  count ([_squad] call getPlayersInSquad) > 0 && ([_squad] call getRenown) >= 500;
};

objective_raid_canBeRaided = {
  private ["_squad"];
  _squad = _this select 0;

  count ([_squad] call getPlayersInSquad) > 0 && ([_squad] call getRenown) >= 500;
};

objective_raid_joinInProgress = {
};

objective_raid_onObjectivesCreated = {
  private ["_victims"];
  _victims = [];

  {
    private ["_raider", "_target"];
    _raider = _x select 0;
    _target = _x select 1;
    [_raider, _target] call objective_raid_addRaiderBriefingAndMarkers;
    if ! (_target in _victims) then {
      _victims pushBack _target
    };
  } forEach objective_raid_raids;

  {
    private ["_victim"];
    _victim = _x;
    [_victim] call objective_raid_addRaidDefenderBriefing;
  } forEach _victims;
};

objective_raid_addRaidDefenderBriefing = {
  private ["_squad"];
  _squad = _this select 0;

  {
    [[], "markers_createRaidDefenderBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);
};

objective_raid_addRaiderBriefingAndMarkers = {
  private ["_squad", "_target", "_position", "_radius", "_offset"];
  _squad = _this select 0;
  _target = _this select 1;
  _position = [_target] call hideout_getHideoutForSquad select 1;
  _radius = 500;
  _offset = _radius / 2;

  _position = [_position, _offset] call SHK_pos;
  {
    [[_position, _radius, ([_target] call getCompanyName)], "markers_createRaidBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);
};

objective_raid_validate = {
  private ["_squad", "_data", "_targetSquad"];
  _squad = _this select 0;
  _data = _this select 1;

  _targetSquad = [_data select 0] call getSquadById;

  [_squad, _targetSquad] call objective_raid_squadCanRaidOtherSquad;
};

objective_raid_overridesAppearance = {
  false;
};

objective_raid_insideDepot = {};

objective_raid_onKilled = {};

objective_raid_onDisconnected = {};

objective_raid_canOpenLootBoxes = {false;};

objective_raid_defaultIfNeccessary = {
  if (call depots_getAmountOfMilitaryDepotsToSpawn > 0) then {
    call objective_raid_defaultAll;
  } else {
    call objective_raid_defaultRaidersThatDefend;
  }
};

objective_raid_defaultRaidersThatDefend = {
  {
    private ["_raider"];
    _raider = _x select 0;

    if (count ([_raider] call objective_raid_getRaidersAgainstDefender) > 0) exitWith {
      [_raider, 'supply'] call setChosenObjective;
      objective_raid_raids = objective_raid_raids - [_x];
      call objective_raid_defaultRaidersThatDefend;
    }
  } forEach objective_raid_raids;
};

objective_raid_defaultAll = {
  {
    [_x select 0, 'supply'] call setChosenObjective;
  } forEach objective_raid_raids;

  objective_raid_raids = [];
};

objective_raid_getRaidersAgainstDefender = {
  private ["_defender", "_raiders"];
  _defender = _this select 0;
  _raiders = [];

  {
    if (([_defender] call getSquadId) == ([_x select 1] call getSquadId)) then {
      _raiders pushBack (_x select 0);
    }
  } forEach objective_raid_raids;

  _raiders;
};


objective_raid_overrideHideoutCache = {false;};

objective_raid_checkDefenderVictory = {
  private ["_raider", "_defender"];
  _raider = _this select 0;
  _defender = _this select 1;
  _over = _this select 3;
  _time = call missionControl_getElapsedTime;

  if (_over) exitWith {};

  if (_time > 1500 && ([_raider, _defender] call objective_raid_getClosestRaiderDistance > 1000)) exitWith {
    _this set [3, true];
    _this call objective_raid_raidOver;
  };

  if (_time > 2700) exitWith {
    _this set [3, true];
    _this call objective_raid_raidOver;
  };
};

objective_raid_informHeld = {
  private ["_raider", "_defender", "_amountHeld", "_message"];
  _raider = _this select 0;
  _defender = _this select 1;
  _amountHeld = _this select 2;
  _message = "Enemy base is " + (str floor _amountHeld) + "% raided";

  {
    [[_message, 'raid'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
  } forEach ([_raider] call getPlayersInSquad);
};


objective_raid_raidOver = {
  private ["_raider", "_defender", "_amountHeld", "_message"];
  _raider = _this select 0;
  _defender = _this select 1;
  _amountHeld = _this select 2;
  _message = "";

  if (_amountHeld == 100) then {
    _message = "Raid is over. The attacker won!";
    [_defender] call hideout_getHideoutCacheForSquad setVariable ['squadId', nil, true];
  } else {
    _message = "Raid is over. The defender won!";
  };

  {
    [_message, _x] call broadcastMessageTo;
  } forEach (([_raider] call getPlayersInSquad) + ([_defender] call getPlayersInSquad));

};

objective_raid_getResults = {
  private ["_results"];
  _results = [];

  { // raider squad, defender squad, amount held, raid over
    if (_x select 3) then {
      _results pushBack [
        [_x select 0] call getSquadId,
        [_x select 1] call getSquadId,
        _x select 2
      ];
    };
  } forEach objective_raid_raids;

  _results;
};

objective_raid_checkHeld = {
  private ["_raider", "_defender", "_amountHeld"];
  _raider = _this select 0;
  _defender = _this select 1;
  _amountHeld = _this select 2;
  _over = _this select 3;

  if (_over) exitWith {};

  if ([_raider, _defender] call objective_raid_getClosestRaiderDistance < 2) then {
    _amountHeld = _amountHeld + objective_raid_increment;

    if (_amountHeld > 100) then {
      _amountHeld = 100;
    };

    _this set [2, _amountHeld];
    _this call objective_raid_informHeld;
  };

  if (_amountHeld == 100) then {
    _over = true;
    _this set [3, _over];
    _this call objective_raid_raidOver;
  };
};

objective_raid_getClosestRaiderDistance = {
  private ["_raider", "_defender", "_hideoutCache"];
  _raider = _this select 0;
  _defender = _this select 1;
  _closest = 999999;
  _hideoutCache = [_defender] call hideout_getHideoutCacheForSquad;

  {
    _isUnconscious = _x getvariable ["ACE_isUnconscious", false];

    if (! _isUnconscious && _hideoutCache distance _x < _closest) then {
      _closest = _hideoutCache distance _x;
    }
  } forEach ([_raider] call getPlayersInSquad);

  _closest;
};

objective_raid_holdBase = {
  {
    _x call objective_raid_checkDefenderVictory;
    _x call objective_raid_checkHeld;
  } forEach objective_raid_raids;
};

_this spawn {
  while { true } do {

    sleep 1;
    call objective_raid_holdBase;
  }
};