// Create a MongoDB Collection
PlayersList = new Mongo.Collection('players');
// console.log("PlayersList created");

if(Meteor.isClient){
  Template.leaderboard.helpers({
    // helpers go here
    'player': function(){
      return PlayersList.find()
    }
  });
  Template.leaderboard.events({
    // events go here
    'dblclick .player': function(){
      Session.set('selectedPlayer', 'session value test');
      console.log("You clicked a .player element");
    }
  });
}

if(Meteor.isServer){

}
