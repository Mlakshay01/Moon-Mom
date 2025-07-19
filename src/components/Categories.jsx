import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Categories.module.css';

function CategoryCard({ img, title, btnClass, bgClass, categoryKey }) {
  const [showSparkle, setShowSparkle] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?cat=${categoryKey}`);
  };

  return (
    <div
      className={`${styles.card} ${styles[bgClass]}`}
      onMouseEnter={() => setShowSparkle(true)}
      onMouseLeave={() => setShowSparkle(false)}
    >
      <img src={img} alt={title} className={styles.iconImage} />
      <h3>{title}</h3>
      <button className={`${styles.btn} ${styles[btnClass]}`} onClick={handleClick}>
        Explore
      </button>
      {showSparkle && <div className={styles.sparkle}>✨</div>}
    </div>
  );
}

export default function Categories() {
  const categories = [
    { img: '/categories/tshirt.jpg', title: 'T-Shirts & Tops', btnClass: 'btnPrimary', bgClass: 'bgTops', categoryKey: 'tops' },
    { img: '/categories/jeans.jpg', title: 'Pants & Jeans', btnClass: 'btnSecondary', bgClass: 'bgJeans', categoryKey: 'bottoms' },
    { img: '/categories/dress and skirt.jpg', title: 'Dresses & Skirts', btnClass: 'btnAccent', bgClass: 'bgDress', categoryKey: 'dresses' },
    { img: '/categories/shoes.jpg', title: 'Shoes & Sneakers', btnClass: 'btnSuccess', bgClass: 'bgShoes', categoryKey: 'shoes' },
    { img: '/categories/jacket.jpg', title: 'Jackets & Coats', btnClass: 'btnWarning', bgClass: 'bgJacket', categoryKey: 'accessories' },
    { img: '/categories/babies.jpg', title: 'Babies Clothing', btnClass: 'btnPrimary', bgClass: 'bgBaby', categoryKey: 'babies' }
  ];

  return (
    <section className={styles.categories}>
      {categories.map((cat, index) => (
        <CategoryCard
          key={index}
          img={cat.img}
          title={cat.title}
          btnClass={cat.btnClass}
          bgClass={cat.bgClass}
          categoryKey={cat.categoryKey}
        />
      ))}
    </section>
  );
}
