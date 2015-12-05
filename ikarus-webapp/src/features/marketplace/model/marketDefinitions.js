marketDefinitions = [
  {
    _id: 'AR',
    name: 'Assault rifles',
    items: {
      'arifle_MX_F':            { cost: {money: 200}},
      'arifle_MX_Black_F':      { cost: {money: 200}},
      'arifle_MX_GL_F':         { cost: {money: 300}},
      'arifle_MX_GL_Black_F':   { cost: {money: 300}},
      'arifle_MXC_F':           { cost: {money: 180}},
      'arifle_MXC_Black_F':     { cost: {money: 180}},

      'arifle_Katiba_C_F':      { cost: {money: 150}},
      'arifle_Katiba_F':        { cost: {money: 170}},
      'arifle_Katiba_GL_F':     { cost: {money: 250}},

      'CUP_arifle_AK74M':       { cost: {money: 20}},
      'CUP_arifle_AK74_GL':     { cost: {money: 100}},


      'CUP_arifle_M16A2':       { cost: {money: 90}},
      'CUP_arifle_M16A4_Base':  { cost: {money: 120}},

      'CUP_arifle_M4A1_black':  { cost: {money: 150}},

      'CUP_srifle_Mk12SPR':     { cost: {money: 250}},



    }
  },

  {
    _id: 'SMG',
    name: 'SMGs',
    items: {
      'SMG_01_F':           { cost: {money: 100}},
      'SMG_02_F':           { cost: {money: 90}},
    }
  },

  {
    _id: 'BR',
    name: 'Battle rifles',
    items: {
      'srifle_DMR_06_camo_F':   { cost: {money: 400}},
      'srifle_DMR_06_olive_F':  { cost: {money: 400}},
      'srifle_EBR_F':           { cost: {money: 600}},
    }
  },

  {
    _id: 'MG',
    name: 'Machine guns',
    items: {
      'arifle_MX_SW_F':         { cost: {money: 400}},
      'arifle_MX_SW_Black_F':   { cost: {money: 500}},
      'LMG_Mk200_F':            { cost: {money: 800}},
      'LMG_Zafir_F':            { cost: {money: 500}},
      'MMG_01_hex_F':           { cost: {money: 500}},
      'MMG_01_tan_F':           { cost: {money: 500}},
      'MMG_02_camo_F':          { cost: {money: 200}},
      'MMG_02_black_F':         { cost: {money: 200}},
      'MMG_02_sand_F':          { cost: {money: 200}},
      'CUP_arifle_RPK74M':      { cost: {money: 50}},

    }
  },

  {
    _id: 'SR',
    name: 'Sniper rifles',
    items: {
      'CUP_srifle_LeeEnfield':    { cost: {money: 100}},
      //MAR
      'srifle_DMR_02_F':          { cost: {money: 1500}},
      'srifle_DMR_02_camo_F':     { cost: {money: 1500}},
      'srifle_DMR_02_sniper_F':   { cost: {money: 1500}},

      //EMR
      'srifle_DMR_03_F':          { cost: {money: 1000}},
      'srifle_DMR_03_khaki_F':    { cost: {money: 1000}},
      'srifle_DMR_03_tan_F':      { cost: {money: 1000}},
      'srifle_DMR_03_multicam_F': { cost: {money: 1000}},
      'srifle_DMR_03_woodland_F': { cost: {money: 1000}},

      //kir
      'srifle_DMR_04_F':          { cost: {money: 1000}},
      'srifle_DMR_04_Tan_F':      { cost: {money: 1000}},

      //Cyrus
      'srifle_DMR_05_blk_F':      { cost: {money: 1000}},
      'srifle_DMR_05_hex_F':      { cost: {money: 1000}},
      'srifle_DMR_05_tan_F':      { cost: {money: 1000}},

      //Rahim
      'srifle_DMR_01_F':          { cost: {money: 400}},

      'arifle_MXM_F':             { cost: {money: 500}},
      'arifle_MXM_Black_F':       { cost: {money: 500}},
    }
  },

  {
    _id: 'AMMO',
    name: 'Ammo',
    items: {
      '30Rnd_556x45_Stanag':           { cost: {money: 5}},
      '30Rnd_65x39_caseless_green':    { cost: {money: 10}},
      '30Rnd_65x39_caseless_mag':      { cost: {money: 15}},
      '1Rnd_HE_Grenade_shell':         { cost: {money: 15}},
      '20Rnd_762x51_Mag':              { cost: {money: 30}},
      'CUP_20Rnd_762x51_FNFAL_M':      { cost: {money: 30}},
      '100Rnd_65x39_caseless_mag':     { cost: {money: 80}},
      '200Rnd_65x39_cased_Box':        { cost: {money: 50}},
      '150Rnd_762x54_Box':             { cost: {money: 70}},
      '150Rnd_93x64_Mag':              { cost: {money: 80}},
      '130Rnd_338_Mag':                { cost: {money: 80}},
      'CUP_100Rnd_TE4_LRT4_762x54_PK_Tracer_Green_M': { cost: {money: 50}},
      'CUP_10x_303_M':                 { cost: {money: 10}},

      'CUP_5Rnd_86x70_L115A1':         { cost: {money: 25}},
      '10Rnd_338_Mag':                 { cost: {money: 50}},
      '10Rnd_127x54_Mag':              { cost: {money: 50}},
      '10Rnd_93x64_DMR_05_Mag':        { cost: {money: 50}},
      '10Rnd_762x54_Mag':              { cost: {money: 30}},
      '30Rnd_45ACP_Mag_SMG_01':        { cost: {money: 5}},
      '30Rnd_9x21_Mag':                { cost: {money: 5}},
      'CUP_10Rnd_762x54_SVD_M':        { cost: {money: 20}},

      'CUP_30Rnd_545x39_AK_M':         { cost: {money: 5}},
      'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M': { cost: {money: 20}},

      'CUP_30Rnd_762x39_AK47_M':       { cost: {money: 10}},
      '29rnd_300BLK_STANAG':           { cost: {money: 30}},
    }
  },

  {
    _id: 'ARMOR',
    name: 'Armor',
    items: {
      'V_TacVest_camo':           { cost: {money: 50}},
      'V_TacVest_blk':            { cost: {money: 50}},
      'V_TacVest_oli':            { cost: {money: 50}},

      'V_PlateCarrierIA1_dgtl':   { cost: {money: 200}},
      'V_PlateCarrierIA2_dgtl':   { cost: {money: 300}},

      'V_PlateCarrier1_blk':      { cost: {money: 200}},
      'V_PlateCarrier1_rgr':      { cost: {money: 200}},

      'V_PlateCarrier2_rgr':      { cost: {money: 300}},

      'V_PlateCarrierIAGL_dgtl':  { cost: {money: 500}},
      'V_PlateCarrierIAGL_oli':   { cost: {money: 500}},

      'V_PlateCarrierGL_rgr':     { cost: {money: 500}},
      'V_PlateCarrierGL_blk':     { cost: {money: 500}},
      'V_PlateCarrierGL_mtp':     { cost: {money: 500}},

      /*
      'V_PlateCarrierSpec_rgr':   { cost: {money: 400}},
      'V_PlateCarrierSpec_blk':   { cost: {money: 400}},
      'V_PlateCarrierSpec_mtp':   { cost: {money: 400}},
      */
      'H_HelmetB':                { cost: {money: 50}},
      'H_HelmetIA':               { cost: {money: 50}},
    }
  },

  {
    _id: 'MISC',
    name: 'Misc',
    items: {
      'optic_Holosight_smg':      { cost: {money: 20}},
      'optic_Aco_smg':            { cost: {money: 20}},
      'optic_ACO_grn_smg':        { cost: {money: 20}},

      'optic_Holosight':          { cost: {money: 50}},
      'optic_Aco':                { cost: {money: 50}},
      'optic_ACO_grn':            { cost: {money: 50}},
      'CUP_optic_CompM4':         { cost: {money: 30}},
      'CUP_optic_RCO':            { cost: {money: 350}},

      'optic_Arco':               { cost: {money: 500}},
      'optic_Hamr':               { cost: {money: 500}},
      'optic_MRCO':               { cost: {money: 300}},
      'optic_DMS':                { cost: {money: 700}},
      'CUP_optic_Kobra':          { cost: {money: 20}},
      'CUP_optic_PSO_1':          { cost: {money: 200}},
      'CUP_optic_PSO_3':          { cost: {money: 400}},


      'bipod_01_F_blk':   { cost: {money: 50}},

      'bipod_01_F_mtp':   { cost: {money: 50}},
      'bipod_01_F_snd':   { cost: {money: 50}},
      'bipod_02_F_blk':   { cost: {money: 50}},

      'bipod_02_F_hex':   { cost: {money: 50}},
      'bipod_03_F_oli':   { cost: {money: 50}},

      'ItemGPS':          { cost: {money: 30}},
      'Binocular':        { cost: {money: 20}},

      'HandGrenade':      { cost: {money: 10}},
      'SmokeShell':       { cost: {money: 5}},
      'IKRS_outpost_backpack': { cost: {money: 100}},
      'IKRS_merchandise_backpack_money': {
        name: "Merchandise (money)",
        armaClass: 'IKRS_merchandise_backpack',
        cost: {money: 100}
      },
      'IKRS_merchandise_backpack_aks': {
        name: "Merchandise (AKs)",
        armaClass: 'IKRS_merchandise_backpack',
        cost: {
          'CUP_arifle_AK74': 5,
          'CUP_arifle_AKM': 1,
          'CUP_arifle_RPK74': 1,
          'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M': 20,
          'CUP_30Rnd_545x39_AK_M': 60
        }
      }
    }
  },

  {
    _id: 'VEHICLES',
    name: 'Vehicles',
    items: {
      'CUP_B_UAZ_Unarmed_CDF':        { cost: {money: 150}},

      'B_UGV_01_F':         { cost: {money: 250}},

      'B_MRAP_01_F':        { cost: {money: 450}},
      'O_MRAP_02_F':        { cost: {money: 450}},


      'B_Mortar_01_support_F':  { cost: {money: 50}},
      'B_Mortar_01_weapon_F':   { cost: {money: 350}},

      'RDS_M2_MiniTripod_Bag': { cost: {money: 50}},
      'RDS_M2_Gun_Bag':        { cost: {money: 200}},

      'RDS_DShkM_TripodLow_Bag':  { cost: {money: 50}},
      'RDS_DShkM_Gun_Bag':        { cost: {money: 200}},

    }
  },
];