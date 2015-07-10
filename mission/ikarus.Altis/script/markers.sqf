player createDiaryRecord ["Diary", ["Credits", 
  'Ikarus made possible by these third party mods and scripts:<br/>'
  + '<br/>HLC weapon packs'
  + '<br/>Unlocked Uniforms by Pepe Hal'
  + '<br/>ACE 3'
  + '<br/>SHK pos by Shuko'
  + '<br/> Node.js Extension for Arma 3 by micovery'
]];

markers_createMilitaryBriefing = {
  private ["_position", "_radius", "_marker", "_task", "_name"];
  _position = _this select 0;
  _radius = _this select 1;
 
  _name = ("military" + str _position);
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorBlue";
  _marker setMarkerShape "ELLIPSE";
  _marker setMarkerSize [_radius, _radius];
  _marker setMarkerAlpha 0.6;

  _task = player createSimpleTask ["MilitaryBaseRaid"];

  _task setSimpleTaskDescription [
   'Your task is to find and loot a military base at this <marker name="'+_name+'">location</marker>'
    + '<br/><br/>The base will have red boxes that will contain loot.'
    + ' If the base has a vehicle, you need to find keys to it from the red boxes.',
   "Military base raid",
   ""
  ];

  player setCurrentTask _task;
};

markers_createHideoutMarker = {
  private ["_position", "_marker"];
  _position = _this select 0;
 
  _marker = createMarkerLocal ["hideout", _position];
  _marker setMarkerTypeLocal "hd_start";
  
  player createDiaryRecord ["Diary", ["Hideout", 
    'Your hideout is <marker name="hideout">here</marker>'
    + '<br/><br/>Hideout is both the starting and ending position for the mission.'
    + ' All loot gathered during the mission will be preserved if you bring them back to the hideout.'
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
  private ["_task"];
  _task = player createSimpleTask ["GuardDuty"];

  _task setSimpleTaskDescription [
   'You are tasked to guard any depot marked on the map.'
    + '<br/><br/>You will get rewards for each enemy player you kill on 1km radius of any depot.'
    + ' You will get extra rewards for each kill, if you get back to your hideout alive.'
    + '<br/><br/>NOTE: You will not get any loot from loot backpacks you bring to your hideout!'
    + '<br/><br/>NOTE: You will get penalties from killing other guards!',
   "Guard duty",
   ""
  ];

  player setCurrentTask _task;
};

markers_createSupplyDropMarker = {
  private ["_position", "_task"];
  _position = _this select 0;
 
  _name = "drop" + str _position;
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerTypeLocal "hd_objective";

  _task = player createSimpleTask ["SupplyDrop"];

  _task setSimpleTaskDescription [
   'A supply drop is happening in next 10 minutes at this <marker name="'+_name+'">location.</marker>'
    + '<br/><br/>A helicopter will drop a weapon cache you are free to loot.'
    + ' Remember to bring loot back you your hideout.',
   "Supply drop",
   ""
  ];

  player setCurrentTask _task;
};

markers_supplyMarkerNames = [];

markers_createSupplyMarker = {
  private ["_position", "_radius", "_name"];
  _position = _this select 0;
  _radius = _this select 1;
 
  _name = "depot" + str _position;
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorBlack";
  _marker setMarkerShape "ELLIPSE";
  _marker setMarkerSize [_radius, _radius];
  _marker setMarkerAlpha 0.8;
  
  markers_supplyMarkerNames pushBack _name;
};

markers_holdMarkerNames = [];

markers_createHoldMarker = {
  private ["_position", "_radius", "_name"];
  _position = _this select 0;
  _radius = _this select 1;
 
  _name = "hold" + str _position;
  _marker = createMarkerLocal [_name, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorRed";
  _marker setMarkerShape "ELLIPSE";
  _marker setMarkerSize [_radius, _radius];
  _marker setMarkerAlpha 0.8;
  
  markers_holdMarkerNames pushBack _name;
};


markers_createSupplyBriefring = {
  private ["_markersText", "_number", "_task"];
  
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
    + ' Opened boxes contain loot backpacks that will be converted to usable loot when brought back to the hideout.'
    + '<br/><br/>NOTE: Boxes in the supply depot can not be opened before 20 minutes of game has elapsed. When 30 minutes has elapsed, the boxes will open faster.'
    + ' When 50 to 55 minutes has elapsed the depot will be destroyed by an airstrike. First plane will by a fly over, next one a bombing run.'
    + '<br/><br/>Following areas contain a supply depot somewhere inside:<br/>'
    + _markersText,
   "Supply run",
   ""
  ];

  player setCurrentTask _task;
};

markers_createHoldBriefing = {
  private ["_markersText", "_number", "_task"];
  
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
    + '<br/><br/>NOTE: You cannot hold depot before 25 minutes has elapsed.'
    + ' When 45 to 50 minutes has elapsed the depot will self destruct.'
    + '<br/><br/>Following areas contain a depot somewhere inside:<br/>'
    + _markersText,
   "Hold",
   ""
  ];

  player setCurrentTask _task;
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
    _marker setMarkerShape "ELLIPSE";
    _marker setMarkerSize [_radius, _radius];
    _marker setMarkerAlpha 0.6;
    markers_assasinMarker = _marker;
  };

  markers_assasinMarker setMarkerPosLocal _position;
};

markers_textMessage = {
  [_this select 0] call BIS_fnc_dynamicText;
};