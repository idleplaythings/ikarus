
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
  private ["_squads", "_objectiveWait"];
 
  missionControl_gameStarted = true;
  missionControl_reinforcementsWait = true;

  missionControl_timeGameStarted = time;

  _squads = ['squadsRetrieve', [missionControl_test]] call sock_rpc;
  [_squads] call setSquadData;
  
  call hideout_createHideoutForSquads;
  call hideout_movePlayersToHideout;
  call equipment_setPlayersGear;
  call assembleSquads;
  call player_setSquadVariable;

  if ( missionControl_test ) then {
    _objectiveWait = 10;
  } else {
    _objectiveWait = 60;
  };

  missionControl_timeObjectivesGenerated = time + _objectiveWait;

  call objectiveController_startObjectiveChoosing;

  missionControl_reinforcementsWait = false;
  waitUntil {time >= missionControl_timeObjectivesGenerated};
  missionControl_reinforcementsWait = true;
  missionControl_objectivesGenerated = true;
  call objectiveController_hideChooseObjectiveMenu;
  call objectiveController_createObjectives;
  call outpost_createOutposts;
  missionControl_reinforcementsWait = false;

  ["OBJECTIVES GENERATED. GOOD LUCK AND HAVE FUN!"] call broadcastMessage;
  call missionControl_pollGameEnd;
};

missionControl_endGame = {
  missionControl_gameOver = true;
  hint "end game";
  
  {
    private ["_squad", "_loot", "_outposts", "_squadId"];
    _squad = _x;
    _loot = [_squad] call loot_findSquadLoot;
    _loot = _loot + ([_squad] call getDisconnectedLoot);
    _squadId = [_squad] call getSquadId;

    ['squadSubmit', [_squadId, ([_squad] call getChosenObjective), str _loot]] call sock_rpc;
    ['outpostsSubmit', [_squadId, ([_squad] call outpost_getOutpostsChangesForSquad)]] call sock_rpc; 
  } forEach squads;

  ['raidSubmit', [call objective_raid_getResults]] call sock_rpc;
  
  sleep 10;
  
  ['gameEnd'] call sock_rpc;
};

call missionControl_startWhenReady;