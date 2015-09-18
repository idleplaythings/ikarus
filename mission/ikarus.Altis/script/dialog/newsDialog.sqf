newsDialog_create = {
  disableSerialization;
  createDialog "ikrs_ui_news_dialog";
  (findDisplay 11 displayCtrl 1001) ctrlSetStructuredText parseText call newsDialog_getNews;
};

newsDialog_getNews = {
  "<br/>19.09.2015 *** ACE3 UPDATED AND SIGNAL CHANGES"
  + "<br/><br/>ACE 3 was updated and advanced medical is switched back on. If we still encounter bugs with it, we will switch back to basic medical."
  + " Please also note, that nothing from ACE 3 cargo system is saved. So don't load anything important there."
  + "<br/><br/>Signal mission was redesigned as per feedback from playtesting. Please read the briefing to understand the changes."

  + "<br/><br/><br/><br/><br/><br/><br/><br/>15.09.2015 *** LOOT BACKPACKS REMOVED"
  + "<br/><br/>Turns out loading a car during combat is not the most fun, nor the most sound tactical course of action."
  + " Instead of getting a whole lot of loot backpacks from loot boxes, the loot will be automatically added to your companys armory."
  + " This is to encourage people to do the objective, take the depot and not camp 45 minutes around the objective."
  + "<br/><br/>Do note, that many of the loot boxes still contain other loot that you still need to move back to your base.";

};

newsDialog_close = {
  findDisplay 11 closeDisplay 1;
};