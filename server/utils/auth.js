const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh'; // Make sure to keep this secret in an environment variable in production
const expiration = '2h';

module.exports = {
  // Error message for unauthenticated access
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  // Middleware for verifying JWT tokens and attaching the user data to the request
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If authorization header exists, extract the token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token exists, return the request unmodified
    if (!token) {
      return req;
    }

    try {
      // Verify token and attach user data to the request
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token', err); // Log error for better debugging
    }

    // Return the request object to be used by the resolver functions
    return req;
  },

  // Function to sign and create a token for a user
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};