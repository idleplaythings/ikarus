marketDefinitions = [
  {
    _id: 'AR',
    name: 'Assault rifles',
    items: {
      'arifle_MX_F':            {money: 200},
      'arifle_MX_Black_F':      {money: 300},
      'arifle_MX_GL_F':         {money: 500},
      'arifle_MX_GL_Black_F':   {money: 600},
      'arifle_MXC_F':           {money: 180},
      'arifle_MXC_Black_F':     {money: 280},

      'arifle_Katiba_C_F':      {money: 150},
      'arifle_Katiba_F':        {money: 170},
      'arifle_Katiba_GL_F':     {money: 450},

      'hlc_rifle_ak74':         {money: 20},
      'hlc_rifle_aks74':        {money: 20},
      'hlc_rifle_ak12':         {money: 100},
      'hlc_rifle_ak12GL':       {money: 300},
      'hlc_rifle_aks74u':       {money: 10},
      'hlc_rifle_aks74_GL':     {money: 100},
      'hlc_rifle_aek971':       {money: 30},

      'hlc_rifle_ak47':         {money: 50},
      'hlc_rifle_akm':          {money: 30},

      'hlc_rifle_RU556':        {money: 120},
      'hlc_rifle_RU5562':       {money: 120},
      'hlc_rifle_CQBR':         {money: 120},
      'hlc_rifle_M4':           {money: 120},
      //'hlc_rifle_m4m203':       {money: 420}, Sounds not working
      'hlc_rifle_bcmjack':      {money: 120},
      'hlc_rifle_Colt727':      {money: 120},
      'hlc_rifle_Colt727_GL':   {money: 420},
      'hlc_rifle_samr2':        {money: 120},

      'hlc_rifle_Bushmaster300':{money: 200},
      'hlc_rifle_vendimus':     {money: 200},
      'hlc_rifle_honeybadger':  {money: 200},

    }
  },

  {
    _id: 'SMG',
    name: 'SMGs',
    items: {
      'SMG_01_F':           {money: 150},
      'SMG_02_F':           {money: 120},
    }
  },

  {
    _id: 'BR',
    name: 'Battle rifles',
    items: {
      'srifle_DMR_06_camo_F':   {money: 600},
      'srifle_DMR_06_olive_F':  {money: 600},
      'srifle_EBR_F':           {money: 1200},
      'hlc_rifle_M14':          {money: 450},
    }
  },

  {
    _id: 'MG',
    name: 'Machine guns',
    items: {
      'arifle_MX_SW_F':         {money: 400},
      'arifle_MX_SW_Black_F':   {money: 500},
      'LMG_Mk200_F':            {money: 800},
      'LMG_Zafir_F':            {money: 1500},
      'MMG_01_hex_F':           {money: 2500},
      'MMG_01_tan_F':           {money: 2500},
      'MMG_02_camo_F':          {money: 2200},
      'MMG_02_black_F':         {money: 2200},
      'MMG_02_sand_F':          {money: 2200},
      'hlc_rifle_rpk':          {money: 300},
      'hlc_rifle_rpk74n':       {money: 350},
      'hlc_rifle_RPK12':        {money: 400},

    }
  },

  {
    _id: 'SR',
    name: 'Sniper rifles',
    items: {
      //MAR
      'srifle_DMR_02_F':          {money: 3000},
      'srifle_DMR_02_camo_F':     {money: 3000},
      'srifle_DMR_02_sniper_F':   {money: 3000},

      //EMR
      'srifle_DMR_03_F':          {money: 1500},
      'srifle_DMR_03_khaki_F':    {money: 1500},
      'srifle_DMR_03_tan_F':      {money: 1500},
      'srifle_DMR_03_multicam_F': {money: 1500},
      'srifle_DMR_03_woodland_F': {money: 1500},

      //kir
      'srifle_DMR_04_F':          {money: 2000},
      'srifle_DMR_04_Tan_F':      {money: 2000},

      //Cyrus
      'srifle_DMR_05_blk_F':      {money: 2500},
      'srifle_DMR_05_hex_F':      {money: 2500},
      'srifle_DMR_05_tan_F':      {money: 2500},

      //Rahim
      'srifle_DMR_01_F':          {money: 700},

      'arifle_MXM_F':             {money: 800},
      'arifle_MXM_Black_F':       {money: 900},
    }
  },

  {
    _id: 'AMMO',
    name: 'Ammo',
    items: {
      '30Rnd_556x45_Stanag':           {money: 5},
      '30Rnd_65x39_caseless_green':    {money: 10},
      '30Rnd_65x39_caseless_mag':      {money: 15},
      '1Rnd_HE_Grenade_shell':         {money: 100},
      '20Rnd_762x51_Mag':              {money: 100},
      '100Rnd_65x39_caseless_mag':     {money: 80},
      '200Rnd_65x39_cased_Box':        {money: 100},
      '150Rnd_762x54_Box':             {money: 200},
      '150Rnd_93x64_Mag':              {money: 400},
      '130Rnd_338_Mag':                {money: 350},

      '10Rnd_338_Mag':                 {money: 400},
      '10Rnd_127x54_Mag':              {money: 200},
      '10Rnd_93x64_DMR_05_Mag':        {money: 350},
      '10Rnd_762x54_Mag':              {money: 100},
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

      'V_PlateCarrierSpec_rgr':   {money: 400},
      'V_PlateCarrierSpec_blk':   {money: 400},
      'V_PlateCarrierSpec_mtp':   {money: 400},

      'H_HelmetB':                {money: 50},
      'H_HelmetIA':               {money: 50},
    }
  },

  {
    _id: 'MISC',
    name: 'Misc',
    items: {
      'optic_Holosight_smg':      {money: 50},
      'optic_Aco_smg':            {money: 50},
      'optic_ACO_grn_smg':        {money: 50},

      'optic_Holosight':          {money: 100},
      'optic_Aco':                {money: 100},
      'optic_ACO_grn':            {money: 100},

      'optic_Arco':               {money: 1000},
      'optic_Hamr':               {money: 1000},
      'optic_MRCO':               {money: 700},
      'optic_DMS':                {money: 2000},
      'hlc_optic_kobra':          {money: 20},
      'HLC_Optic_PSO1':           {money: 400},


      'bipod_01_F_blk':   {money: 50},

      'bipod_01_F_mtp':   {money: 50},
      'bipod_01_F_snd':   {money: 50},
      'bipod_02_F_blk':   {money: 50},

      'bipod_02_F_hex':   {money: 50},
      'bipod_03_F_oli':   {money: 50},

      'ItemGPS':          {money: 300},
      'Binocular':        {money: 50},

      'HandGrenade':      {money: 50},
      'SmokeShell':       {money: 10},
    }
  },
];