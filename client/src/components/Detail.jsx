import React , { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from './Reviews';
import AddReview from './AddReview';

function Detail() {
    const { id } = useParams();
    const {selectedRestaurants, setSelectedRestaurants} = useContext(RestaurantContext);

    useEffect(()=>{
        const fetchData = async () =>{
            const resp = await RestaurantFinder.get(`/${id}`);
            console.log(resp.data.data);
            setSelectedRestaurants(resp.data.data);                                                  
        }

        fetchData();
        // console.log(selectedRestaurants);
    },[]);

    return <div className="container">
        {selectedRestaurants && (
            <>
            <h1 className="font-weight-light display-1 text-center" >{selectedRestaurants.restaurants && selectedRestaurants.restaurants.name}</h1>
            <div className="mt-3">
                <Reviews reviews={selectedRestaurants.reviews}/>
                <AddReview/>
            </div>
            </>
        )}
    </div>
    
}

export default Detail
