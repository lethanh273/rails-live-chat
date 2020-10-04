$(document).on("turbolinks:load", function() {
  $("form#js-socket").submit(function(event) {
    var $input, data;
    console.log("stopping submitting from HTTP");
    event.preventDefault();
    // use jQuery to find the text input:
    $input = $(this).find('input:text');
    data = {body: $input.val()}; // data here is what you type in form, it is body of new message
    console.log("sending over socket: ", data);
    App.messages.create(data); // send what you type in form to javascripts/channels/messages.js
    // clear text field
    $input.val('');
  });

  $(".message").click("a", function(event) {
    console.log("deleting", this);
    event.preventDefault();
    messageId = $(this).data('message-id');
    App.messages.delete(messageId);
  });

});