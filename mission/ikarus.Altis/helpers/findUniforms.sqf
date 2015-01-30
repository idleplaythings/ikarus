//To find className and displayName of uniforms
//uniforms: Uniform_Base
//headgead: H_HelmetB
//vests: Vest_Camo_Base, Vest_NoCamo_Base
_data = []; 
_uniforms = "('Vest_NoCamo_Base' in ([_x, true ] call BIS_fnc_returnParents))" configClasses (configFile >> "CfgWeapons"); 

{
 	_entries = configProperties [
		_x, 
		"configName _x == 'displayName'", 
		true
	];

	_data pushBack (configName _x + "; " + getText (_entries select 0));
} forEach _uniforms;

copyToClipboard str _data;