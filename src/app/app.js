angular.module('appoints', [
  'ngRoute',
  'appoints.flash',
  'appoints.usersession',
  'appoints.home',
  'appoints.login',
  'appoints-client-templates'
])

.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.controller('AppCtrl', function AppController ($scope, $location, usersession) {
  var defaultPageTitle = 'Appoints';

  $scope.pageTitle = defaultPageTitle;

  $scope.$on('$routeChangeSuccess', function (ev, currentRoute) {
    $scope.pageTitle = currentRoute.title || defaultPageTitle;
  });

  $scope.user = usersession.current();

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

  $scope.logout = function () {
    usersession.logout(function () {
      $location.url('/');
    });
  };

  $scope.$on('event:currentSessionChanged', function (ev, currentSession) {
    $scope.user = currentSession;
  });

});