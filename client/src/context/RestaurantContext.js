import React, { useState, createContext } from 'react'

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
    
    const [ restaurants, setRestaurants ] = useState([]);

    const [ selectedRestaurants, setSelectedRestaurants ] = useState(null);
    
    return (
        <RestaurantContext.Provider value={{ restaurants, setRestaurants, selectedRestaurants, setSelectedRestaurants }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}