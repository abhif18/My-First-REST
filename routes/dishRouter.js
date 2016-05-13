var mongoose = require('mongoose');
var Dishes = require('../models/dishes'); 

var router = require('express').Router();

router.get('/',function(req,res,next) {
	Dishes.find({},function(err,foundDishes){
		if(err)
			throw err;
		res.json(foundDishes);
	});
});
router.post('/',function(req,res,next) {
	 Dishes.create(req.body,function(err,createdDish){
	 	if(err)
	 		throw err;
	 	console.log(`Created a new Dish with Id ${createdDish._id}`);
	 	res.writeHead(200,{"Content-Type": "text/plain"});
	 	res.end(`Created a new Dish with Id ${createdDish._id}`);
	 });
}).
delete('/',function(req,res,next) {
	Dishes.remove({}, function(err,response){
		if(err) throw err;
		res.end(response);
	});
});

router.get('/:dishId',function(req,res,next) {
	Dishes.findById(req.params.dishId,function(err,foundDish){
       if(err) throw err;
       res.json(foundDish);
	});
});
router.put('/:dishId',function(req,res,next) {
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body} , { new: true },
		function(err,updatedDish){
			if(err) throw err;
			res.json(updatedDish);
		});
});
router.delete('/:dishId',function(req,res,next) {
	 Dishes.remove(req.params.dishId,function(err,response){
	 	if(err) throw err;
	 	res.json(response);
	 });
});

router.get('/:dishId/comments',function(req,res,next) {
	Dishes.findById(req.params.dishId, function(err,foundDish){
		if(err) throw err;
		res.json(foundDish.comments);
	});
}).post('/:dishId/comments',function(req,res,next){
	Dishes.findById(req.params.dishId, function(err,foundDish){
		if(err) throw err;
		foundDish.comments.push(req.body);
        foundDish.save(function(err,savedDish){
        	if(err) throw err;
        	console.log('Comment Added Successfully');
        	res.json(savedDish);
        });
	});
}).delete('/:dishId/comments', function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,foundDish){
        for(var i = foundDish.comments.length-1;i>=0;i--){
        	foundDish.comments.id(foundDish.comments[i]._id).remove();
        }
        foundDish.save(function(err,savedDish){
        	if(err) throw err;
        	res.writeHead(200,{"Content-Type": "text/plain"});
        	res.end('Deleted all Comments');
        });
	});
});

router.get('/:dishId/comments/:commentId',function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,foundDish){
		res.json(foundDish.comments.id(req.params.commentId));
	});
}).
put('/:dishId/comments/:commentId',function(req,res,next){
	Dishes.findById(req.params.dishId , function(err,foundDish){
		if(err) throw err;
		//First Remove the Previous Comment and then Add in the new One
		foundDish.comments.id(req.params.commentId).remove();
		foundDish.comments.push(req.body);
		foundDish.save(function(err,savedDish){
			if(err) throw err;
			console.log(`Updated the comment with comment id ${req.params.commentId}`);
			res.json(savedDish);
		});
	});
}).
delete(function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,foundDish){
		foundDish.comments.id(req.params.commentId).remove();
		foundDish.save(function(err,savedDish){
			if(err) throw err;
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.end('Deleted the Comment');
		});
	});
});

module.exports = router;