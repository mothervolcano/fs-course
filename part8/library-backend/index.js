const config = require("./utils/config");
const jwt = require('jsonwebtoken')

const { GraphQLError } = require("graphql");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// ---------------------------------------------------

const MONGODB_URI = config.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// ---------------------------------------------------

const User = require("./models/user")
const Book = require("./models/book");
const Author = require("./models/author");

// ---------------------------------------------------

const typeDefs = `
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      year: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args) {
        return Book.find({});
      }
      // const byAuthor = args.author ? (book) => book.author === args.author : () => true
      // const byGenre = args.genre ? (book) => book.genres.includes(args.genre) : () => true
      // return books.filter(byAuthor).filter(byGenre)
      return Book.find({});
    },
    allAuthors: async () => Author.find({}),
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root._id })
      return authorBooks.length;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating User Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "abracadabra") {
        throw new GraphQLError("Wrong Credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      
      if ( !context.currentUser ) {
        throw new GraphQLError("No User Logged In")
      }

      const author = new Author({ name: args.author });

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving Author Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving Book Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {

      if ( !context.currentUser ) {
        throw new GraphQLError("No User Logged In")
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.year
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
