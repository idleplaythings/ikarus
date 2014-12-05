Template.home.created = function(){
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
};

Template.home.helpers({
  company: function() {
    return dic.get('CompanyRepository').getByMember(
      dic.get('PlayerRepository').getCurrent()
    );
  }
})
