import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if we already have a connection
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Drop stale username index if it exists (legacy cleanup)
    try {
      const usersCollection = conn.connection.db.collection('users');
      const indexes = await usersCollection.indexes();
      const hasUsernameIndex = indexes.some(idx => idx.name === 'username_1');
      if (hasUsernameIndex) {
        await usersCollection.dropIndex('username_1');
        console.log('Dropped stale username_1 index from users collection');
      }
    } catch (indexErr) {
      // Index might not exist or already dropped, ignore
      console.log('Index cleanup check:', indexErr.message);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Do NOT exit process in serverless environment
    // process.exit(1); 
  }
};

export default connectDB;
