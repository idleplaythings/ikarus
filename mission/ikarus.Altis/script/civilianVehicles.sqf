// adapted from v1c Civilian Vehicles from [STELS]Zealot

if (not isserver) exitwith {};

// TODO respawn via vehicles or locations?
civilianVehicles = [];
civilianVehiclesSpawnedLocations = [];

civilianVehicleClasses = [
    "C_Offroad_01_F",
    "C_Quadbike_01_F",
    "C_Hatchback_01_F",
    "C_Hatchback_01_sport_F",
    "C_SUV_01_F",
    "C_Van_01_transport_F",
    "C_Van_01_box_F",
    "C_Van_01_fuel_F"
];

civilianVehicleGameSeed = floor (random 1000);
civilianVehicleSeed = 1;

zlt_fnc_random = {
    private ["_a","_c","_m"];
    _a = 75;
    _c = 0;
    _m = 65537;
    civilianVehicleSeed = ( civilianVehicleSeed * _a + _c ) mod (_m);
    (civilianVehicleSeed / _m) ;
};


zlt_fnc_selectrandom = {
    _this select floor ( ([] call zlt_fnc_random) * count (_this));
};

vehicleDirection = {
    private [
        "_direction",
        "_nearRoads",
        "_road",
        "_roadConnectedTo",
        "_connectedRoad"
    ];

    _direction = (random 360);
    _nearRoads = _this nearRoads 10;

    if (count _nearRoads < 1) exitWith { _direction };

    _road = _nearRoads select 0;
    _roadConnectedTo = roadsConnectedTo _road;

    if (count _roadConnectedTo < 1) exitWith { _direction };

    _connectedRoad = _roadConnectedTo select 0;
    [_road, _connectedRoad] call BIS_fnc_DirTo;
};

zlt_fnc_civvehs = {
    private [
        "_debug",
        "_lrange",
        "_t1",
        "_startpos",
        "_houses",
        "_vehmax",
        "_vehs",
        "_attemps",
        "_t2"
    ];

    _debug = [_this, 1, false] call bis_fnc_param;
    _lrange = _this select 2;
    _t1 = diag_ticktime;
    
    _startpos = _this select 0;
    _houses = _startpos nearobjects ["House",_lrange];

    if ( count _houses == 0 ) exitWith {};

    _vehmax = (round ((sqrt (count _houses)) * 0.5)) max 1;
    
    _vehs = 0;
    _attemps = 0;
      
    civilianVehicleSeed = civilianVehicleGameSeed + ((_startpos select 0) + (_startpos select 1) mod 64537);

    while {_vehs < _vehmax and _attemps < 10} do {
        private [
            "_house",
            "_class",
            "_housepos",
            "_newpos"
        ];

        _house = _houses call zlt_fnc_selectrandom;
    
        if (isNil {_house}) exitWith {
          _attemps = _attemps + 1;
        };
    
        _class = (civilianVehicleClasses call zlt_fnc_selectrandom);
        _housepos = _house modeltoworld [0,0,0];
        _newpos = _housepos findEmptyPosition [ 3 , 15, _class ];
        _houses = _houses - [_house];

        if (count _newpos == 0) exitWith {
            _attemps = _attemps + 1;
        };

        _veh = _class createVehicle (_newpos );
        _veh setvariable ["zlt_civveh", true];
        civilianVehicles pushBack _veh;

        _veh setdir (_newpos call vehicleDirection);
        _attemps = 0;
        _vehs = _vehs + 1;
    };

    _t2 = diag_ticktime;
    if (_debug) then {
        diag_log str ["civilianVehicles spawned", _t2-_t1];
    };
};

playerInNonLandVehicle = {
    private ["_player"];
    _player = _this select 0;

    _player != vehicle _player and not ((vehicle _player) isKindOf "LandVehicle");
};

zlt_civ_checkloop = {
    private [
        "_players",
        "_playersWalkingOrInLandVehicle",
        "_positions",
        "_distinctPositions",
        "_spawnCandidateLocations",
        "_distinctSpawnCandidateLocations",
        "_doNotClearLocations",
        "_distinctDoNotClearLocations",
        "_spawnLocations",
        "_despawnLocations"
    ];

    _players = call getAllPlayers;

    _playersWalkingOrInLandVehicle = [_players, { not ([_this] call playerInNonLandVehicle) }] call AEX_filter;

    _positions = [_playersWalkingOrInLandVehicle, { getPos vehicle _this }] call AEX_map;
    _distinctPositions = [_positions, { _a distance _b > 100 }] call AEX_distinct;

    _spawnCandidateLocations = [_distinctPositions, {
        (_this select 0) + (nearestLocations [(_this select 1), ["NameCityCapital","NameCity","NameVillage"], 1000])
    }, []] call AEX_reduce;
    _distinctSpawnCandidateLocations = [_spawnCandidateLocations] call AEX_distinct;

    _doNotClearLocations = [_distinctPositions, {
        (_this select 0) + (nearestLocations [(_this select 1), ["NameCityCapital","NameCity","NameVillage"], 2500])
    }, []] call AEX_reduce;
    _distinctDoNotClearLocations = [_doNotClearLocations] call AEX_distinct;

    _spawnLocations = _distinctSpawnCandidateLocations - civilianVehiclesSpawnedLocations;

    {
        private ["_lrange", "_pos"];

        _lrange = switch (type _x) do {
            case ("NameCityCapital") : { 250; };
            case ("NameCity") : { 150; };
            default { 50; }
        };
        _pos = position _x;
        [ [_pos select 0, _pos select 1, 0], false, _lrange] call zlt_fnc_civvehs;
    } foreach _spawnLocations;
    
    civilianVehiclesSpawnedLocations = civilianVehiclesSpawnedLocations + _spawnLocations;

    _despawnLocations = civilianVehiclesSpawnedLocations - _distinctDoNotClearLocations;

    {
        private ["_pos", "_despawnCandidates"];

        _pos = [(position _x) select 0, (position _x) select 1, 0];

        _despawnCandidates = [civilianVehicleClasses, {
            (_this select 0) + ( (_pos) nearEntities [(_this select 1), 300] )
        }, []] call AEX_reduce;

        {
            if ( _x getvariable ["zlt_civveh", false] and {count crew _x == 0 and fuel _x == 1}) then {
                deletevehicle _x;
            };
        } foreach _despawnCandidates;
    } foreach _despawnLocations;

    civilianVehiclesSpawnedLocations = civilianVehiclesSpawnedLocations - _despawnLocations;

};

while {true} do {
    sleep 3.4;
    [] call zlt_civ_checkloop;
};
