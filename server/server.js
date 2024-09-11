const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const multer = require('multer'); // Added multer for file uploads
const User = require('./models/User'); // Make sure you have your User model

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Configure multer to store files in the "uploads" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify where to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage: storage }); // Create multer instance for file uploads

// File upload route for profile photo
app.post('/api/user/uploadPhoto', upload.single('profilePhoto'), async (req, res) => {
  const userId = req.body.userId;
  const profilePhotoPath = req.file.path; // Get the file path of the uploaded photo

  try {
    // Update the user's profile photo in the database
    await User.findByIdAndUpdate(userId, { profilePhoto: profilePhotoPath });
    res.status(200).json({ message: 'Profile photo uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload profile photo.' });
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', 
    expressMiddleware(server, {
      context: authMiddleware,  // Attach auth middleware to context
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();