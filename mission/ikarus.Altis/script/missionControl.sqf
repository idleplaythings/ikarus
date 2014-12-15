
missionControl_gameStarted = false;
missionControl_gameOver = false;
missionControl_timeGameStarted = 0;

missionControl_minSquads = 1;

missionControl_waitingTimeSeconds = 180;
missionControl_test = false;

missionControl_timeGameLength = 3600;

missionControl_getElapsedTime = {
  if (missionControl_timeGameStarted == 0) exitWith {
    0;
  };
  
  time - missionControl_timeGameStarted;
};


missionControl_startWhenReady = {
  ['gameWaiting'] call sock_rpc;
  [] call missionControl_pollSquadDataFromServer;
};

missionControl_pollSquadDataFromServer = {
  _this spawn {
    private["_squads"];

    while { ! missionControl_gameStarted } do {
  
      _squads = ['squadsRetrieve', [missionControl_test]] call sock_rpc;
      
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
   
      if ((count call getAllAlivePlayers) == 0) exitWith {
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
  private ["_squads"];
  ['gameStart'] call sock_rpc;
  
  call missionControl_displayGameStart;
  
  _squads = ['squadsRetrieve', [missionControl_test]] call sock_rpc;
  [_squads] call setSquadData;
  
  missionControl_gameStarted = true;
  missionControl_timeGameStarted = time;
  
  call hideout_createHideoutForSquads;
  call objectiveController_createObjectives;
  
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
    _loot = _loot + ([_squad] call getDisconnectedLoot);

    ['squadSubmit', [([_squad] call getSquadId), str _loot]] call sock_rpc;  
  } forEach squads;
  
  sleep 10;
  
  ['gameEnd'] call sock_rpc;
};

missionControl_displayGameStart = {
  private ["_players"];
  _players = call getAllPlayers;
  
  {
    [["GAME STARTING IN 30 SECONDS"], "markers_textMessage", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
   
  sleep 10;
  
  {
    [["GAME STARTING IN 20 SECONDS"], "markers_textMessage", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
  
  sleep 10;
  
  ['lockSquads'] call sock_rpc;
  {
    [["GAME STARTING IN 10 SECONDS ! INVENTORIES LOCKED!"], "markers_textMessage", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
  
  sleep 10;
};

call missionControl_startWhenReady;