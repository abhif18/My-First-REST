var router = require('express').Router();
var Promotions = require('../models/promotions');

router.get('/',function(req,res,next) {
	Promotions.find({}, function(err,foundPromotions){
		if(err) throw err;
		res.json(foundPromotions);
	});
});
router.post('/',function(req,res,next) {
	 Promotions.create(req.body, function(err,createdPromotion){
	 	if(err) throw err;
	 	console.log(`Created a new Promotion with Id ${createdPromotion._id}`);
	 	res.writeHead(200,{"Content-Type": "text/plain"});
	 	res.end(`Created a new Promotion with Id ${createdPromotion._id}`);
	 });
}).
delete('/',function(req,res,next) {
	Promotions.remove({}, function(err,response){
		if(err) throw err;
		res.json(response);
	});
});

router.get('/:promoId',function(req,res,next) {
	Promotions.findById(req.params.promoId, function(err,foundPromo){
		if(err) throw err;
		res.json(foundPromo);
	});
}).
put('/:promoId',function(req,res,next) {
	Promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body},{ new: true },
		function(err, updatedPromo){
			if(err) throw err;
			res.json(updatedPromo);
		});
}).
delete('/:promoId',function(req,res,next) {
	 Promotions.remove(req.params.promoId, function(err,response){
	 	if(err) throw err;
	 	res.json(response);
	 });
});

module.exports = router;