import React, { useState , useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams, useHistory ,useLocation } from 'react-router-dom';

function AddReview() {

    const [name, setName] = useState("");
    const [rating, setRating] = useState("Rating");
    const [review, setReview] = useState("");
    
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    

    const handleSubmit  = async e =>{
         e.preventDefault();
         const response = await RestaurantFinder.post(`/${id}/reviews`,{ name, rating, review }) ;
        //  console.log(response) ;
        history.push("/");
        history.push(location);
    }

    return (
        <div className="mb-2">
            <form>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input id="name" placeholder="name" type="text" className="form-control"
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select name="" id="" className="custom-select" value={rating} onChange={e => setRating(e.target.value)}>
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Reviews</label>
                    <textarea id="review" className="form-control" onChange={e=> setReview(e.target.value)} defaultValue={review}></textarea>
                </div>
                <button className="btn btn-primary" onClick={e => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default AddReview
