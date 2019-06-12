const Post = require('../models/Post');

module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id);
        post.likes += 1;
        await post.save();
        
        // socketio emite para todos os usuários com a nova informação em tempo real
        req.io.emit('like', post);
        
        return res.json(post);
    }
}