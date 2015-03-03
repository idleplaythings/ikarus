// adapted from v1c Civilian Vehicles from [STELS]Zealot

private [
    "_getPlayers",
    "_vehicles",
    "_vehiclesSpawnedHouses",
    "_vehicleClassesToSpawn",
    "_gameSeed",
    "_seed",
    "_random",
    "_selectRandom",
    "_vehicleDirection",
    "_spawnVehicles",
    "_despawnVehicles",
    "_pierClasses",
    "_nearPiers",
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

_gameSeed = floor (random 1000);

_seed = 1;

_random = {
    private ["_a","_c","_m", "_res"];

    _a = 75;
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

    if (count _nearRoads < 1) exitWith { _direction };

    _road = _nearRoads select 0;
    _roadConnectedTo = roadsConnectedTo _road;

    if (count _roadConnectedTo < 1) exitWith { _direction };

    _connectedRoad = _roadConnectedTo select 0;
    [_road, _connectedRoad] call BIS_fnc_DirTo;
};

_spawnVehicles = {
    private [
        "_t",
        "_positions",
        "_houses",
        "_housePositions",
        "_spawnPositions"
    ];

    _positions = _this;

    _t = [diag_ticktime];

    _houses = [_positions, {
        (_this select 0) + ((_this select 1) nearObjects ["House", 1000]);
    }, []] call AEX_reduce;

    _t pushBack (diag_ticktime - (_t select 0));

    _houses = [_houses, {
        !(_this isKindOf "Land_spp_Mirror_F") &&
        !(_this isKindOf "Land_HighVoltageColumn_F") &&
        !(_this isKindOf "Land_HighVoltageTower_large_F") &&
        !(_this isKindOf "Land_HighVoltageColumnWire_F");
    }] call AEX_filter;

    _t pushBack (diag_ticktime - (_t select 0));

    _houses = [_houses, {
        private ['_id'];
        _id = netId _this;
        _seed = parseNumber (_id select [3]);
        (call _random) > 0.96;
    }] call AEX_filter;

    _t pushBack (diag_ticktime - (_t select 0));

    _housePositions = [_houses - _vehiclesSpawnedHouses, {_this modeltoworld [0, 0, 0]}] call AEX_map;

    _t pushBack (diag_ticktime - (_t select 0));
    
    _vehiclesSpawnedHouses = _houses;

    _t pushBack (diag_ticktime - (_t select 0));

    _spawnPositions = [_housePositions, {_this findEmptyPosition [3, 15]}] call AEX_map;

    _t pushBack (diag_ticktime - (_t select 0));
    
    _spawnPositions = [_spawnPositions, {count _this > 0}] call AEX_filter;

    _t pushBack (diag_ticktime - (_t select 0));
    
    {
        private ["_class", "_vehicle", "_marker"];

        _class = _vehicleClassesToSpawn call _selectRandom;

        _vehicle = _class createVehicle _x;
        _vehicle setdir (_x call _vehicleDirection);
        _vehicle setvariable ["zlt_civveh", true];

        _marker = createMarkerLocal ["vehicle" + (str _vehicle), getPos _vehicle];
        _marker setMarkerTypeLocal "hd_start";

        _vehicles pushBack _vehicle;
    } forEach _spawnPositions;

    _t pushBack (diag_ticktime - (_t select 0));

    if ((_t select 8) > 0.25) then {
        //diag_log ("spawn: " + (str _t) + " with " + (str count _vehicles) + " vehicles");
    };
    
};

_despawnVehicles = {
    private ["_t", "_positions", "_vehiclesToDespawn", "_housesBefore"];
    _positions = _this;

    _t = [diag_ticktime];

    _vehiclesToDespawn = [_vehicles, {
        private ["_vehicle", "_nearPositions"];
        _vehicle = _this;

        _nearPositions = [_positions, { _vehicle distance _this < 1000 }] call AEX_filter;

        count _nearPositions < 1;
    }] call AEX_filter;

    _t pushBack (diag_ticktime - (_t select 0));
    
    _vehicles = _vehicles - _vehiclesToDespawn;

    _t pushBack (diag_ticktime - (_t select 0));

    _vehiclesToDespawn = [_vehiclesToDespawn, {
        ((count (crew _x)) == 0) && ((fuel _x) == 1);
    }] call AEX_filter;

    _t pushBack (diag_ticktime - (_t select 0));
    
    { deletevehicle _x; } forEach _vehiclesToDespawn;

    _t pushBack (diag_ticktime - (_t select 0));
    
    if ((_t select 4) > 0.25) then {
        //diag_log str ["before", _housesBefore, "after", (count _vehiclesSpawnedHouses)];
        //diag_log ("despawn: " + (str _t) + " with " + (str count _vehicles) + " vehicles");
    };
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

    _piers = _piers - _boatsSpawnedPiers;
    _boatsSpawnedPiers = _boatsSpawnedPiers + _piers;

    _pierPositions = [_piers, {_this modeltoworld [0, 0, 0]}] call AEX_map;
    _pierPositions = [_pierPositions, {
        _seed = _gameSeed + floor ((_this select 0)*65537 + (_this select 1) mod 65537);
        (call _random) > 0.75;
    }] call AEX_filter;

    _spawnPositions = [_pierPositions, {selectBestPlaces [_this, 30, "waterDepth", 1, 5] select 0 select 0}] call AEX_map;
    _spawnPositions = [_spawnPositions, {count _this > 0}] call AEX_filter;

    {
        private ["_class", "_vehicle"];
        _class = "B_Lifeboat";
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

        _nearPositions = [_positions, { _boat distance _this < 1000 }] call AEX_filter;

        count _nearPositions < 1;
    }] call AEX_filter;

    _boatsToDespawn = [_boatsToDespawn, {
        _x getvariable ["zlt_civveh", false] and {count crew _x == 0 and fuel _x == 1};
    }] call AEX_filter;

    { deletevehicle _x; } forEach _boatsToDespawn;

    _boatsSpawnedPiers = [_boatsSpawnedPiers, {
        private ["_pier", "_distances"];
        _pier = _this;
        _distances = [_positions, { _this distance _pier }] call AEX_map;
        _distances = [_distances, { _this < 1000 }] call AEX_filter;
        count _distances > 0;
    }] call AEX_filter;
};

_loop = {
    private [
        "_players",
        "_positions"
    ];

    _players = call _getPlayers;

    _positions = [_players, { getPos vehicle _this }] call AEX_map;
    _positions = [_positions, { _a distance _b < 100 }] call AEX_distinct;

    _t1 = diag_ticktime;

    _positions call _spawnBoats;
    _positions call _despawnBoats;

    _t2 = diag_ticktime;

    _positions call _spawnVehicles;
    _t3 = diag_ticktime;
    _positions call _despawnVehicles;

    _t4 = diag_ticktime;

    if ((_t4-_t2) > 0.25) then {
        //diag_log str ["boats", _t2-_t1, "vehicles spawn", _t3-_t2, "vehicles despawn", _t4-_t3];
    };
};

while {true} do {
    sleep 3.4;
    [] call _loop;
};
