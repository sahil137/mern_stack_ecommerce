import mongoose from 'mongoose';

const connectToDatabase = () => {
  mongoose
    .connect(process.env.CONNECTION_URI_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database :: MongoDB');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDatabase;
