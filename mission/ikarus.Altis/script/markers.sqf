player createDiaryRecord ["Diary", ["Credits", 
  'Ikarus made possible by these third party mods and scripts:<br/>'
  + '<br/>HLC weapon packs'
  + '<br/>Unlocked Uniforms by Pepe Hal'
  + '<br/>US Uniforms by Niko'
  + '<br/>ACE 3'
  + '<br/>SHK pos by Shuko'
  + '<br/>Node.js Extension for Arma 3 by micovery'
]];

markers_createOutpostBriefing = {
  private ["_i", "_actives", "_inactives", "_marker", "_activeMarkers", "_inactiveMarkers", "_text"];
  _actives = _this select 0;
  _inactives = _this select 1;

  _text = 'At the end of the mission you can disconnect 20 meters from any of your outposts as if you would be in your base.'
    + '<br/><br/>Outposts are built by aquiring a outpost backpack (can be bought from marketplace) and using context menu "deploy outpost" to deploy it.'
    + '<br/><br/>Outposts can not be deployed closer than 50 meters from a depot or a base. Outpost MUST also be CLOSER than 3km from a depot. This is so that people will not wander out of the mission area.'
    + '<br/><br/>Outpost becomes active in next game after it is deployed. You will not be able to return loot to an outpost before it is active.'
    + '<br/><br/>Anyone can dismantle the outpost to reclaim the backpack (even enemies!). Note that dismantling an active outpost and deploying it again will make it inactive (cannot return loot there).'
    + '<br/><br/>Active outposts might be inactive if there is a depot or base closer than 500m from the outpost. These outposts will not be spawned in game.'
    + '<br/><br/>If you have Outpost map base module, you can teleport to any of your outposts at the start of the game as long as you are not carrying too much equipment.';

  if (count _actives > 0) then {
    _i = 0;
    _text = _text + '<br/><br/>Following outposts were ACTIVE at the game start:<br/><br/>';

    {
      _i = _i+1;
      _name = "active_outpost_" + (str _x);
      _marker = createMarkerLocal [_name, _x];
      _marker setMarkerTypeLocal "hd_end";

      _text = _text + '<marker name="' + _name + '">Active outpost ' + (str _i) + '</marker><br/>';
    } forEach _actives;
  } else {
    _text = _text + '<br/><br/>YOU HAVE NO ACTIVE OUTPOSTS IN THIS MISSION.<br/><br/>';
  };

  if (count _inactives > 0) then {
    _i = 0;
    _text = _text + '<br/><br/>Following outposts were INACTIVE at the game start:<br/><br/>';
    {
      _i = _i+1;
      _name = "inactive_outpost_" + (str _x);
      _marker = createMarkerLocal [_name, _x];
      _marker setMarkerTypeLocal "hd_end";
      _marker setMarkerColorLocal "ColorRed";

      _text = _text + '<marker name="' + _name + '">Inactive outpost ' + (str _i) + '</marker><br/>';
    } forEach _inactives;
  };

  player createDiaryRecord ["Diary", ["Outposts", _text]];
};

markers_createRaidDefenderBriefing = {
  private ["_task"];

  _task = player createSimpleTask ["CompanyRaid"];

  _task setSimpleTaskDescription [
   'Your company has been targeted for a raid!'
    + '<br/><br/>You have to keep the enemies away from the box where our equipment is located.'
    + ' If the enemy has not held the box for 5 minutes after 35 minutes of game time has elapsed, you win.'
    + '<br/><br/>Additionally if enemy has no members in 1km area of the base after 25 minutes has elapsed, you win.'
    + '<br/><br/>Winning the raid will reward you with renown. If you lose the raid, you will lose 25% of your company renown.',
   "BASE DEFENCE",
   "" 
  ];

  player setCurrentTask _task;
  ["Base defence"] call client_taskMessage;
  [] spawn markers_informRaidDefence;
};

markers_informRaidDefence = {
  sleep 10;
  ["YOU HAVE BEEN TARGETED FOR A RAID. CHECK BRIEFING FOR DETAILS!"] call client_textMessage;
};

