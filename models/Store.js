const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
      type : String,
      trim : true,
      required : 'Please enter a store name'
    },
    slug : String,
    tags : [String],
    descriptions : {
        type : String,
        trim : true
    }

});


storeSchema.pre('save', function (next) {
    if (!this.isModified('name')){
        next(); // skip it
        return; // stops this function from running
    }
    this.slug = slug(this.name);
    next();
    // TODOS make more resilant
});

module.exports = mongoose.model('Store', storeSchema);