marketDefinitions = [
  {
    _id: 'AR',
    name: 'Assault rifles',
    items: {
      'arifle_MX_F':            {money: 200},
      'arifle_MX_Black_F':      {money: 200},
      'arifle_MX_GL_F':         {money: 300},
      'arifle_MX_GL_Black_F':   {money: 300},
      'arifle_MXC_F':           {money: 180},
      'arifle_MXC_Black_F':     {money: 180},

      'arifle_Katiba_C_F':      {money: 150},
      'arifle_Katiba_F':        {money: 170},
      'arifle_Katiba_GL_F':     {money: 250},

      'hlc_rifle_ak74':         {money: 20},
      'hlc_rifle_aks74':        {money: 20},
      'hlc_rifle_ak12':         {money: 100},
      'hlc_rifle_ak12GL':       {money: 300},
      'hlc_rifle_aks74u':       {money: 10},
      'hlc_rifle_aks74_GL':     {money: 100},
      'hlc_rifle_aek971':       {money: 30},

      'hlc_rifle_ak47':         {money: 50},
      'hlc_rifle_akm':          {money: 30},

      'CUP_arifle_M16A2':       {money: 90},
      'CUP_arifle_M16A4_Base':  {money: 120},
      'hlc_rifle_RU556':        {money: 160},
      'hlc_rifle_RU5562':       {money: 160},
      'hlc_rifle_CQBR':         {money: 120},
      'hlc_rifle_M4':           {money: 150},
      //'hlc_rifle_m4m203':       {money: 420}, Sounds not working
      'hlc_rifle_bcmjack':      {money: 160},
      'hlc_rifle_Colt727':      {money: 120},
      'hlc_rifle_Colt727_GL':   {money: 180},
      'hlc_rifle_samr2':        {money: 250},

      'hlc_rifle_auga1_b':      {money: 150},
      'hlc_rifle_auga2_b':      {money: 165},

      'hlc_rifle_Bushmaster300':{money: 200},
      'hlc_rifle_vendimus':     {money: 200},
      'hlc_rifle_honeybadger':  {money: 200},

    }
  },

  {
    _id: 'SMG',
    name: 'SMGs',
    items: {
      'SMG_01_F':           {money: 100},
      'SMG_02_F':           {money: 90},
    }
  },

  {
    _id: 'BR',
    name: 'Battle rifles',
    items: {
      'srifle_DMR_06_camo_F':   {money: 400},
      'srifle_DMR_06_olive_F':  {money: 400},
      'srifle_EBR_F':           {money: 600},
      'hlc_rifle_M14':          {money: 350},
    }
  },

  {
    _id: 'MG',
    name: 'Machine guns',
    items: {
      'arifle_MX_SW_F':         {money: 400},
      'arifle_MX_SW_Black_F':   {money: 500},
      'LMG_Mk200_F':            {money: 800},
      'LMG_Zafir_F':            {money: 500},
      'MMG_01_hex_F':           {money: 500},
      'MMG_01_tan_F':           {money: 500},
      'MMG_02_camo_F':          {money: 200},
      'MMG_02_black_F':         {money: 200},
      'MMG_02_sand_F':          {money: 200},
      'hlc_rifle_rpk':          {money: 50},
      'hlc_rifle_rpk74n':       {money: 50},
      'hlc_rifle_RPK12':        {money: 100},

    }
  },

  {
    _id: 'SR',
    name: 'Sniper rifles',
    items: {
      'CUP_srifle_LeeEnfield':    {money: 100},
      //MAR
      'srifle_DMR_02_F':          {money: 1500},
      'srifle_DMR_02_camo_F':     {money: 1500},
      'srifle_DMR_02_sniper_F':   {money: 1500},

      //EMR
      'srifle_DMR_03_F':          {money: 1000},
      'srifle_DMR_03_khaki_F':    {money: 1000},
      'srifle_DMR_03_tan_F':      {money: 1000},
      'srifle_DMR_03_multicam_F': {money: 1000},
      'srifle_DMR_03_woodland_F': {money: 1000},

      //kir
      'srifle_DMR_04_F':          {money: 1000},
      'srifle_DMR_04_Tan_F':      {money: 1000},

      //Cyrus
      'srifle_DMR_05_blk_F':      {money: 1000},
      'srifle_DMR_05_hex_F':      {money: 1000},
      'srifle_DMR_05_tan_F':      {money: 1000},

      //Rahim
      'srifle_DMR_01_F':          {money: 400},

      'arifle_MXM_F':             {money: 500},
      'arifle_MXM_Black_F':       {money: 500},
    }
  },

  {
    _id: 'AMMO',
    name: 'Ammo',
    items: {
      'hlc_30Rnd_556x45_B_AUG':        {money: 10},
      '30Rnd_556x45_Stanag':           {money: 5},
      '30Rnd_65x39_caseless_green':    {money: 10},
      '30Rnd_65x39_caseless_mag':      {money: 15},
      '1Rnd_HE_Grenade_shell':         {money: 15},
      '20Rnd_762x51_Mag':              {money: 30},
      '100Rnd_65x39_caseless_mag':     {money: 80},
      '200Rnd_65x39_cased_Box':        {money: 50},
      '150Rnd_762x54_Box':             {money: 70},
      '150Rnd_93x64_Mag':              {money: 80},
      '130Rnd_338_Mag':                {money: 80},
      'CUP_100Rnd_TE4_LRT4_762x54_PK_Tracer_Green_M': {money: 50},
      'CUP_10x_303_M':                 {money: 10},

      '10Rnd_338_Mag':                 {money: 50},
      '10Rnd_127x54_Mag':              {money: 50},
      '10Rnd_93x64_DMR_05_Mag':        {money: 50},
      '10Rnd_762x54_Mag':              {money: 30},
      '30Rnd_45ACP_Mag_SMG_01':        {money: 5},
      '30Rnd_9x21_Mag':                {money: 5},

      'hlc_30Rnd_545x39_B_AK':         {money: 5},
      'hlc_45Rnd_545x39_t_rpk':        {money: 20},

      'hlc_30Rnd_762x39_b_ak':         {money: 10},
      'hlc_45Rnd_762x39_m_rpk':        {money: 30},
      '29rnd_300BLK_STANAG':           {money: 30},
    }
  },

  {
    _id: 'ARMOR',
    name: 'Armor',
    items: {
      'V_TacVest_camo':           {money: 50},
      'V_TacVest_blk':            {money: 50},
      'V_TacVest_oli':            {money: 50},

      'V_PlateCarrierIA1_dgtl':   {money: 200},
      'V_PlateCarrierIA2_dgtl':   {money: 300},

      'V_PlateCarrier1_blk':      {money: 200},
      'V_PlateCarrier1_rgr':      {money: 200},

      'V_PlateCarrier2_rgr':      {money: 300},

      'V_PlateCarrierIAGL_dgtl':  {money: 500},
      'V_PlateCarrierIAGL_oli':   {money: 500},

      'V_PlateCarrierGL_rgr':     {money: 500},
      'V_PlateCarrierGL_blk':     {money: 500},
      'V_PlateCarrierGL_mtp':     {money: 500},

      /*
      'V_PlateCarrierSpec_rgr':   {money: 400},
      'V_PlateCarrierSpec_blk':   {money: 400},
      'V_PlateCarrierSpec_mtp':   {money: 400},
      */
      'H_HelmetB':                {money: 50},
      'H_HelmetIA':               {money: 50},
    }
  },

  {
    _id: 'MISC',
    name: 'Misc',
    items: {
      'optic_Holosight_smg':      {money: 20},
      'optic_Aco_smg':            {money: 20},
      'optic_ACO_grn_smg':        {money: 20},

      'optic_Holosight':          {money: 50},
      'optic_Aco':                {money: 50},
      'optic_ACO_grn':            {money: 50},
      'CUP_optic_CompM4':         {money: 30},

      'optic_Arco':               {money: 500},
      'optic_Hamr':               {money: 500},
      'optic_MRCO':               {money: 300},
      'optic_DMS':                {money: 700},
      'hlc_optic_kobra':          {money: 20},
      'HLC_Optic_PSO1':           {money: 200},


      'bipod_01_F_blk':   {money: 50},

      'bipod_01_F_mtp':   {money: 50},
      'bipod_01_F_snd':   {money: 50},
      'bipod_02_F_blk':   {money: 50},

      'bipod_02_F_hex':   {money: 50},
      'bipod_03_F_oli':   {money: 50},

      'ItemGPS':          {money: 30},
      'Binocular':        {money: 20},

      'HandGrenade':      {money: 10},
      'SmokeShell':       {money: 5},
      'IKRS_outpost_backpack': {money: 100},
      'muzzle_HBADGER': {money: 10}
    }
  },

  {
    _id: 'VEHICLES',
    name: 'Vehicles',
    items: {
      'UAZ_Unarmed':        {money: 150},
      'BAF_Offroad_D':      {money: 250},
      'BAF_Offroad_W':      {money: 250},

      'B_UGV_01_F':         {money: 250},

      'B_MRAP_01_F':        {money: 450},
      'O_MRAP_02_F':        {money: 450},


      'B_Mortar_01_support_F':  {money: 50},
      'B_Mortar_01_weapon_F':   {money: 350},

      'RDS_M2_MiniTripod_Bag': {money: 50},
      'RDS_M2_Gun_Bag':        {money: 200},

      'RDS_DShkM_TripodLow_Bag':  {money: 50},
      'RDS_DShkM_Gun_Bag':        {money: 200},

    }
  },
];