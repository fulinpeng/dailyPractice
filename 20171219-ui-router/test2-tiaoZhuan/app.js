/**
 * Created by flp on 2017/12/19.
 */
var photoGallery = angular.module('photoGallery',["ui.router"]);
photoGallery.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home',{
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('photos',{
            url: '/photos',
            templateUrl: 'templates/photos.html'
        })
        .state('about',{
            url: '/about',
            templateUrl: 'templates/about.html'
        });
});