// combo of
// SSE example: https://github.com/kljensen/node-sse-example/blob/master/app.js
// and
// proximity sensor example: http://johnny-five.io/examples/proximity-hcsr04/

var express = require('express');
var app = express();

var template =
`<!DOCTYPE html> <html> <body>
	<script type="text/javascript">
		var source = new EventSource("/events/");
		source.onmessage = function(e) {
			document.body.innerHTML = e.data + "<br>";
		};
	</script>
</body> </html>`;

app.get('/', function (req, res) {
	res.send(template); // <- Return the static template above
});

var clientId = 0;
var clients = {}; // <- Keep a map of attached clients

// Called once for each new client. Note, this response is left open!
app.get('/events/', function (req, res) {
	req.socket.setTimeout(Number.MAX_VALUE);
	res.writeHead(200, {
		'Content-Type': 'text/event-stream', // <- Important headers
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	res.write('\n');
	(function (clientId) {
		clients[clientId] = res; // <- Add this client to those we consider "attached"
		req.on("close", function () {
			delete clients[clientId]
		}); // <- Remove this client when he disconnects
	})(++clientId)
});

const {Board, Proximity} = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  const proximity = new Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("change", () => {
    const {centimeters, inches} = proximity;
    // console.log("Proximity: ");
    // console.log("  cm  : ", centimeters);
    // console.log("  in  : ", inches);
    // console.log("-----------------");

    var msg = `Proximity: ${centimeters} centimenters and ${inches} inches`;
    console.log("Clients: " + Object.keys(clients) + " <- " + msg);
    for (clientId in clients) {
      clients[clientId].write("data: " + msg + "\n\n"); // <- Push a message to a single attached client
    };
  });
});



app.listen(process.env.PORT || 8080);
