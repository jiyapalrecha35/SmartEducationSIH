const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users, question, userExams } = require('../models/models');

function generateAccessToken({ username, email }){
    return jwt.sign({
        username,
        email
    },'mySecretkey',{
        expiresIn : '24h'
    })
}

async function signUp(req,res){
    const { username, email, password } = req.body;
    bcrypt.hash(password,4, async function(err, hash){
        const user = new Users({
            name : username,
            email : email,
            password : hash
        });
        try {
            await user.save();
            const token = generateAccessToken(username,email);
            res.append('Access-Control-Expose-Headers','*');
            res.append('token',token);
            res.status(200).json({
                displayName : username,
                email : email
            });

        } catch (error){
            if(err.code === 11000){
                res.status(400).json('User with this email already exists');
            } else {
                res.status(500).json('Could not sign up');
            }
        }
    })
}

async function logIn(req,res){
    const { email, password } = req.body;
    try {
        const queryResult = await Users.findOne({ email },{
            _id : 0,
            password : 1,
            name : 1
        });
        bcrypt.compare(password, queryResult.password, function (err, result){
            if(result){
                const token = generateAccessToken({username : queryResult.name, email:email});
                
                res.append('Access-Control-Expose-Headers','*');
                res.append('token',token);
                res.status(200).json({
                    displayName : queryResult.name,
                    email : email
                });
            } else {
                res.status(400).json('Enter the correct password');
            }
        })
    } catch (error){
        res.status(400).json('User does not exist! Try signing up');
    }
}

async function verify(req,res){
    const authHeader = req.headers;
    if (authHeader) {
        const token = authHeader.token;
        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            res.status(200).json({
                name : user.username,
                email : user.email
            });
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
}

async function getQuestions(req,res){
    const params = req.params;
    try {
        const result = await question.find({examID : params.examID});
        res.send(result);
    } catch (error){
        res.status(400).json({
            'message' : 'Questions not found'
        })
    }
}

async function submitExam(req,res){
    try {
        const response = await question.find({examID : req.params.examID});
        let correct = 0, wrong = 0;
        for(let i=0;i<req.body.answers.length; i=i+1){
            try {
                const res = await question.find({
                    examID : req.params.examID, 
                    questionID : req.body.answers[i].questionId
                },{
                    _id : 0,
                    answer : 1
                });
                if(res[0].answer == req.body.answers[i].optedChoice){
                    ++correct;
                } else {
                    ++wrong;
                }
            } catch(err) {
                console.log(err);
            }
        }
        const result = new userExams({
            email : req.body.email,
            examID : req.params.examID,
            correctAnswers : correct,
            wrongAnswers : wrong,
            unAttempted : response.length - correct - wrong
        });
        try {
            await result.save();
            res.json({
                correct : correct,
                wrong : wrong,
                unAttempted : response.length - correct - wrong
            });
        } catch (err){
            console.log(err);
            res.status(500).json('Not OK');
        }
    } catch (err){
        console.log(err);
        res.status(500).json('Not OK');
    }
}

module.exports = {
    logIn,
    signUp,
    verify,
    getQuestions,
    submitExam
}