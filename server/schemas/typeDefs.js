const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    followers: [User]
    listings: [Listing]
    listingIsTaken(_id: ID!): Boolean
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFollower(username: String!): User
    addListing(
      title: String!
      description: String!
      price: Float!
      image: String!
      location: String!
    ): Listing
    removeListing(_id: ID!): Listing
  }

  type Listing {
    _id: ID
    title: String
    description: String
    price: Float
    image: String
    location: String
    createdAt: String
    username: String
  }

  type Query {
    listings: [Listing]
    listing(_id: ID!): Listing
  }

  type Mutation {
    addListing(
      title: String!
      description: String!
      price: Float!
      image: String!
      location: String!
    ): Listing
    updateListing(
      _id: ID!
      title: String!
      description: String!
      price: Float!
      image: String!
      location: String!
    ): Listing
    removeListing(_id: ID!): Listing
  }

  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    createdAt: String
  }

  type Query {
    reviews: [Review]
    review(_id: ID!): Review
  }

  type Mutation {
    addReview(reviewText: String!, reviewAuthor: String!): Review
    updateReview(_id: ID!, reviewText: String!): Review
    removeReview(_id: ID!): Review
  }


`;

module.exports = typeDefs;
