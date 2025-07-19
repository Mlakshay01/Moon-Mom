import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import styles from '../styles/Hero.module.css';

export default function Hero() {
  const [hearts, setHearts] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const navigate = useNavigate(); // ✅ Add this

  const handleClick = (e, index, category) => {
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

    if (!clickedButtons.includes(index)) {
      setClickedButtons((prev) => [...prev, index]);
    }

  // ✅ Navigate based on category
     if (category === 'sale') {
    navigate('/sale');
  } else {
    navigate(`/shop?age=${category}`);
  }
  };

  const buttons = [
    { label: 'Shop Boys 👦', style: styles.btnPrimary, category: 'boys' },
    { label: 'Shop Girls 👧', style: styles.btnSecondary, category: 'girls' },
    { label: 'Shop Babies 👶', style: styles.btnAccent, category: 'babies' },
    { label: 'Sale Items 🔥', style: styles.btnWarning, category: 'sale' }, // optional usage
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.bgImages}>
        <div className={styles.bgBoy}></div>
        <div className={styles.bgClothes}></div>
        <div className={styles.bgGirl}></div>
      </div>

      <h1 className={styles.title}>Where Fun Meets Fashion!</h1>
      <p className={styles.subtitle}>
        Discover amazing clothes that make every day an adventure! 🎉
      </p>
      <div className={styles.buttons}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={(e) => handleClick(e, index, btn.category)}
            className={`${styles.btn} ${btn.style} ${
              clickedButtons.includes(index) ? styles.clicked : ''
            }`}
          >
            {btn.label}
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
