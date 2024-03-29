const Sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
  },
  async store(req, res) {
    const {
 author, place, description, hashtags 
} = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // Redimensionamento da imagem
    await Sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );

    // Deleta a imagem não redimensionada
    // fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    // socketio emite para todos os usuários com a nova informação em tempo real
    req.io.emit('post', post);

    return res.json(post);
  },
};
