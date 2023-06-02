import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  `;

export const ADD_LISTING = gql`
    mutation addListing(
      $title: String!
      $description: String!
      $price: Float!
      $image: String!
      $location: String!
    ) {
      addListing(
        title: $title
        description: $description
        price: $price
        image: $image
        location: $location
      ) {
        _id
        title
        description
        price
        image
        location
        createdAt
        username
      }
    }
`;

export const UPDATE_LISTING = gql`
  mutation updateListing(
    $_id: ID!
    $title: String!
    $description: String!
    $price: Float!
    $image: String!
    $location: String!
  ) {
    updateListing(
      _id: $_id
      title: $title
      description: $description
      price: $price
      image: $image
      location: $location
    ) {
      _id
      title
      description
      price
      image
      location
      createdAt
      username
    }
  }
`;

export const REMOVE_LISTING = gql`
  mutation removeListing($_id: ID!) {
    removeListing(_id: $_id) {
      _id
      title
      description
      price
      image
      location
      createdAt
      username
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($listingId: ID!, $reviewText: String!) {
    addReview(listingId: $listingId, reviewText: $reviewText) {
      _id
      reviewCount
      reviews {
        _id
        reviewText
        createdAt
        username
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($listingId: ID!, $reviewId: ID!) {
    removeReview(listingId: $listingId, reviewId: $reviewId) {
      _id
      reviewCount
      reviews {
        _id
        reviewText
        createdAt
        username
      }
    }
  }
`;

