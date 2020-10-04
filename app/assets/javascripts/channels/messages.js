App.messages = App.cable.subscriptions.create("MessagesChannel", {
  connected: function() {
    console.log("MessagesChannel :: connected");
  },

  disconnected: function() {},

  received: function(data) {
    console.log("client receives ", data);
    if (data.action == 'delete') {
      $("#message_" + data.messageId).remove();
    } else {
      $(".messages").prepend(data.message);
    }
  },

  create: function(data) {
    this.perform("create", {message: data});
    // `message` is key of hash, `data` is value of hash == body send from javascripts/messages.js
    // create is method in MessagesChannel
  },

  delete: function(messageId) {
    this.perform("destroy", {messageId: messageId});
  }
});