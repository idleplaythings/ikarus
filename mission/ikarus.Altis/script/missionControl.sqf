
missionControl_gameStarted = false;
missionControl_gameOver = false;
missionControl_timeGameStarted = -1;

missionControl_minSquads = 1;

missionControl_waitingTimeSeconds = 5;
missionControl_timeWaitingStarted = 0;
missionControl_test = ! isDedicated;
missionControl_lastMessageTime = 0;
missionControl_reinforcementsWait = false;

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

      sleep 1;

      _start = ['shouldStartGame', [missionControl_test]] call sock_rpc;
     
      if (isNil {_start}) then {
        _start = false;
      };
     
      if (_start) exitWith {
        call missionControl_startGame;
      };
      
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
  missionControl_reinforcementsWait = true;

  missionControl_timeGameStarted = time;

  _squads = ['squadsRetrieve', [missionControl_test]] call sock_rpc;
  [str (count _squads)] call broadcastMessage;
  [_squads] call setSquadData;
  
  call hideout_createHideoutForSquads;
  call hideout_movePlayersToHideout;
  call equipment_setPlayersGear;
  call assembleSquads;
  call player_setSquadVariable;

  missionControl_timeObjectivesGenerated = time + 60;

  call objectiveController_startObjectiveChoosing;

  missionControl_reinforcementsWait = false;
  waitUntil {time >= missionControl_timeObjectivesGenerated};
  missionControl_reinforcementsWait = true;
  missionControl_objectivesGenerated = true;
  call objectiveController_hideChooseObjectiveMenu;
  call objectiveController_createObjectives;
  missionControl_reinforcementsWait = false;

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

call missionControl_startWhenReady;