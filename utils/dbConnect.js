import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    
    mongoose
    .connect(`${process.env.DB_LINK}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected");
        connection.isConnected = true;
    })
    .catch((err) => {
        console.log("Database Error");
        console.log(err.message);
        connection.isConnected = false;
    });


}

export default dbConnect;
