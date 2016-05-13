var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	rating: { type: Number, min: 1 , max: 5, required: true },
	comment: { type: String, required: true },
	author: { type: String, required:true }
}, { timestamps: true });

var dishSchema = new Schema({
  
  name: { 
  	type: String,
    required: true,
    unique: true,      
   },
   description: {
   	type: String,
   	required: true,
   },
   image: {
   	type: String,
   	required: true
   },
   category: {
    type: String,
   	required: true
   },
   label: {
    type: String,
   	default: ''
   },
   price: {
    amount: { type: Number, required: true },
    currency: {
         type: String,
         required:true,
         enum:['INR','USD','CNY']
    }
   },
   comments: [commentSchema]
},{ timestamps:true },{
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

var CurrenySymbols = {
	'INR': 'Rs.',
	'USD': '$',
	'CNY': 'Y'
};

dishSchema.virtual('displayPrice').get(function(){
	return CurrenySymbols[this.price.currency]+' '+this.price.amount;
});

dishSchema.virtual('displayAmount').get(function(){
	return this.price.amount;
});

module.exports = mongoose.model('Dishes',dishSchema);