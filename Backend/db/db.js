import mongoose from 'mongoose';

function connectToDb() {
  mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to database");
    })
    .catch(err => {
      console.error("Error connecting to the database:", err);
    });
}

export default connectToDb;
