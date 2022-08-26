import { useState } from 'react';
import CardFront from '../Card/CardFront/CardFront';
import CardBack from '../Card/CardBack/CardBack';

import styles from './CardFlipper.module.css'

export default function CardFlipper() {
    const [showBack, setShowBack] = useState(false);

    function flip() {
        setShowBack((prev) => !prev);
    };

    return (
        <div onClick={flip} className={styles.wrapper}>
            <div className={`${styles.card} ${showBack ? styles.flipped : ''}`}>
                <div className={styles.front}><CardFront /></div>
                <div className={styles.back}><CardBack /></div>
            </div>
        </div>
    );
};
