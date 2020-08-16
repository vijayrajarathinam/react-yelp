import React , { useState , useEffect } from 'react'
import { useParams , useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

function Update() {

    const {id} = useParams();
    const history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            const res = await RestaurantFinder.get(`/${id}`);
            console.log(res);
            setName(res.data.data.restaurants.name);
            setLocation(res.data.data.restaurants.location);
            setPriceRange(res.data.data.restaurants.price_range);
        }
        fetchData();
    },[]);

    const handleSubmit = async e => {
        e.preventDefault();
        const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
            name, location,
            price_range : priceRange
        });

        history.push("/");
    }

    return (
        <div className="container">
            <h1 className="font-weight-light display-1 text-center" >Update Restaurant</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input className="form-control" id="location" type="text" value={location} onChange={e => setLocation(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input className="form-control" id="price_range" type="text" value={priceRange} onChange={e => setPriceRange(e.target.value)}/>
                </div>
                <button className="btn btn-primary" onClick={e => handleSubmit(e)}>Save</button>
            </form>        
        </div>
    )
}

export default Update