markers_createRaidBriefing = {
  private ["_position", "_radius", "_companyName", "_marker", "_task", "_name"];
  _position = _this select 0;
  _radius = _this select 1;
  _companyName = _this select 2;
 
  _name = ("raid" + str _position);
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorOrange";
  _marker setMarkerShapeLocal "ELLIPSE";
  _marker setMarkerSizeLocal [_radius, _radius];
  _marker setMarkerAlphaLocal 0.6;

  _task = player createSimpleTask ["CompanyRaid"];

  _task setSimpleTaskDescription [
   'Enemy company base has been located somewhere inside this <marker name="'+_name+'">area</marker>'
    + '<br/><br/>You have to find and enter the base. Inside the base, you need to locate the box that has the company starting equipment.'
    + ' You need to hold that box for 5 minutes before 35 minutes of game time has elapsed'
    + '<br/><br/>Additionally if you have no members of your squad in 1km area of the base after 25 minutes has elapsed, you will lose the raid.'
    + '<br/><br/>Winning the raid will reward you with renown. If you lose the raid, you will lose 25% of your company renown.',
   "Raid " + _companyName,
   "" 
  ];

  player setCurrentTask _task;
  ["Raid"] call client_taskMessage;
};

markers_createMilitaryBriefing = {
  private ["_position", "_radius", "_marker", "_task", "_name"];
  _position = _this select 0;
  _radius = _this select 1;
 
  _name = ("military" + str _position);
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorBlue";
  _marker setMarkerShapeLocal "ELLIPSE";
  _marker setMarkerSizeLocal [_radius, _radius];
  _marker setMarkerAlphaLocal 0.6;

  _task = player createSimpleTask ["MilitaryBaseRaid"];

  _task setSimpleTaskDescription [
   'Your task is to find and loot a military base at this <marker name="'+_name+'">location</marker>'
    + '<br/><br/>The base will have red boxes that will contain loot.'
    + ' If the base has a vehicle, you need to find keys to it from the red boxes.',
   "Military base raid",
   ""
  ];

  player setCurrentTask _task;
  ["Military base raid"] call client_taskMessage;
};

markers_createHideoutMarker = {
  private ["_position", "_marker"];
  _position = _this select 0;
 
  _marker = createMarkerLocal ["hideout", _position];
  _marker setMarkerTypeLocal "hd_start";
  
  player createDiaryRecord ["Diary", ["Company base", 
    'Your base is <marker name="hideout">here</marker>'
    + '<br/><br/>Company base is both the starting and ending position for the mission.'
    + ' All loot gathered during the mission will be preserved if you bring them back to the base.'
  ]];
};
markers_createGuardMarker = {
  private ["_position"];
  _position = _this select 0;
 
  _name = "guard" + str _position;
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerTypeLocal "hd_objective";
};

markers_createGuardBriefing = {
  private ["_task", "_positions"];
  _positions = _this select 0;

  {
    [_x] call markers_createGuardMarker;
  } forEach _positions;
  
  _task = player createSimpleTask ["GuardDuty"];

  _task setSimpleTaskDescription [
   'You are tasked to prevent other squads from completing their objectives'
    + '<br/><br/>You will get rewards for each enemy player you kill on 1km radius of any depot.'
    + ' You will get extra rewards for each kill, if you get back to your base alive.'
    + '<br/><br/>Guards can not open supply boxes or hold guard depot. However, you can participate in Signal mission and open the Signal mission cache.<br/><br/>'
    + 'After 30 minutes of gametime has elapsed, you can secure loot boxes by standing next to them. After 35 you can secure them faster. Securing a lootbox will give you money and renown as a reward.'
    + '<br/><br/>During the first 5 minutes you can choose to paradrop to the objective area from your base.',
   "Guard duty",
   ""
  ];

  player setCurrentTask _task;
  ["Guard duty"] call client_taskMessage;
};

markers_createSupplyDropMarker = {
  private ["_position", "_markerName", "_task"];
  _position = _this select 0;
  _markerName = _this select 1;
 
  if (isNil{_markerName}) then {
    _markerName = "drop" + str _position;
    _marker = createMarkerLocal [_name, _position];
    _marker setMarkerTypeLocal "hd_objective";
  };

  _task = player createSimpleTask ["SupplyDrop"];

  _task setSimpleTaskDescription [
   'Supply drop is happening soon at this <marker name="'+_markerName+'">location.</marker>'
    + ' Helicopter will drop a weapon cache you are free to loot.',
   "Supply drop",
   ""
  ];

  player setCurrentTask _task;
  ["Supply drop"] call client_taskMessage;
};

markers_supplyMarkerNames = [];

markers_createSupplyMarker = {
  private ["_position", "_radius", "_name"];
  _position = _this select 0;
  _radius = 500;
 
  _name = "depot" + str _position;
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorBlack";
  _marker setMarkerShapeLocal "ELLIPSE";
  _marker setMarkerSizeLocal [_radius, _radius];
  _marker setMarkerAlphaLocal 0.8;
  
  markers_supplyMarkerNames pushBack _name;
};

