import React from 'react';
import { useRef } from 'react';
import Card from '../Card/Card';
import IBANValidator from '../IBANValidator/IBANValidator';

const ScrollTo = () => {
    const cardRef = useRef(null);
    const ibanRef = useRef(null);

    const scrollTo = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth'});
    };

  return (
    <div>
        <div style={{display: "flex", gap: "30px"}}>
            <button onClick={() => scrollTo(cardRef)}>Scroll to the card</button>
            <button onClick={() => scrollTo(ibanRef)}>Scroll to the IBAN validator</button>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: "100px", marginTop: "400px"}}>
            <div  ref={cardRef}>
                <Card />
            </div>
            <div ref={ibanRef} style={{marginBottom: "800px"}}>
                <IBANValidator />
            </div>
        </div>
    </div>
  )
}

export default ScrollTo;
