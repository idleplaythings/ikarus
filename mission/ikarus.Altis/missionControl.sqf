
missionControl_READY = false;

missionControl_startWhenReady = {
  [] call missionControl_pollReadyStatusFromServer;
  [] call missionControl_startMissionWhenStatusReady;
};

missionControl_pollReadyStatusFromServer = {
  _this spawn {
    private["_data"];

    while { !missionControl_READY } do {
      _data = ['isReady'] call sock_rpc;
      if (isNil "_data") exitWith {};
      missionControl_READY = _data != 0;
      sleep 1;
    }
  }
};

missionControl_startMissionWhenStatusReady = {
  _this spawn {
    while { !gameStarted } do {
      if (missionControl_READY) then {
        player globalChat "ready!";
        [] call startGame;
      } else {
        player globalChat "not ready";
        sleep 1;
      }
    }
  }
};
