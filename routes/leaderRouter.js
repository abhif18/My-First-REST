var router = require('express').Router();
var Leaders = require('../models/leaders');

router.get('/',function(req,res,next) {
	Leaders.find({}, function(err,foundLeaders){
		if(err) throw err;
		res.json(foundLeaders);
	});
});
router.post('/',function(req,res,next) {
     Leaders.create(req.body,function(err,createdLeader){
     	if(err) throw err;
     	console.log(`Created a new Leader with Id ${createdLeader._id}`);
     	res.writeHead(200,{"Content-Type": "text/plain"});
     	res.end(`Created a new Leader with Id ${createdLeader._id}`);
     });
 }).
delete('/',function(req,res,next) {
	Leaders.remove({}, function(err,response){
		if(err) throw err;
		res.json(response);
	});
});

router.get('/:leaderId',function(req,res,next) {
	Leaders.findById(req.params.leaderId,function(err,foundLeader){
		if(err) throw err;
		res.json(foundLeader);
	});
}).
put('/:leaderId',function(req,res,next) {
	Leaders.finByIdAndUpdate(req.params.leaderId, {$set: req.body} , { new: true },
		function(err,updatedLeader){
			if(err) throw err;
			console.log('Leader Updated');
			res.json(updatedLeader);
		});
}).
delete('/:leaderId',function(req,res,next) {
	 Leaders.remove(req.params.leaderId,function(err,response){
	 	if(err) throw err;
	 	res.json(response);
	 });
});

module.exports = router;