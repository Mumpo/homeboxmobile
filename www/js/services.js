angular.module('starter.services', [])

.factory('SensorsService', function($http, $ionicPopup) {

    var myService = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('http://46.101.139.161/bdapi/api-android.php').then(function (response) {
                // The then function here is an opportunity to modify the response
                //console.log(response);
                // The return value gets picked up by the then in the controller.
                found = false;
                response.data.forEach(function (zone, i) {
                    zone.sensors.forEach(function (sensor, j) {
                        if (!found && sensor.alert !== undefined) {
                            if (sensor.value < sensor.alert.min_value || sensor.value > sensor.alert.max_value) {
                                found = true;
                                $ionicPopup.show({
                                    title: "Alerta!",
                                    subTitle: "El sensor de " + 
                                        (sensor.type == "temperature" ? "temperatura" :
                                        sensor.type == "humidity" ? "humedad" : "movimiento") + " de " + zone.name + " ha superado los límites establecidos.",
                                    buttons: [
                                        { text: 'Aceptar'}
                                    ]
                                });
                            }
                        }
                    });
                });
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return myService;
});