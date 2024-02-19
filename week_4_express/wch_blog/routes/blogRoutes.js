const router = require('express').Router();

const postController = require('../controller/postController');

router.get('/read' , postController.getPosts);
router.post('/creat', postController.createPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;
