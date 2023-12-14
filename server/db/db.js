const { connect } = require('mongoose');

async function connectToDB(URL){
    try {
        await connect(URL);
    } catch (error){
        console.log("Couldn't connect to database... Exiting the process");
        process.exit(1);
    }
}

module.exports = {
    connectToDB
}