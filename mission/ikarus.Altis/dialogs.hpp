class ikrs_ui_co_dialog
{
  idd = 10;
  movingenable=false;

  class controls
  {

    ////////////////////////////////////////////////////////
    // GUI EDITOR OUTPUT START (by Aatu, v1.063, #Nyjogo)
    ////////////////////////////////////////////////////////

    class ikrs_ui_co_bodyBackground: ikrs_ui_bodyBackground
    {
      idc = -1;
      x = 0.293724 * safezoneW + safezoneX;
      y = 0.269061 * safezoneH + safezoneY;
      w = 0.412551 * safezoneW;
      h = 0.505866 * safezoneH;
      onCanDestroy = "objectiveDialog_canDestroy;";
    };

    class ikrs_ui_co_objectiveList: RscListbox
    {
      idc = 1500;
      x = 0.304038 * safezoneW + safezoneX;
      y = 0.291055 * safezoneH + safezoneY;
      w = 0.185648 * safezoneW;
      h = 0.461877 * safezoneH;
      onLBSelChanged = "_this call objectiveDialog_chooseObjective; false";
    };

    class ikrs_ui_co_headerText: ikrs_ui_header
    {
      idc = -1;
      text = "  CHOOSE OBJECTIVE"; //--- ToDo: Localize;
      x = 0.293724 * safezoneW + safezoneX;
      y = 0.225073 * safezoneH + safezoneY;
      w = 0.412551 * safezoneW;
      h = 0.04 * safezoneH; //0.0329912 * safezoneH;
    };

    class ikrs_ui_co_objectivePicture: RscPicture
    {
      idc = 1200;
      text = "soldier.jpg";
      x = 0.5 * safezoneW + safezoneX;
      y = 0.291055 * safezoneH + safezoneY;
      w = 0.195962 * safezoneW;
      h = 0.195962 * safezoneH;
    };

    class ikrs_ui_co_objectiveDescription: ikrs_ui_description
    {
      idc = 1001;
      text = ""; //--- ToDo: Localize;
      x = 0.5 * safezoneW + safezoneX;
      y = 0.506 * safezoneH + safezoneY;
      w = 0.195962 * safezoneW;
      h = 0.22 * safezoneH;
    };

    class ikrs_ui_co_chooseObjectiveButton: ikrs_ui_button
    {
      idc = 1600;
      text = "READY"; //--- ToDo: Localize;
      x = 0.5 * safezoneW + safezoneX;
      y = 0.730939 * safezoneH + safezoneY;
      w = 0.195962 * safezoneW;
      h = 0.0219942 * safezoneH;
      action = "[] call objectiveDialog_ready;";
    };
    ////////////////////////////////////////////////////////
    // GUI EDITOR OUTPUT END
    ////////////////////////////////////////////////////////

  };
};

class ikrs_ui_news_dialog
{
  idd = 11;
  movingenable=false;

  class controls
  {

    ////////////////////////////////////////////////////////
    // GUI EDITOR OUTPUT START (by Aatu, v1.063, #Nyjogo)
    ////////////////////////////////////////////////////////

    class ikrs_ui_news_bodyBackground: ikrs_ui_bodyBackground
    {
      idc = -1;
      x = 0.30 * safezoneW + safezoneX;
      y = 0.25 * safezoneH + safezoneY;
      w = 0.40 * safezoneW;
      h = 0.50 * safezoneH;
    };

    class ikrs_ui_news_headerText: ikrs_ui_header
    {
      idc = -1;
      text = "NEWS"; //--- ToDo: Localize;
      x = 0.30 * safezoneW + safezoneX;
      y = 0.225 * safezoneH + safezoneY;
      w = 0.40 * safezoneW;
      h = 0.04 * safezoneH; //0.0329912 * safezoneH;
    };

    class ikrs_ui_news_objectiveDescription: ikrs_ui_description
    {
      idc = 1001;
      text = ""; //--- ToDo: Localize;
      x = 0.31 * safezoneW + safezoneX;
      y = 0.282 * safezoneH + safezoneY;
      w = 0.38 * safezoneW;
      h = 0.436 * safezoneH;
    };

  };
};