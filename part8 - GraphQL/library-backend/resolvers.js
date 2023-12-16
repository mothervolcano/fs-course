const config = require('./utils/config')

const { PubSub } = require('graphql-subscriptions')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const byAuthor =
        args.author && args.author !== "" ? { author: args.author } : {};
      const byGenre =
        args.genre && args.genre !== "all genres" && args.genre !== ""
          ? { genres: args.genre }
          : {};

      const filters = { ...byAuthor, ...byGenre };

      return Book.find(filters);
    },
    allAuthors: async () => Author.find({}),
    userBooks: async (root, args, context) => {
      const userGenre = context.currentUser.favoriteGenre;
      return Book.find({ genres: userGenre });
    },
    allGenres: async () => {
      const books = await Book.find({});
      const allGenres = Array.from(new Set(books.flatMap((b) => b.genres)));
      return [...allGenres, "all genres"];
    },
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author);
    },
  },
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root._id });
      return authorBooks.length;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

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
      if (!context.currentUser) {
        throw new GraphQLError("No User Logged In");
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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book;
    },
    editAuthor: async (root, args) => {
      if (!context.currentUser) {
        throw new GraphQLError("No User Logged In");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.year;
      return author.save();
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
};


module.exports = resolvers;

