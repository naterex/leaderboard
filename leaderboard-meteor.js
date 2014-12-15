
// Create a MongoDB Collection
PlayersList = new Mongo.Collection('players');

// Code that only runs on the client (within the web browser)
if(Meteor.isClient){

  // "Catch" the selection of data from the Meteor.publish function
  Meteor.subscribe('thePlayers');

  // Helper functions execute code within templates
  Template.leaderboard.helpers({
    'player': function(){

      // Get the ID of the current user
      var currentUserId = Meteor.userId();

      // Retrieve data that belongs to the current user
      return PlayersList.find({}, {sort: {score: -1, name: 1}});

    },
    'selectedClass': function(){

        // Get the ID of the player being iterated through
        var playerId = this._id;

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

         // Do these IDs match?
        if(playerId == selectedPlayer){

            // Return a CSS class
            return "selected"

        }

    },
    'showSelectedPlayer': function(){

      // Get the ID of the player that's been clicked
      var selectedPlayer = Session.get('selectedPlayer');

      // Retrieve a single document from the collection
      return PlayersList.findOne(selectedPlayer)

    }
  });

  // Events trigger code when certain actions are taken
  Template.leaderboard.events({
      'click .player': function(){

          // Retrieve the unique ID of the player that's been clicked
          var playerId = this._id;

          // Create a session to store the unique ID of the clicked player
          Session.set('selectedPlayer', playerId);

      },
      'click .increment': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // call Meteor method 'modifyPlayerScore' by 5 points
        Meteor.call('modifyPlayerScore', selectedPlayer, 5);

      },
      'click .decrement': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // call Meteor method 'modifyPlayerScore' by -5 points
        Meteor.call('modifyPlayerScore', selectedPlayer, -5);

      },
      'click .remove': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // call Meteor method 'modifyPlayerScore'
        Meteor.call('removePlayerData', selectedPlayer);

      }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){

        // Prevent the browser from applying default behaviour to the form
        event.preventDefault();

        // Get the value from the "playerName" text field
        playerNameVar = event.target.playerName.value;

        // Get the value from the "playerName" text field
        playerScoreVar = Number(event.target.playerScore.value);

        // call Meteor method 'insertPlayerData'
        Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);

    }
  });

}

// Code that only runs on the server (where the application is hosted)
if(Meteor.isServer){

  // Transmit a selection of data into the ether
  Meteor.publish('thePlayers', function(){

    // Get the ID of the current user
    var currentUserId = this.userId;

    // Return players "owned" by the current user
    return PlayersList.find({createdBy: currentUserId})

  });

  // Method functions executed on server from Client submitted data
  Meteor.methods({
    'insertPlayerData': function(playerNameVar, playerScoreVar){
      var currentUserId = Meteor.userId();
      PlayersList.insert ({
        name: playerNameVar,
        score: playerScoreVar,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer){
      PlayersList.remove(selectedPlayer);
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue){
      PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
    }
  });

}