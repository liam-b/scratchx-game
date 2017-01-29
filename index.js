(function(ext) {

  $.getScript('https://www.gstatic.com/firebasejs/3.6.7/firebase.js');

  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return { status: 2, msg: 'Ready' };
  };

  ext.loadFirebase = function () {
    var config = {
      apiKey: "AIzaSyBjMoyVchSzx8ljc4abS2GzjyDEkXDCUt8",
      authDomain: "scratchx-10c48.firebaseapp.com",
      databaseURL: "https://scratchx-10c48.firebaseio.com",
      storageBucket: "scratchx-10c48.appspot.com",
      messagingSenderId: "333335436846"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
  };

  ext.uploadData = function (world, id, x, y) {
    firebase.database().ref('/world/' + world.toString() + '/players/' + id.toString()).set({
      'x': x,
      'y': y
    });
  };

  var data = {}
  ext.listenData = function (world) {
    firebase.database().ref('/' + world.toString() + '/').on('value', function (snapshot) {
      data = snapshot.val();
    });
  };

  ext.downloadX = function (id) {
    return data[id].x;
  }

  ext.downloadY = function (id) {
    return data[id].y;
  }

  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      // Block type, block name, function name
      [' ', 'initialise firebase', 'loadFirebase'],
      [' ', 'upload world%n id%n, x:%n, y:%n', 'uploadData'],
      [' ', 'listen world%n', 'listenData'],
      ['r', 'x of id%n', 'downloadX'],
      ['r', 'y of id%n', 'downloadY'],
    ]
  };

  // Register the extension
  ScratchExtensions.register('Firebase extension :o', descriptor, ext);
})({});