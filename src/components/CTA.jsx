import { useState } from 'react';
import styles from '../styles/CTA.module.css';

export default function CTA() {
  const [hearts, setHearts] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]); // Store all clicked buttons

  const handleClick = (e, index) => {
    // Heart animation
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);

    // Stop animation for this button if not already stopped
    if (!clickedButtons.includes(index)) {
      setClickedButtons((prev) => [...prev, index]);
    }
  };

  const buttonList = [
    { text: 'START SHOPPING', style: styles.btnWarning },
    { text: 'VIEW CATALOG', style: styles.btnPrimary },
    { text: 'SIGN UP', style: styles.btnSecondary },
    { text: 'GET DEALS', style: styles.btnSuccess },
  ];

  return (
    <section className={styles.cta}>
      <h2 className={styles.title}>Ready to Shop? 🛍️</h2>
      <p className={styles.subtitle}>Join thousands of happy families who trust Moon & Mom!</p>

      <div className={styles.buttons}>
        {buttonList.map((btn, index) => (
          <button
            key={index}
            onClick={(e) => handleClick(e, index)}
            className={`${styles.btn} ${btn.style} ${clickedButtons.includes(index) ? styles.clicked : ''}`}
          >
            {btn.text}
          </button>
        ))}
      </div>

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={styles.heart}
          style={{ left: `${heart.x}px`, top: `${heart.y}px` }}
        >
          ❤️
        </div>
      ))}
    </section>
  );
}
