angular.module('starter.controllers', ['rzModule'])

.controller('SensorsCtrl', function(SensorsService, $scope, $timeout, $ionicPopup) {
    $scope.haSaltado = false;
    $scope.automated = function() {
        SensorsService.async().then(function(d) {
            $scope.zones = d;
            angular.element(document).ready(function() {
                $scope.zones.forEach(function(zone,i) {
                    zone.sensors.forEach(function(val,j) {
                        if (val.type == "temperature" || val.type == "humidity") {
                            var color_result;
                            if (val.type == "temperature") {
                                if (val.value < 12) color_result = "#4B77BE";
                                else if (val.value > 42) color_result = "#FF5A5E";
                                else if (val.value > 30) color_result = "#F27935";
                                else color_result = "#46BFBD";
                            }
                            else if (val.type == "humidity") {
                                if (val.value < 25) color_result = "#4B77BE";
                                else if (val.value > 75) color_result = "#FF5A5E";
                                else if (val.value > 50) color_result = "#F27935";
                                else color_result = "#46BFBD";
                            }
                            makeGauge(
                            {
                                "id": "gauge-"+i+"-"+j,
                                "id_text": "gauge-text-"+i+"-"+j,
                                "color": color_result,
                                "value": val.value,
                                "max": val.max_value
                            });
                        }
                    });
                });
            });
            

        });
    };
    $scope.automated();

    $scope.intervalFunction = function(){
        $timeout(function() {
            $scope.automated();
            $scope.intervalFunction();
            //$ionicPopup.alert("hola");
        }, 5000)
    };

    // Kick off the interval
    $scope.intervalFunction();

    
    
})

.controller('ActuatorsCtrl', function($scope) {
    $scope.zones = [
        {
            "name": "Dormitorio",
            "actuators": [
                {
                    "name": "Calefacción",
                    "toggle": true,
                    "min_value": 0,
                    "max_value": 30,
                    "value": 25,
                    "unit": "ºC"
                }
            ]
        },
        {
            "name": "Salón",
            "actuators": [
                {
                    "name": "Luz",
                    "toggle": false
                }
            ]
        }
    ];
})

.controller('AlertsCtrl', function($scope, SensorsService) {
    SensorsService.async().then(function(d) {
        $scope.zones = d;
        $scope.zones.forEach(function(val,i) {
            val.sensors.forEach(function(va, j){
                $scope.zones[i].sensors[j].active = $scope.zones[i].sensors[j].alert !== undefined;
            });
        });
    });

    $scope.showAlert = function(sensor) {
        sensor.editAlert = !(sensor.editAlert);
        $rootScope.$broadcast('rzSliderForceRender');//Force refresh sliders on render. Otherwise bullets are aligned at left side.
    };

    $scope.initAlert = function(sensor) {
        var alert = {
            'min': sensor.min_value,
            'max': sensor.max_value,
            'active': sensor.alert !== undefined
        };
        alert.min_value = sensor.alert === undefined ? alert.min : sensor.alert.min_value;
        alert.max_value = sensor.alert === undefined ? alert.max : sensor.alert.max_value;
        return alert;
    }
});
