/**
 * Created by Andy on 2015.10.25.
 */
var app = angular.module('StarterApp', ['ngMaterial']);

(function() {
    'use strict';
    app
        .controller('DemoCtrl', function() {
            this.topDirections = ['left', 'up'];
            this.bottomDirections = ['down', 'right'];
            this.isOpen = false;
            this.availableModes = ['md-fling', 'md-scale'];
            this.selectedMode = 'md-fling';
            this.availableDirections = ['up', 'down', 'left', 'right'];
            this.selectedDirection = 'up';
        });
})();

(function () {
    'use strict';

    app.controller('AppCtrl', AppCtrl)
        .controller('RightCtrl', RightCtrl);

    function RightCtrl ($scope, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    };

    function AppCtrl ($scope, $log, $timeout, $mdDialog, $mdSidenav) {
        $scope.toggleRight = buildToggler('right');

        $scope.topDirections = ['left', 'up'];
        $scope.bottomDirections = ['down', 'right'];
        $scope.isOpen = false;
        $scope.availableModes = ['md-fling', 'md-scale'];
        $scope.selectedMode = 'md-fling';
        $scope.availableDirections = ['up', 'down', 'left', 'right'];
        $scope.selectedDirection = 'up';

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        };
    };
})();

function drawGrid() {
    var mapViewWidth = Math.abs(map.getBounds().getSouthWest().lat() - map.getBounds().getNorthEast().lat());
    var mapViewHeight = Math.abs(map.getBounds().getSouthWest().lng() - map.getBounds().getNorthEast().lng());
    var cellWidth = mapViewWidth / 6;
    var cellHeight = mapViewHeight / 6;

    for (var i = map.getBounds().getSouthWest().lat(); i < map.getBounds().getNorthEast().lat(); i = i + cellWidth) {
        for (var j = map.getBounds().getSouthWest().lng(); j < map.getBounds().getNorthEast().lng(); j = j + cellWidth) {
            map.drawRectangle({
                mouseover: function(e) {
                    this.setOptions(
                        {
                            fillOpacity: 0.5
                        }
                    )
                },
                mouseout: function(e) {
                    this.setOptions(
                        {
                            fillOpacity: 0
                        }
                    )
                },
                strokePosition: google.maps.StrokePosition.OUTSIDE,
                bounds: [[i, j], [i + cellWidth, j + cellWidth]],
                strokeColor: '#0D47A1',
                fillColor: '#1565C0',
                fillOpacity: 0,
                strokeOpacity: 0.5,
                strokeWeight: 1
            });
        }
    }

    console.log(mapViewWidth);
};

map = new GMaps({
    div: '#map',
    lat: -12.043333,
    lng: -77.028333,
    width: '100%',
    height: 'calc(100% - 80px)',
    streetViewControl: false,
    click: function(e) {
        map.drawRectangle({
            bounds: [[map.getBounds().getSouthWest().lat(), map.getBounds().getSouthWest().lng()], [map.getBounds().getNorthEast().lat(), map.getBounds().getNorthEast().lng()]],
            strokeColor: '#131540',
            strokeOpacity: 1,
            strokeWeight: 1
        });
        drawGrid();
        console.log([[map.getBounds().getSouthWest().lat(), map.getBounds().getSouthWest().lng()], [map.getBounds().getNorthEast().lat(), map.getBounds().getNorthEast().lng()]]);
    }
});