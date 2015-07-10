// adapted from v1c Civilian Vehicles from [STELS]Zealot

private [
    "_getPlayers",
    "_vehicles",
    "_vehiclesSpawnedHouses",
    "_vehicleClassesToSpawn",
    "_houseBlacklist",
    "_gameSeed",
    "_seed",
    "_random",
    "_selectRandom",
    "_vehicleDirection",
    "_spawnVehicles",
    "_despawnVehicles",
    "_pierClasses",
    "_nearPiers",
    "_boats",
    "_boatsSpawnedPiers",
    "_spawnBoats",
    "_despawnBoats",
    "_loop"
];

if (not isserver) exitwith {};

_getPlayers = _this select 0;

_vehicles = [];
_vehiclesSpawnedHouses = [];

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

_houseBlacklist = [
    "Land_spp_Mirror_F",
    "Land_HighVoltageColumn_F",
    "Land_HighVoltageTower_large_F",
    "Land_HighVoltageColumnWire_F",
    "Land_runway_edgelight",
    "Land_runway_edgelight_blue_F",
    "Land_NavigLight",
    "Land_NavigLight_3_F",
    "Land_PowerWireBig_direct_F"
];

_gameSeed = floor (random 1000);
_seed = 1;

_random = {
    private ["_a", "_c", "_m"];

    _a = 255;
    _c = 0;
    _m = 65537;

    _seed = _seed % _m;

    _seed = ( _seed * _a + _c ) mod (_m);

    (_seed / _m);
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

    if ((count _nearRoads) < 1) exitWith { _direction };

    _road = _nearRoads select 0;
    _roadConnectedTo = roadsConnectedTo _road;

    if ((count _roadConnectedTo) < 1) exitWith { _direction };

    _connectedRoad = _roadConnectedTo select 0;
    [_road, _connectedRoad] call BIS_fnc_DirTo;
};

_spawnVehicles = {
    private [
        "_positions",
        "_houses",
        "_housePositions",
        "_spawnPositions"
    ];

    _positions = _this;

    _houses = [_positions, {
        (_this select 0) + ((_this select 1) nearObjects ["House", 1000]);
    }, []] call AEX_reduce;

    _houses = [_houses, {
        private ["_house"];
        _house = _this;
        [_houseBlacklist, {
            !(_house isKindOf _this);
        }] call AEX_all;
    }] call AEX_filter;

    _houses = [_houses, {
        _seed = _gameSeed + parseNumber ((netId _this) select [3]);
        (call _random) > 0.96;
    }] call AEX_filter;

    _houses = [_houses, {
        private ["_house", "_position"];
        _house = _this;
        _position = getPos _house;

        ([_position] call hideout_distanceFromClosestHideout > 100 
            and [_position] call depots_getDistanceToClosestDepot > 30);

    }] call AEX_filter;

    _housePositions = [_houses - _vehiclesSpawnedHouses, {_this modeltoworld [0, 0, 0]}] call AEX_map;

    _vehiclesSpawnedHouses = _houses;

    _spawnPositions = [_housePositions, {_this findEmptyPosition [3, 15]}] call AEX_map;

    _spawnPositions = [_spawnPositions, {(count _this) > 0}] call AEX_filter;

    {
        private ["_class", "_vehicle"];

        _seed = _gameSeed + floor ((_x select 0)*65537 + (_x select 1) mod 65537);
        _class = _vehicleClassesToSpawn call _selectRandom;

        _vehicle = _class createVehicle _x;
        _vehicle setdir (_x call _vehicleDirection);
        _vehicle setvariable ["zlt_civveh", true];

        _vehicles pushBack _vehicle;
    } forEach _spawnPositions;
};

_despawnVehicles = {
    private ["_positions", "_vehiclesToDespawn", "_housesBefore"];
    _positions = _this;

    _vehiclesToDespawn = [_vehicles, {
        private ["_vehicle", "_nearPositions"];
        _vehicle = _this;

        [_positions, { (_vehicle distance _this) > 1000 }] call AEX_all;
    }] call AEX_filter;

    _vehicles = _vehicles - _vehiclesToDespawn;

    _vehiclesToDespawn = [_vehiclesToDespawn, {
        ((count (crew _x)) == 0) && ((fuel _x) == 1);
    }] call AEX_filter;

    { deletevehicle _x; } forEach _vehiclesToDespawn;
};

_boats = [];
_boatsSpawnedPiers = [];

_pierClasses = [
    "Land_Pier_F",
    "Land_nav_pier_m_F",
    "Land_Pier_small_F",
    "Land_Pier_wall_F",
    "Land_RowBoat_V1_F",
    "Land_RowBoat_V2_F",
    "Land_RowBoat_V3_F",
    "Land_UWreck_FishingBoat_F",
    "Land_BeachBooth_01_F"
];

_nearPiers = {
    private ["_position"];
    _position = _this;
    [_pierClasses, {
        (_this select 0) + (_position nearObjects [(_this select 1), 1000]);
    }, []] call AEX_reduce;
};

_spawnBoats = {
    private ["_positions", "_piers", "_pierPositions", "_spawnPositions"];
    _positions = _this;

    _piers = [_positions, {
        (_this select 0) + ((_this select 1) call _nearPiers);
    }, []] call AEX_reduce;

    _pierPositions = [_piers - _boatsSpawnedPiers, {_this modeltoworld [0, 0, 0]}] call AEX_map;

    _boatsSpawnedPiers = _piers;

    _pierPositions = [_pierPositions, {
        _seed = _gameSeed + floor ((_this select 0)*65537 + (_this select 1) mod 65537);
        (call _random) > 0.75;
    }] call AEX_filter;

    _spawnPositions = [_pierPositions, {selectBestPlaces [_this, 30, "waterDepth", 1, 5] select 0 select 0}] call AEX_map;
    _spawnPositions = [_spawnPositions, {(count _this) > 0}] call AEX_filter;

    {
        private ["_class", "_vehicle"];
        _class = "C_Boat_Civil_01_F";
        _vehicle = _class createVehicle _x;
        _vehicle setvariable ["zlt_civveh", true];
        _boats pushBack _vehicle;
    } forEach _spawnPositions;
};

_despawnBoats = {
    private ["_positions", "_boatsToDespawn"];
    _positions = _this;

    _boatsToDespawn = [_boats, {
        private ["_boat", "_nearPositions"];
        _boat = _this;

        [_positions, { (_boat distance _this) > 1000 }] call AEX_all;
    }] call AEX_filter;

    _boatsToDespawn = [_boatsToDespawn, {
        ((count (crew _x)) == 0) && ((fuel _x) == 1);
    }] call AEX_filter;

    { deletevehicle _x; } forEach _boatsToDespawn;
};

_loop = {
    private [
        "_players",
        "_positions"
    ];

    _players = call _getPlayers;

    _positions = [_players, { getPos (vehicle _this) }] call AEX_map;
    _positions = [_positions, { (_a distance _b) < 100 }] call AEX_distinct;

    _positions call _spawnBoats;
    _positions call _despawnBoats;

    _positions call _spawnVehicles;
    _positions call _despawnVehicles;
};

while {true} do {
    sleep 3.4;

    [] call _loop;
};