markers_holdMarkerNames = [];

markers_createHoldMarker = {
  private ["_position", "_radius", "_name"];
  _position = _this select 0;
  _radius = 100;
 
  _name = "hold" + str _position;
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorRed";
  _marker setMarkerShapeLocal "ELLIPSE";
  _marker setMarkerSizeLocal [_radius, _radius];
  _marker setMarkerAlphaLocal 0.8;
  
  markers_holdMarkerNames pushBack _name;
};


markers_createSupplyBriefring = {
  private ["_positions", "_markersText", "_number", "_task"];
  _positions = _this select 0;

  {
    [_x] call markers_createSupplyMarker;
  } forEach _positions;

  if (count markers_supplyMarkerNames == 0) exitWith {};

  _markersText = "";
  _number = 0;
  {
    _number = _number + 1;
    _markersText = _markersText + '<br/><marker name="' + _x + '">Depot ' + str _number +'</marker>';
  } forEach markers_supplyMarkerNames;

  _task = player createSimpleTask ["SupplyRun"];

  _task setSimpleTaskDescription [
   'There are one or more supply depots on the map. These depots will contain boxes, that can be opened by waiting next to them.'
    + ' You will mainly be rewarded for opening the boxes with loot you will get directly to your company armory. Opened boxes do contain some loot that you need to bring back to the base or outpost.'
    + '<br/><br/>NOTE: Boxes in the supply depot can not be opened before 20 minutes of game has elapsed. When 30 minutes has elapsed, the boxes will open faster.'
    + ' When 50 to 55 minutes has elapsed the depot will be destroyed by an airstrike. First plane will by a fly over, next one a bombing run.'
    + '<br/><br/>Following areas contain a supply depot somewhere inside:<br/>'
    + _markersText,
   "Supply run",
   ""
  ];

  player setCurrentTask _task;
  ["Supply run"] call client_taskMessage;
};

markers_createHoldBriefing = {
  private ["_markersText", "_number", "_task", "_positions"];
  _positions = _this select 0;

  {
    [_x] call markers_createHoldMarker;
  } forEach _positions;
  
  if (count markers_holdMarkerNames == 0) exitWith {};

  _markersText = "";
  _number = 0;
  {
    _number = _number + 1;
    _markersText = _markersText + '<br/><marker name="' + _x + '">Depot ' + str _number +'</marker>';
  } forEach markers_holdMarkerNames;

  _task = player createSimpleTask ["Hold"];

  _task setSimpleTaskDescription [
   'There are one or more depots on the map, marked with a red circle. '
    + 'If you hold a depot for 10 minutes, you will get location for a supply drop.'
    + '<br/><br/>NOTE: You cannot hold depot before 30 minutes has elapsed.'
    + ' When 45 to 50 minutes has elapsed the depot will self destruct.'
    + '<br/><br/>Following areas contain a depot somewhere inside:<br/>'
    + _markersText,
   "Hold",
   ""
  ];

  player setCurrentTask _task;
  ["Hold"] call client_taskMessage;
};

markers_createAssasinBriefing = {
  private ["_task"];
  _task = player createSimpleTask ["Assasination"];

  _task setSimpleTaskDescription [
   'You have taken an assasination contract. You must track and kill your target.'
    + ' You will see the aproximate location of the target as a red circle on your map.'
    + ' When you have killed your target, you will get a new one in couple of minutes if'
    + ' suitable targets are available.'
    + '<br/><br/>You will get more rewards if you complete multiple assasinations. You will also'
    + ' get extra rewards for assasinations if you get back to your base alive.',
   "Assasination",
   ""
  ];

  player setCurrentTask _task;
  ["Assasination"] call client_taskMessage;
};

markers_assasinMarker = nil;

markers_updateAssasinMarker = {
  private ["_position", "_radius", "_marker"];
  _position = _this select 0;
  _radius = _this select 1;
 
  if (isNil {markers_assasinMarker}) then {
    _marker = createMarkerLocal ["assasination", _position];
    _marker setMarkerBrushLocal "SOLID";
    _marker setMarkerColorLocal "ColorRed";
    _marker setMarkerShapeLocal "ELLIPSE";
    _marker setMarkerSizeLocal [_radius, _radius];
    _marker setMarkerAlphaLocal 0.6;
    markers_assasinMarker = _marker;
  };

  markers_assasinMarker setMarkerPosLocal _position;
};

