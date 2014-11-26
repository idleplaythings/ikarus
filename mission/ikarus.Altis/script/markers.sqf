markers_createHideoutMarker = {
  private ["_building, _marker"];
  _building = _this select 0;
 
  _marker = createMarkerLocal ["hideout", getPos _building];
  _marker setMarkerTypeLocal "hd_start";
};

markers_debug = {
  player globalChat "hi";
  hint _this;
  player globalChat (_this);
};