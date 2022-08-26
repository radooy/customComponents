import React from 'react';
import CardBack from './CardBack/CardBack';
import CardFront from './CardFront/CardFront'

const Card = () => {
  return (
    <div style={{display: "flex", flexDirection:"column"}}>
        <CardFront />
        <CardBack />
    </div>
  )
}

export default Card