//To find className and displayName of uniforms

_data = []; 
_uniforms = "('Uniform_Base' in ([_x, true ] call BIS_fnc_returnParents))" configClasses (configFile >> "CfgWeapons"); 

{
 	_entries = configProperties [
		_x, 
		"configName _x == 'displayName'", 
		true
	];

	_data pushBack (configName _x + "; " + getText (_entries select 0));
} forEach _uniforms;

copyToClipboard str _data;