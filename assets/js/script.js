$(function() {

    // The URL of your web server (the port is set in app.js)
    var url = 'http://localhost:9000';

    var doc = $(document),
        win = $(window);
        button = $("#button");
        nameInput = $("#name");
        clickDiv = $(".clicks");

    var socket = io.connect(url);

    button.on('click', function(e) {
      var name = (nameInput.val() ? nameInput.val() : "Anonymous")
      var time = (new Date()).toTimeString() 
      socket.emit('clicked', {
        'name': name,
        'time': time
      });
      clickDiv.prepend("<div>"+name+" clicked at "+time+"</div>");
    });

    socket.on('click', function(data) {
      clickDiv.prepend("<div>"+data.name+" clicked at "+data.time+"</div>");
    });
    
});
