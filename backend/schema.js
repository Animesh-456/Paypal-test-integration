import mongoose, { mongo } from 'mongoose';
//import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const randomdataSchema = mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number

});



// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, 'user');
// we need to turn it into a model
// const postUser = mongoose.model('user', userSchema);

// export default postUser;
export const RandomData = new mongoose.model("randomdata", randomdataSchema);