import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LISTINGS } from "../utils/queries";
import { Link } from "react-router-dom";
import { loggedIn } from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_LISTING } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ALL_USERS } from "../utils/queries";
import { QUERY_ALL_LISTINGS } from "../utils/queries";

const Listings = () => {

    const { loading, data } = useQuery(QUERY_LISTINGS);
    const listings = data?.listings || [];
    const { loading: loading2, data: data2 } = useQuery(QUERY_ME);
    const me = data2?.me || {};
    const { loading: loading3, data: data3 } = useQuery(QUERY_ALL_USERS);
    const allUsers = data3?.allUsers || [];
    const { loading: loading4, data: data4 } = useQuery(QUERY_ALL_LISTINGS);
    const allListings = data4?.allListings || [];

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        contact: "",
        image: "",
    });

    const [addListing, { error }] = useMutation(ADD_LISTING, {
        update(cache, { data: { addListing } }) {
            try {
                const { listings } = cache.readQuery({ query: QUERY_LISTINGS });
                cache.writeQuery({
                    query: QUERY_LISTINGS,
                    data: { listings: [addListing, ...listings] },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await addListing({
                variables: { ...formState },
            });
            console.log(data);
            window.location.assign("/listings");
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
        console.log(formState);
    };

    return (
        // map over listings data and display each listing in a card format
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Listings</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card-columns">
                        {listings.map((listing) => (
                            <div className="card" key={listing._id}>
                                <img
                                    src={listing.image}
                                    className="card-img-top"
                                    alt={listing.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{listing.title}</h5>
                                    <p className="card-text">{listing.description}</p>
                                    <p className="card-text">{listing.price}</p>
                                    <p className="card-text">{listing.location}</p>
                                    <p className="card-text">{listing.contact}</p>
                                    <p className="card-text">{listing.image}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Add Listing</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                placeholder="Title"
                                name="title"
                                type="title"
                                id="title"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                placeholder="Description"
                                name="description"
                                type="description"
                                id="description"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                placeholder="Price"
                                name="price"
                                type="price"
                                id="price"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                                placeholder="Location"
                                name="location"
                                type="location"
                                id="location"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact:</label>
                            <input
                                placeholder="Contact"
                                name="contact"
                                type="contact"
                                id="contact"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input
                                placeholder="Image"
                                name="image"
                                type="image"
                                id="image"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-lg btn-primary btn-block"
                                type="submit"
                            >
                                Add Listing
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Listings;
