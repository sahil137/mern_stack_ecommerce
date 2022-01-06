import mongoose from 'mongoose';

const connectToDatabase = () => {
  mongoose
    .connect(process.env.CONNECTION_URI_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database :: MongoDB');
    });
};

export default connectToDatabase;
