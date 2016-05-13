var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
    name: { type: String, required: true },
	image: { type: String, required: true },
	label: { type: String, default: '' },
	price: {
    amount: { type: Number, required: true },
    currency: {
         type: String,
         required:true,
         enum:['INR','USD','CNY']
    }
   },
	description: { type: String, required: true }
});

var CurrencySymbols = {
	'INR': 'Rs.',
	'USD': '$',
	'CNY': 'Y'
};

promotionSchema.virtual('displayPrice').get(function(){
	return CurrencySymbols[this.price.currency] + ' ' + this.price.amount; 
});
promotionSchema.virtual('displayAmount').get(function(){
	return this.price.amount; 
});

exports = mongoose.model('Promotion',promotionSchema);