var app = angular.module('contctApp', []);

app.controller('AppCtrl', function($scope,$http) {
var mainObject = [];
var items = {
  id: "",
  name: "",
  owner_id: "",
  owner_avatar_url:"",
  open_issues:"",
  forks:0
};
var url = 'https://api.github.com/search/repositories?q='
$scope.submit = function (token) {
  var params =  document.getElementById('searchId').value;
  $http.get(url + params).then(function successCallback(response) {
    response = response.data;
    $scope.data = response;
  //  console.log($scope.data);
    $scope.data.items.forEach(function (res) {
      items.id = res.id;
      items.name = res.name;
       items.owner_id = res.owner.id
       items.owner_avatar_url =res.owner.avatar_url;
        items.open_issues = res.open_issues;
       items.forks = res.forks;
       mainObject.push(items);
    });
    $http({
           method: 'POST',
           url: '/contactlist/',
           data: mainObject
       }).then(successCallback, errorCallback);
       function successCallback(response){
        // console.log(response);
       }
       function errorCallback(error){
         //console.log('Error', error);
       }
    $http.get('/contactlist').then(successCallback, errorCallback);
        function successCallback(response){
          $scope.data  = response.data;
        }
        function errorCallback(error){
          console.log(error);
        }
     },
  function errorCallback(error){
    console.log(error);
  });
}
});
