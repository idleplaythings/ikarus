player createDiaryRecord ["Diary", ["Credits", 
  'Ikarus made possible by these third party mods and scripts:<br/>'
  + '<br/>Community Upgrade Project - Weapons Pack by CUP Team'
  + '<br/>Unlocked Uniforms by Pepe Hal'
  + '<br/>Authentic Gameplay Modification by BWMod Team'
  + '<br/>Civilian Vehicles by zealot111'
  + '<br/>SHK pos by Shuko'
  + '<br/> Node.js Extension for Arma 3 by micovery'
]];

markers_createHideoutMarker = {
  private ["_building, _marker"];
  _building = _this select 0;
 
  _marker = createMarkerLocal ["hideout", getPos _building];
  _marker setMarkerTypeLocal "hd_start";
  
  player createDiaryRecord ["Diary", ["Hideout", 
    'Your hideout is <marker name="hideout">here</marker>'
    + '<br/><br/>Hideout is both the starting and ending position for the mission.'
    + ' All loot gathered during the mission will be preserved if you bring them back to the hideout.'
  ]];
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

markers_createSupplyBriefring = {
  private ["_markersText", "_number"];
  
  if (count markers_supplyMarkerNames == 0) exitWith {};
  _markersText = "";
  _number = 0;
  {
    _number = _number + 1;
    _markersText = _markersText + '<br/><marker name="' + _x + '">Depot ' + str _number +'</marker>';
  } forEach markers_supplyMarkerNames;
  
  player createDiaryRecord ["Diary", ["Supply", 
    'There are one or more supply depots on the map. These depots will contain boxes, that can be opened by waiting next to them.'
    + ' Opened boxes contain loot backpacks that will be converted to usable loot when brought back to the hideout.'
    + '<br/><br/>NOTE: Boxes in the supply depot can not be opened before 20 minutes of game has elapsed. When 30 minutes has elapsed, the boxes will open faster.'
    + ' When 50 to 55 minutes has elapsed the depot will be destroyed by an airstrike. First plane will by a fly over, next one a bombing run.'
    + '<br/><br/>Following areas contain a supply depot somewhere inside:<br/>'
    + _markersText
  ]];
};

markers_textMessage = {
  [_this select 0] call BIS_fnc_dynamicText;
};