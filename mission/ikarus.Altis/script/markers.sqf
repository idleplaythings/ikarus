markers_createHideoutMarker = {
  private ["_building, _marker"];
  _building = _this select 0;
 
  _marker = createMarkerLocal ["hideout", getPos _building];
  _marker setMarkerTypeLocal "hd_start";
};

markers_createSupplyMarker = {
  private ["_position", "_radius"];
  _position = _this select 0;
  _radius = _this select 1;
 
  _marker = createMarkerLocal ["depot" + str _position, _position];
  _marker setMarkerBrushLocal "SOLID";
  _marker setMarkerColorLocal "ColorBlack";
  _marker setMarkerShape "ELLIPSE";
  _marker setMarkerSize [_radius, _radius];
  _marker setMarkerAlpha 0.8;
};

markers_textMessage = {
  [_this select 0] call BIS_fnc_dynamicText;
};