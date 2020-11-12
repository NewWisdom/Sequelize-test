var express = require('express');
var router = express.Router();
const {User, Comment} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//
router.post('/comments', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /comment/id
router.get('/comments/:id',function(req,res,next){
  Comment.findAll({
      include : {
          model:User,
          where:{id:req.params.id},
      }
  })
      .then((comments)=>{
          console.log(comments);
          res.json(comments);
      })
      .catch((err)=>{
          console.error(err)
          next(err)
      })
})

module.exports = router;
