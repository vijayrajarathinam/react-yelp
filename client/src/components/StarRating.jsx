import React from 'react'

function StarRating({rating}) {
    const star = [];
    
    for (let i = 1; i <= 5; i++) {
        if(i<=rating){
            star.push(<i key={i} className="fa fa-star text-warning"></i>);       
        }else if(i=== Math.ceil(rating) && !Number.isInteger(rating)){
            star.push(<i key={i} className="fa fa-star-half-o text-warning"></i>);
        }else{
            star.push(<i key={i} className="fa fa-star-o text-warning"></i>);       
        }
        
    }
    
    return <>{star}</>
    
}

export default StarRating
