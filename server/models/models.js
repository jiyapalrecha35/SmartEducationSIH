const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const questionSchema = new Schema({
    examID : String,
    questionID : String,
    questionTitle : String,
    options : Array,
    answer : Number
});

const userExamsSchema = new Schema({
    email : String,
    examID : String,
    correctAnswers : Number,
    wrongAnswers : Number,
    unAttempted : Number
});

const chatsSchema = new Schema({
    room : Number,
    email : String,
    message : String,
    name : String
});

const Chats = new model('chats',chatsSchema);
const question = new model('questions',questionSchema);
const userExams = new model('userexams',userExamsSchema);
const Users = new model('Users',usersSchema);

module.exports = {
    Users,
    question,
    userExams,
    Chats
}