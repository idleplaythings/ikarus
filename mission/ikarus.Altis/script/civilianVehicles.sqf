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

    "_hangarClasses",
    "_nearHangars",
    "_copters",
    "_spawnCopters",
    "_despawnCopters",
    "_helicopterClasses",

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


_copters = [];

_hangarClasses = [
    "Land_Hangar_F",
    "Land_TentHangar_V1_F",
    "Land_HelipadCircle_F",
    "Land_HelipadCivil_F",
    "Land_HelipadEmpty_F",
    "Land_HelipadRescue_F",
    "Land_HelipadSquare_F"
];

_helicopterClasses = [
    "C_Heli_Light_01_civil_F",
    "C_Heli_light_01_blue_F",
    "C_Heli_light_01_red_F",
    "C_Heli_light_01_ion_F",
    "C_Heli_light_01_blueLine_F",
    "C_Heli_light_01_digital_F",
    "C_Heli_light_01_elliptical_F",
    "C_Heli_light_01_furious_F",
    "C_Heli_light_01_graywatcher_F",
    "C_Heli_light_01_jeans_F",
    "C_Heli_light_01_light_F",
    "C_Heli_light_01_shadow_F",
    "C_Heli_light_01_sheriff_F",
    "C_Heli_light_01_speedy_F",
    "C_Heli_light_01_sunset_F",
    "C_Heli_light_01_vrana_F",
    "C_Heli_light_01_wasp_F",
    "C_Heli_light_01_wave_F",
    "C_Heli_light_01_stripped_F",
    "C_Heli_light_01_luxe_F"
];

_nearHangars = {
    private ["_position"];
    _position = _this;
    [_hangarClasses, {
        (_this select 0) + (_position nearObjects [(_this select 1), 1000]);
    }, []] call AEX_reduce;
};

_spawnCopters = {
    private ["_positions", "_hangars", "_hangarPositions", "_spawnPositions", "_spawnedCopterOriginalPositions"];
    _positions = _this;

    _hangars = [_positions, {
        (_this select 0) + ((_this select 1) call _nearHangars);
    }, []] call AEX_reduce;

    _spawnPositions = [_hangars, {_this modeltoworld [0, 0, 0]}] call AEX_map;

    // more spawn positions can be added here
    // but need to be filtered to be within 1000 meters of one of the _positions first

    _spawnPositions = [_spawnPositions, {
        _seed = _gameSeed + floor ((_this select 0)*65537 + (_this select 1) mod 65537);
        (call _random) > 0.95;
    }] call AEX_filter;

    _spawnPositions = [_spawnPositions, {
        ([_this] call hideout_distanceFromClosestHideout > 100 
            and [_this] call depots_getDistanceToClosestDepot > 30);
    }] call AEX_filter;

    _spawnedCopterOriginalPositions = [_copters, {
        _this getVariable "ikarus_original_position";
    }] call AEX_map;

    _spawnPositions = _spawnPositions - _spawnedCopterOriginalPositions;

    {
        private ["_class", "_spawnPosition", "_vehicle"];
        _class = _helicopterClasses call BIS_fnc_selectRandom;

        _spawnPosition = _x findEmptyPosition [5, 10, _class];

        if ((count _spawnPosition) < 1) exitWith {};

        _spawnPosition set [2, (_spawnPosition select 2 + 0.5)];
        _vehicle = [_class, _spawnPosition, random 360] call vehicle_spawnVehicle;
        _vehicle setvariable ["zlt_civveh", true];
        _vehicle setvariable ["ikarus_original_position", _x];
        _copters pushBack _vehicle;
    } forEach _spawnPositions;
};

_despawnCopters = {
    private ["_positions", "_coptersToDespawn"];
    _positions = _this;

    _coptersToDespawn = [_copters, {
        private ["_copter", "_nearPositions"];
        _copter = _this;

        [_positions, { (_copter distance _this) > 1000 }] call AEX_all;
    }] call AEX_filter;

    _coptersToDespawn = [_coptersToDespawn, {
        ((count (crew _x)) == 0) && ((fuel _x) == 1);
    }] call AEX_filter;

    { deletevehicle _x; } forEach _coptersToDespawn;
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

    _positions call _spawnCopters;
    _positions call _despawnCopters;

    _positions call _spawnVehicles;
    _positions call _despawnVehicles;
};

while {true} do {
    sleep 3.4;

    [] call _loop;
};
