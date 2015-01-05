
buildingChecker_matchedBuldings = [];
buildingChecker_currentIndex = 0;

buildingChecker_whiteList = [];
buildingChecker_blackList = [];

waituntil {!(IsNull (findDisplay 312))};
_keyDown = (findDisplay 312) displayAddEventHandler ["KeyDown", "[_this] call buildingChecker_Key"];

buildingChecker_Key = {
  private ["_key"];
  _key = _this select 0 select 1;

  call buildingChecker_hint;
  
  if (_key == 43) exitWith {
    if (count buildingChecker_matchedBuldings == 0) then {
      call buildingChecker_start;
    };
  };
  
  if (_key == 39) exitWith {
    call buildingChecker_back;
  };
  
  if (_key == 52) exitWith {
    call buildingChecker_next;
  };
  
  if (_key == 51) exitWith {
    call buildingChecker_approve;
    call buildingChecker_next;
  };
  
  if (_key == 53) exitWith {
    call buildingChecker_reject;
    call buildingChecker_next;
  };

};

buildingChecker_start = {
  call saveObjects;
  buildingChecker_matchedBuldings = call buildingChecker_findLikeThis;
  call buildingChecker_goToCurrent;
};

buildingChecker_approve = {
  
  if (getPos call buildingChecker_getCurrent in buildingChecker_whiteList) exitWith {};

  [buildingChecker_blackList, getPos call buildingChecker_getCurrent] call buildingChecker_removeFromArray;
  
  buildingChecker_whiteList set [count buildingChecker_whiteList, getPos call buildingChecker_getCurrent];
};

buildingChecker_reject = {

  if (getPos call buildingChecker_getCurrent in buildingChecker_blackList) exitWith {};
  
  [buildingChecker_whiteList, getPos call buildingChecker_getCurrent] call buildingChecker_removeFromArray;
  
  buildingChecker_blackList set [count buildingChecker_blackList, getPos call buildingChecker_getCurrent];
};

buildingChecker_copyToClipboard = {
  private ["_br"];
  _br = toString [13,10];//(carriage return & line feed)
  
  copyToClipboard (
    "[" + _br
      + str (buildingData select 0) + "," + _br 
     + str (buildingData select 1) + "," + _br 
     + str buildingChecker_whiteList +"," +_br 
     + str buildingChecker_blackList + _br
     + "]"
  );
};

buildingChecker_hint = {
  private ["_br"];
  _br = toString [13,10];//(carriage return & line feed)
  
  hint (
    "Building " + str (buildingChecker_currentIndex + 1) + "/" + str count buildingChecker_matchedBuldings 
    + _br + _br + "Rejected: " + str count buildingChecker_blackList
    + _br + "Approved: " + str count buildingChecker_whiteList 
  );
};

buildingChecker_clean = {
  [call buildingChecker_getCurrent] call buildingChecker_deleteObjects;
};

buildingChecker_back = {
  call buildingChecker_clean;
  call buildingChecker_decrementCurrent;
  call buildingChecker_goToCurrent;
};

buildingChecker_next = {
  call buildingChecker_clean;
  call buildingChecker_incrementCurrent;
  call buildingChecker_goToCurrent;
};

buildingChecker_goToCurrent = {
  private ["_building"];
  _building = call buildingChecker_getCurrent;

  [_building, (buildingData select 1)] call houseFurnisher_furnish;
  call buildingChecker_hint;
  call buildingChecker_copyToClipboard;
  curatorCamera setPos [(getPos _building select 0), (getPos _building select 1), 35];
  curatorCamera setVectorDirAndUp [[0,-0.01,-99],[0,1,0]];
};

buildingChecker_decrementCurrent = {
  buildingChecker_currentIndex = buildingChecker_currentIndex - 1;
  
  if (buildingChecker_currentIndex < 0) then {
    buildingChecker_currentIndex = count buildingChecker_matchedBuldings - 1;
  }
};

buildingChecker_incrementCurrent = {
  buildingChecker_currentIndex = buildingChecker_currentIndex + 1;
  
  if (count buildingChecker_matchedBuldings <= buildingChecker_currentIndex) then {
    buildingChecker_currentIndex = 0;
  }
};

buildingChecker_getCurrent = {
  buildingChecker_matchedBuldings select buildingChecker_currentIndex;
};

buildingChecker_findLikeThis = {
  private ["_buildingClasses"];
  _buildingClasses = [typeOf nearestBuilding curatorCamera] call similarBuildings_getSimilar;
  [_buildingClasses] call buildingChecker_findBuildings;
};

buildingChecker_findBuildings = {
   private ["_buildingClass", "_position", "_buildings", "_result"];
   _buildingClass = _this select 0;
   _position = [15000.0, 15000.0];
   _result = [];

  _buildings = nearestObjects [_position, ["house"], 25000];
  
  {
    if (typeOf _x in _buildingClass) then {
      _result set [count _result, _x];
    };
  } forEach _buildings;
  
  _result;
};

buildingChecker_deleteObjects = {
  private ["_building", "_distance"];
  _allMObjects = [];
  _building = _this select 0;
  
  {
    _distance = [_building, _x] call BIS_fnc_distance2D;
    if (side _x == civilian and ! isAgent teamMember _x and _distance < 20) then {
      deleteVehicle _x;
    };
  } forEach allMissionObjects "";

};

buildingChecker_removeFromArray = {
  private ["_array", "_needle"];
  _array = _this select 0;
  _needle = (_this select 1);
  
  for [{_i= 0},{_i < count _array},{_i = _i + 1}] do {
    if (str (_array select _i) == str _needle) exitWith {
      _array deleteAt _i;
    };
  };
};
