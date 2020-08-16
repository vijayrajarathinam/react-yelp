import React, { useState, useEffect, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating';

function Home() {

    const { restaurants, setRestaurants } = useContext(RestaurantContext);
    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("Price Range");
    let history = useHistory();


    const addRestaurant = restaurant => setRestaurants([restaurant,...restaurants]);
    
    const handleUpdate = (e, id) => { 
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }

    const handleDetail = id => history.push(`/restaurants/${id}`);    

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await RestaurantFinder
            .post("/", {
                name,  location,
                price_range : priceRange
            });
        
        addRestaurant(response.data.data.restaurants);
    }


    const handleDelete = async (e, id) => {
        e.stopPropagation();
        const response = await RestaurantFinder.delete(`/${id}`)        
        
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    }

    useEffect(()=>{

        const fetchData = async () =>{
            const response = await RestaurantFinder.get("/");    
            setRestaurants(response.data.data.restaurants);
        };
        
        fetchData();
    },[]);

    
    return (
        <div className="container">
            <h1 className="font-weight-light display-1 text-center" >Restaurant Finder</h1>
            <div className="mb-4">
            <form className="">
                <div className="form-row">
                    <div className="col">
                        <input type="text" value={name}
                            className="form-control" 
                            placeholder="Name"
                            onChange={e => setName(e.target.value)}
                            />
                    </div>
                    <div className="col">
                        <input type="text" value={location}
                            className="form-control" 
                            placeholder="Location"
                            onChange={e=> setLocation(e.target.value)}
                            />
                    </div>
                    <div className="col">
                        <select name="" className="custom-select " 
                            value={priceRange}
                            onChange = {e=>setPriceRange(e.target.value)}
                            >
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Add</button>

                </div>

            </form>
            </div>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col"> Restaurant </th>
                            <th scope="col"> Location </th>
                            <th scope="col"> Price Range </th>
                            <th scope="col"> Rating </th>
                            <th scope="col"> Edit </th>
                            <th scope="col"> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants && restaurants.map(restaurant => {
                            return(
                            <tr key={restaurant.id} onClick={e => handleDetail(restaurant.id)}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td><StarRating rating={restaurant.rating}/></td>
                                <td>
                                    <button className="btn btn-warning" onClick={e => handleUpdate(e, restaurant.id)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={e => handleDelete(e, restaurant.id)}>Delete</button>
                                </td>
                            </tr>
                        )})}
                        
                        { !restaurants && <tr> <td colSpan="6" style={{textAlign:"center"}}> No data entries</td> </tr> }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
