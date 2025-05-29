const express = require('express');
const router = express.Router();

const {getCommentsByProduct,createComment,deletComment,getAllComments} = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/:productId', getCommentsByProduct);
router.post('/', authMiddleware, createComment);
router.delete('/:commentId',authMiddleware,deletComment );
router.get('/all/comments', authMiddleware, getAllComments);

module.exports = router

 
  
