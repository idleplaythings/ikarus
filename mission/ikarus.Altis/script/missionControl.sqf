
missionControl_gameStarted = false;
missionControl_gameOver = false;
missionControl_timeGameStarted = -1;

missionControl_minSquads = 1;

missionControl_waitingTimeSeconds = 5;
missionControl_timeWaitingStarted = 0;
missionControl_test = ! isDedicated;
missionControl_lastMessageTime = 0;

missionControl_timeGameLength = 4500;

missionControl_timeObjectivesGenerated = -1;
missionControl_objectivesGenerated = false;


missionControl_getElapsedTime = {
  if (missionControl_timeGameStarted == -1) exitWith {
    0;
  };
  
  time - missionControl_timeGameStarted;
};


missionControl_startWhenReady = {
  call missionControl_pollReadyToStartFromMonitor;
};

missionControl_pollReadyToStartFromMonitor = {
  _this spawn {
    private ["_start"];
    
    while { ! missionControl_gameStarted } do {
  
      _start = ['shouldStartGame', [missionControl_test]] call sock_rpc;
     
      if (isNil {_start}) then {
        _start = false;
      };
     
      if (_start) exitWith {
        call missionControl_startGame;
      };
      
      sleep 1;
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

missionControl_startGame = {
  private ["_squads"];
 
  missionControl_gameStarted = true;
  missionControl_timeGameStarted = time;


  call missionControl_displayGameStart;
  
  _squads = ['squadsRetrieve', [missionControl_test]] call sock_rpc;
  [_squads] call setSquadData;
  
  call hideout_createHideoutForSquads;
  //

  call hideout_movePlayersToHideout;
  call equipment_setPlayersGear;
  call assembleSquads;
  call player_setSquadVariable;

  missionControl_timeObjectivesGenerated = time + 60;

  call objectiveController_startObjectiveChoosing;

  waitUntil {time >= missionControl_timeObjectivesGenerated};
  missionControl_objectivesGenerated = true;
  call objectiveController_hideChooseObjectiveMenu;
  call objectiveController_createObjectives;

  ["OBJECTIVES GENERATED. GOOD LUCK AND HAVE FUN!"] call broadcastMessage;
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
  ["GAME STARTING IN 15 SECONDS!"] call broadcastMessage;
  sleep 10;
};

call missionControl_startWhenReady;