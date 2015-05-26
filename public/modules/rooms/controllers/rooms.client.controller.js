'use strict';

// Rooms controller
angular.module('rooms').controller('RoomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rooms',
	function($scope, $stateParams, $location, Authentication, Rooms) {
		$scope.authentication = Authentication;

		// Create new Room
		$scope.create = function() {
			// Create new Room object
			var room = new Rooms ({
				name: this.name,
				id: this.id,
				switches:
					[
						{
							name: this.switch.name,
							id: this.switch.id
						}
					]
			});

			// Redirect after save
			room.$save(function(response) {
				$location.path('rooms/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Room
		$scope.remove = function(room) {
			if ( room ) { 
				room.$remove();

				for (var i in $scope.rooms) {
					if ($scope.rooms [i] === room) {
						$scope.rooms.splice(i, 1);
					}
				}
			} else {
				$scope.room.$remove(function() {
					$location.path('rooms');
				});
			}
		};

		// Update existing Room
		$scope.update = function() {
			var room = $scope.room;

			room.$update(function() {
				$location.path('rooms/' + room._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rooms
		$scope.find = function() {
			$scope.rooms = Rooms.query();
		};

		// Find existing Room
		$scope.findOne = function() {
			$scope.room = Rooms.get({ 
				roomId: $stateParams.roomId
			});
		};

		$scope.addSwitch = function() {
			var room = $scope.room;
			room.switches.push({
				name:$scope.newSwitch.name,
				id: $scope.newSwitch.id
			});
			room.$update(/*function(errorResponse) {
                if(errorResponse.data.message) {
                    $scope.error = errorResponse.data.message;
                }
			}*/);
			$scope.newSwitch.name = '';
			$scope.newSwitch.id = '';

		};
		$scope.removeSwitch = function(idx) {
			$scope.room.switches.splice( idx, 1 );
			$scope.room.$update();
		};

        $scope.toggleStatus = function() {
			this.room.$update();
        };
	}
]);
