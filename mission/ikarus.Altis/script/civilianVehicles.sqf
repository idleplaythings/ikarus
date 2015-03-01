// adapted from v1c Civilian Vehicles from [STELS]Zealot

private [
    "_getPlayers",
    "_vehicles",
    "_locationsWithVehiclesSpawned",
    "_vehicleClassesToSpawn",
    "_gameSeed",
    "_seed",
    "_random",
    "_selectRandom",
    "_vehicleDirection",
    "_spawnVehicles",
    "_loop"
];

if (not isserver) exitwith {};

_getPlayers = _this select 0;

// TODO respawn via vehicles or locations?
_vehicles = [];
_locationsWithVehiclesSpawned = [];

_vehicleClassesToSpawn = [
    "C_Offroad_01_F",
    "C_Quadbike_01_F",
    "C_Hatchback_01_F",
    "C_Hatchback_01_sport_F",
    "C_SUV_01_F",
    "C_Van_01_transport_F",
    "C_Van_01_box_F",
    "C_Van_01_fuel_F"
];

_gameSeed = floor (random 1000);

_seed = 1;
_random = {
    private ["_a","_c","_m"];
    _a = 75;
    _c = 0;
    _m = 65537;
    _seed = ( _seed * _a + _c ) mod (_m);
    (_seed / _m) ;
};


_selectRandom = {
    _this select floor ( ([] call _random) * count (_this));
};

_vehicleDirection = {
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

_spawnVehicles = {
    private [
        "_range",
        "_startPosition",
        "_houses",
        "_maxVehicleCount",
        "_vehicleCount",
        "_attempts"
    ];

    _startPosition = _this select 0;
    _range = _this select 1;

    _houses = _startPosition nearobjects ["House", _range];

    if ( count _houses == 0 ) exitWith {};

    _maxVehicleCount = (round ((sqrt (count _houses)) * 0.5)) max 1;

    _vehicleCount = 0;
    _attempts = 0;

    _seed = _gameSeed + ((_startPosition select 0) + (_startPosition select 1) mod 64537);

    while {_vehicleCount < _maxVehicleCount and _attempts < 10} do {
        private [
            "_house",
            "_class",
            "_housePosition",
            "_spawnPosition",
            "_vehicle"
        ];

        _house = _houses call _selectRandom;
    
        if (isNil {_house}) exitWith {
          _attempts = _attempts + 1;
        };
    
        _class = _vehicleClassesToSpawn call _selectRandom;
        _housePosition = _house modeltoworld [0, 0, 0];
        _spawnPosition = _housePosition findEmptyPosition [3, 15, _class];
        _houses = _houses - [_house];

        if (count _spawnPosition == 0) exitWith {
            _attempts = _attempts + 1;
        };

        _vehicle = _class createVehicle (_spawnPosition);
        _vehicle setdir (_spawnPosition call _vehicleDirection);
        _vehicle setvariable ["zlt_civveh", true];

        _vehicles pushBack _vehicle;

        _attempts = 0;
        _vehicleCount = _vehicleCount + 1;
    };
};

_loop = {
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

    _players = call _getPlayers;

    _playersWalkingOrInLandVehicle = [_players, {
        _this == vehicle _this || (vehicle _this) isKindOf "LandVehicle" }
    ] call AEX_filter;

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

    _spawnLocations = _distinctSpawnCandidateLocations - _locationsWithVehiclesSpawned;

    {
        private ["_range", "_pos"];

        _range = switch (type _x) do {
            case ("NameCityCapital") : { 250; };
            case ("NameCity") : { 150; };
            default { 50; }
        };
        _pos = position _x;
        [ [_pos select 0, _pos select 1, 0], _range] call _spawnVehicles;
    } foreach _spawnLocations;
    
    _locationsWithVehiclesSpawned = _locationsWithVehiclesSpawned + _spawnLocations;

    _despawnLocations = _locationsWithVehiclesSpawned - _distinctDoNotClearLocations;

    {
        private ["_pos", "_despawnCandidates"];

        _pos = [(position _x) select 0, (position _x) select 1, 0];

        _despawnCandidates = [_vehicleClassesToSpawn, {
            (_this select 0) + ( (_pos) nearEntities [(_this select 1), 300] )
        }, []] call AEX_reduce;

        {
            if ( _x getvariable ["zlt_civveh", false] and {count crew _x == 0 and fuel _x == 1}) then {
                deletevehicle _x;
            };
        } foreach _despawnCandidates;
    } foreach _despawnLocations;

    _locationsWithVehiclesSpawned = _locationsWithVehiclesSpawned - _despawnLocations;

};

while {true} do {
    sleep 3.4;
    [] call _loop;
};

