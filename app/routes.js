var Post = require('./post/post.js');

module.exports = function(app){

    app.get('/api/posts', function(req, res){
        Post.find(function(err, posts){
            if(err) res.send(err);

            res.json(posts);
        });
    });

    app.post('/api/posts', function(req, res){
        Post.create({
            name:req.body.name!==''?req.body.name:'Guest',
            text: req.body.text
        }, function(err, post){
            if(err) res.send(err);
            Post.find(function(err, posts){
                if(err) res.send(err);
                res.json(posts);
            });
        });
    });

    app.get('*', function(req,res){
        res.sendfile('./public/index.html');
    });

};