// Create a MongoDB Collection
PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  Template.leaderboard.helpers({
    // helpers go here
    'player': function(){
      return PlayersList.find({}, {sort: { score: -1, name: 1 } })
    },
    'selectedClass': function(){
      var playerID = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerID == selectedPlayer){
        return "selected"
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
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
      PlayersList.update(selectedPlayer, { $inc: { score: 5 } });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, { $inc: { score: -5 } });
    }
  });
}

if(Meteor.isServer){

}
