// Create a MongoDB Collection
PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  Template.leaderboard.helpers({
    // helpers go here
    'player': function(){
      return PlayersList.find()
    },
    'selectedClass': function(){
      var playerID = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerID == selectedPlayer){
        return "selected"
      }
    }
  });
  Template.leaderboard.events({
    // events go here
    'dblclick .player': function(){
      var playerID = this._id;
      Session.set('selectedPlayer', playerID);
      var selectedPlayer = Session.get('selectedPlayer');
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    }
  });
}

if(Meteor.isServer){

}
