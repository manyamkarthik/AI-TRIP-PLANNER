import React from 'react'
import { Link } from 'react-router-dom';


export const UserTripDetails = ({tripData}) => {
        const { destination, group, duration } = tripData.userSelection;

    const coverImage = tripData?.itinerary?.day1?.places?.[0]?.place_image_url || 
   "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
 

    <Link to={`/view-trip/${tripData.id}`}>
   

    <div className='hover:scale-105 transition-all '>
        <img  className="object-cover rounded-xl" src={coverImage} alt='trip details'  onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

        }}/>
        <div>
            <h2 className='font-bold text-lg mt-3'>{destination}</h2>
            <h2 className='text-sm text-gray-700'>
            🧳 Duration: {duration} day{duration > 1 ? 's' : ''}
            </h2>
            <h2 className='text-sm text-gray-700'>🌍 Travel Style: {group === 'solo' ? '👤 Solo' : '👯 Group Adventure'}</h2>
        </div>
    </div>
    </Link>
   
  )
}
