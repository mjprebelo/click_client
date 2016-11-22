
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
  });
})

/** 
 * Define our controller. The $scope and $document parameters tell angular
 * to inject these objects, making them accessible from our controller.
*/
.controller('MainCtrl', function($scope, $document) {
    // Output to the log so we know when our controller is loaded.
    console.log('MainCtrl loaded.');
 
    // Define the URL for our server.
    var SERVER_URL = 'ws://localhost:7007';

    //var SERVER_URL = 'ws://mjprebelo.ddns.net:7007';
    var ws;
    connect();

    /**
     * This function initiates the connection to the web socket server.
     */
    function connect() {
        ws = new WebSocket(SERVER_URL, []);
        ws.onmessage = handleMessageReceived;
        //ws.onopen = handleConnected;
        ws.onerror = handleError;
    } 
    
    /** 
     * This is the function that is called when the WebSocket receives
     * a message
     */
    function handleMessageReceived(data) {
        // Simply call logMessage(), passing the received data.
        logMessage(data.data);
    }
 
    /**
     *  This is the function that is called when the WebSocket connects
     *  to the server. 
     */    
    function handleConnected(data) {
        var logMsg = 'Connected to server: ' + data.target.url;
        // Add the message to the log.
        logMessage(logMsg)
    }
 
    /** 
     * This is the function that is called when an error occurs with our
     * WebSocket.
     */
    function handleError(err) {
        // Print the error to the console so we can debug it.
        console.log("Error: ", err);
    }
 
    /**
     * This function update the input number of click 
     */
    function logMessage(msg) {
        $scope.$apply(function() {
            $scope.messageLog = msg;
        });
    }     
 
    /**
     * Function called when a user hits click send the click info to click_server 
     */
    $scope.sendClick = function sendClick() {
        ws.send('');
    }
})
