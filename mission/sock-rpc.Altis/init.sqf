enableSaving [false, false];
waitUntil {isDedicated || {not(isNull player)}};


//load the logging library
private["_h"];
_h = [] execVM "lib\log.sqf";
waitUntil {scriptDone _h};

//load the socket rpc library
private["_h"];
_h = [] execVM "lib\sock.sqf";
waitUntil {scriptDone _h};


/*
 * Note that the "spawn" calls around the function definitions.
 * This is so that sock_rpc calls execute inside a scheduled environment.
 *
 * If you are calling sock_rpc on the server side, this is not needed.
 */

getDate = {_this spawn {
    hint "requesting date";
    private["_data"];
    _data = ["getDate"] call sock_rpc;

    if (isNil "_data") exitWith {};
    hint _data;
    // player globalChat _data;
}};

getLongString = {_this spawn {
  private["_data"];
  _data = ["get32kString"] call sock_rpc;
  if (isNil "_data") exitWith {};
  player globalChat _data;
}};