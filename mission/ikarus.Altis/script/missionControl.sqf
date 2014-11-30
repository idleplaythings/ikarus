
missionControl_gameStarted = false;
missionControl_gameOver = false;
missionControl_timeGameStarted = 0;

missionControl_minSquads = 1;

missionControl_waitingTimeSeconds = 5;

missionControl_timeGameLength = 5; //3600;

missionControl_startWhenReady = {
  player globalChat "start when ready";
  [] call missionControl_pollSquadDataFromServer;
};

missionControl_pollSquadDataFromServer = {
  _this spawn {
    private["_squads"];

    while { ! missionControl_gameStarted } do {
  
      _squads = ['getSquadData'] call sock_rpc;
      
      sleep 1;
      
      if (isNil {_squads}) exitWith {};
  
      [_squads] call setSquadData;
      call missionControl_startGameIfReady;
      
    }
  }
};

missionControl_pollGameEnd = {
  _this spawn {
    private["_squads"];

    while { ! missionControl_gameOver } do {
  
      sleep 1;
      
      if (time - missionControl_timeGameStarted >= missionControl_timeGameLength) exitWith {
        call missionControl_endGame;
      };
      
      if ( count call getAllPlayers == 0) exitWith {
        call missionControl_endGame;
      };  
    }
  }
};

missionControl_startGameIfReady = {
  
  if (call getSquadAmount < missionControl_minSquads) exitWith {hint "no squads";};
  
  if (time < missionControl_waitingTimeSeconds) exitWith {hint "no time";};
  
  // check if we actually have enough players connected for squads
  
  call missionControl_startGame;
};

missionControl_startGame = {
  ['lockServer'] call sock_rpc;
 
  missionControl_gameStarted = true;
  missionControl_timeGameStarted = time;
  
  call hideout_createHideoutForSquads;
  call events_setEventHandlers;
  call objectiveController_createObjectives;
  
  1000 cutText ["GAME STARTED", "PLAIN"];
  
  call hideout_movePlayersToHideout;
  call assembleSquads;
  call missionControl_pollGameEnd;
  
};

missionControl_endGame = {
  missionControl_gameOver = true;
  hint "end game";
  
  {
    private ["_squad", "_loot"];
    _squad = _x;
    _loot = [_squad] call loot_findSquadLoot;
    
    player globalChat str _loot;
    ['submitSquadData', [([_squad] call getSquadId), str _loot]] call sock_rpc;  
  } forEach squads;
  
};

call missionControl_startWhenReady;