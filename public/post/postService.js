angular.module('post-app.postService', [])
    .factory('Post', function($http){
        var get = function(){
            return $http.get('/api/posts');
        };
        var create = function(params){
            return $http.post('/api/posts', params);
        };

        return {
            get:get,
            create:create
        }
    });