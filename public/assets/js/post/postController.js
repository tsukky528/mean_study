angular.module('post-app.postController', ['post-app.postService'])
    .controller('PostController', function(Post){
        var vm = this;

        vm.posts =[];

        vm.postForm = '';

        Post.get().success(function(data){
            vm.posts = data;
        }).error(function(data){
            console.log(data);
        });

        vm.createPost = function(){
            var text = vm.text;
            var name = vm.name;
            vm.text = '';
            vm.name = '';
            Post.create({
                name:name,
                text:text
            }).success(function(data){
                vm.posts = data;
            }).error(function(data){
                console.log(data);
            });
        };

    });