markers_createManhuntBriefing = {
  private ["_task"];
  _task = player createSimpleTask ["Signal"];

  _task setSimpleTaskDescription [
   'This mission has squads with an active Signal device backpack. After 2 minutes of game time has elapsed'
    + ' these signal devices will be marked on the map as red squares. Map also contains a transmitter that can be found using the Signal device for triangulation.'
    + ' If you happen to get your hands to an signal device you can use triangulate context menu action. Triangulation will tell you your distance from the transmitter, with +/- 5% error margin.'
    + '<br/><br/>When you find the transmitter, you must activate it consuming your signal device. If you do not have a signal device of your own, you have to hunt down one of the red squares on the map.'
    + ' Some time after the transmitter is activated an supply cache will be air dropped somewhere on 500m radius of the transmitter.'
    + '<br/><br/>During the mission you will get intel displaying approximate loaction of the transmitter. These will be blue solid circles on the map. Blue borders will be distance from triangulation.'
    + '<br/><br/>If the transmitter has not been activated in 30 minutes an extra signal device will activate on the map.'
    + '<br/><br/>If the transmitter has not been activated before 45 minutes, it will self destruct and and signal mission will fail'
    + '<br/><br/>NOTE: Enemies can access your base container if it has a Signal Device inside!',
   "Signal",
   ""
  ];

  player setCurrentTask _task;
  ["Signal"] call client_taskMessage;
};

markers_lastManStandingTask = nil;

markers_addLastManStanding = {

  if (! isNil{markers_lastManStandingTask}) exitWith {};

  markers_lastManStandingTask = player createSimpleTask ["Last man standing"];
  markers_lastManStandingTask setSimpleTaskDescription [
   'You are last player on the server. This means you can disconnect anywhere just like you would be in your base. All loot on your person will be saved. If you disconnect inside a vehicle, all loot inside the vehicle will also be saved.',
   "Last man standing",
   ""
  ];

  ["Last man standing"] call client_taskMessage;
};

markers_removeLastManStanding = {
  if (isNil{markers_lastManStandingTask}) exitWith {};

  player removeSimpleTask markers_lastManStandingTask;
  markers_lastManStandingTask = nil;
  ["Last man standing", "TaskCanceled"] call client_taskMessage;
};

markers_manhuntMarkers = [];

markers_updateManhuntMarkers = {
  private ["_positions"];
  _positions = _this select 0;

  {
    deleteMarkerLocal _x;
  } forEach markers_manhuntMarkers;
  markers_manhuntMarkers = [];

  {
    private ["_marker"];
    _marker = createMarkerLocal ["manhunt" + str _x, _x];
    _marker setMarkerTypeLocal "mil_box";
    _marker setMarkerColorLocal "ColorRed";
    markers_manhuntMarkers pushBack _marker;
  } forEach _positions;
};

markers_triangulations = [];

markers_removeOldTriangulationMarkers = {
  if (count markers_triangulations < 5) exitWith {};

  deleteMarkerLocal (markers_triangulations select 0);
  markers_triangulations = markers_triangulations - [(markers_triangulations select 0)];
  call markers_removeOldTriangulationMarkers;
};

markers_updateTriangulationMarkers = {
  private ["_distance", "_position", "_marker"];
  _distance = _this select 0;
  _position = _this select 1;

  call markers_removeOldTriangulationMarkers;

  _marker = createMarkerLocal ["triangulation" + (str _position) + (str _distance), _position];
  _marker setMarkerBrushLocal "Border";
  _marker setMarkerColorLocal "ColorBlue";
  _marker setMarkerShapeLocal "ELLIPSE";
  _marker setMarkerSizeLocal [_distance, _distance];
  _marker setMarkerAlphaLocal 0.6;

  markers_triangulations pushBack _marker;
};

markers_manhuntCacheMarker = nil;

markers_updateManhuntTransmitterMarker  = {
  private ["_distance", "_position", "_marker", "_color", "_name"];
  _position = _this select 0;
  _distance = _this select 1;
  _active = _this select 2;
  _color = if (_active) then {"ColorGreen"} else {"ColorBlue"};

  if ! (isNil {markers_manhuntMarker}) then {
    deleteMarkerLocal markers_manhuntMarker;
  };

  _name = ("manhuntCache" + (str _position));
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "Solid";
  _marker setMarkerColorLocal _color;
  _marker setMarkerShapeLocal "ELLIPSE";
  _marker setMarkerSizeLocal [_distance, _distance];
  _marker setMarkerAlphaLocal 0.3;

  if (_active) then {
    [_position, _name] call markers_createSupplyDropMarker;
  };

  markers_manhuntMarker = _marker;
};
