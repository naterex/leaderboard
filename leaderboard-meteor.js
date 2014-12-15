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
      // console.log(selectedPlayer)
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, { $inc: { score: 5 } });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, { $inc: { score: -5 } });
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      confirm("Are you sure u want to remove this player?");
      PlayersList.remove(selectedPlayer);
    }
  });
  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var playerScore = Number(event.target.playerScore.value);
      PlayersList.insert({
        name: playerNameVar,
        score: playerScore
      });
      event.target.playerName.value = '';
    }
  });
}

if(Meteor.isServer){

}
