var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope, $timeout) {
  $scope.getal = "";
  $scope.aantalgoed = "";
  $scope.tijdpersom = 0;
  $scope.ar = [];
  $scope.ar2 = [];
  $scope.herhaal = "nee";
  $scope.targettijdpersom = 2;
  $scope.targetaantalsommen = 20;

  var slider = document.getElementById("rTijdPerSom");
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    $scope.targettijdpersom = this.value;
  }
  var slider2 = document.getElementById("rAantalSommen");
  // Update the current slider value (each time you drag the slider handle)
  slider2.oninput = function() {
    $scope.targetaantalsommen = this.value;
  }

  $scope.gn = function() {
    //  console.log($scope.ar.length);
    //  console.log($scope.ar.length % 5 === 0);
    //  console.log(( $scope.ar.length % 5 === 0  ) && ($scope.ar.length > 0));
    t = document.getElementById('t');
    if (($scope.ar.length % 3 === 0) && ($scope.ar.length > 0)) {
      //  console.log("ja")
      $scope.herhaal = "ja_3";
      t.style.color = "red";
      $scope.deel1 = $scope.ar4[0][4];
      //   console.log($scope.ar4[0][3]);
      $scope.deel2 = $scope.ar4[0][5];
    } else if (($scope.ar.length % 5 === 0) && ($scope.ar.length > 0)) {
      $scope.herhaal = "ja_5";
      t.style.color = "purple";
      $scope.deel1 = $scope.ar4[1][4];
      //   console.log($scope.ar4[0][3]);
      $scope.deel2 = $scope.ar4[1][5];

    } else {
      t.style.color = "black";
      $scope.deel1 = Math.floor((Math.random() * 10) + 1);
      $scope.deel2 = Math.floor((Math.random() * 10) + 1);
      $scope.herhaal = "nee";
    }
  }

  $scope.resetval = function() {
    $scope.getal = "";
  }

  $scope.fn = function(p) {
    $scope.getal = "" + $scope.getal + p;
    //  console.log("" + $scope.getal + p);
    if ($scope.deel1 * $scope.deel2 == $scope.getal) {
      //var sound = document.getElementById("audio");
      //sound.play();      
      imgObj = document.getElementById('auto');
      imgObj.style.top = parseInt(imgObj.style.top) - (479 / $scope.targetaantalsommen) + 'px';
      $scope.ar.push([$scope.deel1 + "*" + $scope.deel2, $scope.counter.toFixed(1), 0, $scope.deel1, $scope.deel2]);
      $scope.ar[$scope.ar.length - 1][2] = 2;

      // console.log($scope.ar.length);
      if ($scope.ar.length > 3) {
        // console.log($scope.ar[$scope.ar.length-2][1]);
        $scope.ar[$scope.ar.length - 1][2] = $scope.ar[$scope.ar.length - 1][1] - $scope.ar[$scope.ar.length - 2][1]
      }

      gevonden = "nee";
      for (var i = 0; i < $scope.ar2.length; i++) {
        if ($scope.ar2[i][0] === $scope.ar[$scope.ar.length - 1][0]) {
          gevonden = "ja";
          $scope.ar2[i][1] = $scope.ar2[i][1] + $scope.ar[$scope.ar.length - 1][2];
          $scope.ar2[i][2] = $scope.ar2[i][2] + 1;
          $scope.ar2[i][3] = $scope.ar2[i][1] / $scope.ar2[i][2];
        }
      }
      if (gevonden == "nee") {
        //   console.log($scope.ar[$scope.ar.length - 1][0]);
        $scope.ar2.push([$scope.ar[$scope.ar.length - 1][0], $scope.ar[$scope.ar.length - 1][2], 1, $scope.ar[$scope.ar.length - 1][2], $scope.ar[$scope.ar.length - 1][3], $scope.ar[$scope.ar.length - 1][4]]);
      }


      $scope.ar4 = $scope.ar2.sort(function(a, b) {
        return b[3] - a[3]
      });

      //   $scope.ar2.push([element[0], element[2]]);
      $scope.reset();
      $scope.aantalgoed++;
      if ($scope.aantalgoed >= $scope.targetaantalsommen && $scope.counter < $scope.targetaantalsommen * $scope.targettijdpersom) {
        document.getElementById("bom").style.visibility = "visible"
      }
      $scope.tijdpersom = ($scope.counter / $scope.aantalgoed).toFixed(2);
      $scope.getal = "";
    }
  }


  $scope.counter = 0;
  $scope.onTimeout = function() {
    $scope.counter++;
    mytimeout = $timeout($scope.onTimeout, 1000);
    if ($scope.counter % $scope.targettijdpersom === 0 && $scope.counter <= $scope.targettijdpersom * $scope.targetaantalsommen) {
      imgObj2 = document.getElementById('auto2');
      imgObj2.style.top = parseInt(imgObj2.style.top) - (479 / $scope.targetaantalsommen) + 'px';
    }
  }
  var mytimeout = $timeout($scope.onTimeout, 1000);

  $scope.reset = function() {
    $scope.gn();
  }

  $scope.start = function() {
    $scope.reset();
    $scope.counter = 0;
    $scope.aantalgoed = 0;
    imgObj = document.getElementById('auto');
    imgObj.style.top = 0;
    imgObj = document.getElementById('auto2');
    imgObj.style.top = 0;
    document.getElementById("bom").style.visibility = "hidden"

  }
});
