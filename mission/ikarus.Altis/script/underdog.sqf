underdog_checkKillReward = {
  private ["_reward", "_killer", "_victim", "_killerSquad", "_victimSquad", "_killerSquadSize", "_victimSquadSize", "_rewardLevel"];
  _killer = _this select 0;
  _victim = _this select 1;
  _killerSquad = [_killer] call getSquadForUnit;
  _victimSquad = [_victim] call getSquadForUnit;
  
  if (isNil{_killerSquad} || isNil{_victimSquad}) exitWith {};

  _killerSquadSize = count ([_killerSquad] call getSquadPlayerUIDs);
  _victimSquadSize = count ([_victimSquad] call getSquadPlayerUIDs);

  if (_killerSquadSize == 0) exitWith {};

  _rewardLevel = floor (((_victimSquadSize - _killerSquadSize) / _killerSquadSize));


  if (_rewardLevel > 3) then {
    _rewardLevel = 3;
  };

  if (_rewardLevel < 1) exitWith {};

  _reward = ('IKRS_underdog_reward_lvl' + (str _rewardLevel));
  systemChat str _reward;
  [_killerSquad, [_reward]] call addDisconnectedLoot;
  ["You have earned an underdog kill reward.", _unit] call broadCastMessageTo;
};