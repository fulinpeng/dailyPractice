/**
 * Created by flp on 2017/12/19.
 */
var photoGallery = angular.module('photoGallery',["ui.router"]);
photoGallery.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state('content',{
            url: '/',
            views:{
                "":{templateUrl: 'partials/content.html'},
                "header@content":{templateUrl: 'partials/header.html'}
            }
        })
        .state('content.home',{
            url: 'home',
            views:{
                "body@content":{templateUrl: 'partials/home.html'}
            }
        })
        .state('content.photos',{
            url: 'photos',
            views:{
                "body@content":{templateUrl: 'partials/photos.html'}
            }
        })
        .state('content.photos.list',{
            url: 'photos-list',
            views:{
                "body@content":{templateUrl: 'partials/photos-list.html'}
            }
        })
        .state('content.photos.detail',{
            url: 'photos-detail',
            views:{
                "body@content":{templateUrl: 'partials/photo-detail.html'}
            }
        })
        .state('content.photos.detail.comment',{
            url: 'photos-detail-comment',
            views:{
                "body@content":{templateUrl: 'partials/photos-detail-comment.html'}
            }
        })
        .state('content.about',{
            url:'about',
            views:{
                "body@content":{templateUrl: 'partials/about.html'}
            }
        });
});