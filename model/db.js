const mongoose = require('mongoose');
//const dotenv = require('dotenv');
//process.env.DB_CONNECT
//dotenv.config();
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Adevon',{useNewUrlParser: true});
mongoose.connection.on('connected', ()=> console.log('Connected to Database... '));
mongoose.connection.on('error', (err)=>console.log('Database connections Error: '+err));
mongoose.connection.on('disconnected',()=>console.log('Connection to Database Disconnected!'));
process.on('SIGINT', ()=> mongoose.connection.close(()=>{
    console.log('Mongoose disconnected through App Termination');
    process.exit(0);
}));

// Contact schema
const contactSchema = new mongoose.Schema({
    firstName:{type: String,required: true},
    lastName:{type: String,required: true},
    phone: String,
    email:{ type: String,required: true},
    message:{type: String,required: [true, 'Message field is required!']}
});
const contactDB = mongoose.model('constact', contactSchema);
module.exports.contactDB = contactDB;   
