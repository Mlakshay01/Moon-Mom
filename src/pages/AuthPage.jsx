// src/components/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.className = 'sparkle';
        input.parentElement.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
      });
    });
  }, []);

  const toggleForm = (form) => setIsSignup(form === 'signup');

  const togglePassword = (id) => {
    setPasswordVisible(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formType = isSignup ? 'signup' : 'login';
    setFormStatus(formType);

    setTimeout(() => {
      const msg = isSignup ? '🎉 Account Created! Welcome to Rainbow Kids!' : '🎉 Welcome Back! Redirecting to shop...';
      alert(msg);
      setFormStatus('');
    }, 1500);
  };

  const createConfetti = () => {
    const confettiColors = ['🎊', '🎉', '⭐', '🌟', '✨', '🎈'];
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.textContent = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 5000);
    }
  };

  return (
    <>
      <div className="floating-elements">
        <div className="floating-star">⭐</div>
        <div className="floating-star">🌟</div>
        <div className="floating-star">✨</div>
        <div className="floating-star">🎈</div>
      </div>

      <div className="back-to-shop">
        <button className="back-btn" onClick={() => history.back()}>← Back to Shop</button>
      </div>

      <div className="auth-container">
        <div className="logo">Moon & Mom</div>

        <div className="auth-toggle">
          <div className={`toggle-slider ${isSignup ? 'signup' : ''}`} />
          <button className={`toggle-btn ${!isSignup ? 'active' : ''}`} onClick={() => toggleForm('login')}>Login 🔐</button>
          <button className={`toggle-btn ${isSignup ? 'active' : ''}`} onClick={() => toggleForm('signup')}>Sign Up 🌟</button>
        </div>

        {!isSignup ? (
          <div className="form-animation">
            <div className="welcome-message">
              <h2>Welcome Back! 👋</h2>
              <p>Ready for more shopping fun?</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address 📧</label>
                <input type="email" required />
                <div className="input-icon">📧</div>
              </div>
              <div className="form-group">
                <label>Password 🔒</label>
                <input
                  type={passwordVisible.login ? 'text' : 'password'}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => togglePassword('login')}>
                  {passwordVisible.login ? '🙈' : '👁️'}
                </button>
              </div>
              <button type="submit" className="btn btn-primary">
                {formStatus === 'login' ? 'Logging in... 🔄' : 'Login & Start Shopping! 🛍️'}
              </button>
            </form>
            <div className="forgot-password">
              <a href="#">Forgot Password? 🤔</a>
            </div>
            <div className="social-divider">Or continue with</div>
            <div className="social-buttons">
              <button className="social-btn google-btn">G</button>
              <button className="social-btn facebook-btn">f</button>
              <button className="social-btn apple-btn">🍎</button>
            </div>
          </div>
        ) : (
          <div className="form-animation">
            <div className="welcome-message">
              <h2>Join Our Family! 🎉</h2>
              <p>Let's create your account!</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name 👋</label>
                <input type="text" required />
                <div className="input-icon">👋</div>
              </div>
              <div className="form-group">
                <label>Email Address 📧</label>
                <input type="email" required />
                <div className="input-icon">📧</div>
              </div>
              <div className="form-group">
                <label>Create Password 🔒</label>
                <input
                  type={passwordVisible.signup ? 'text' : 'password'}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => togglePassword('signup')}>
                  {passwordVisible.signup ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="form-group">
                <label>Confirm Password 🔒</label>
                <input
                  type={passwordVisible.confirm ? 'text' : 'password'}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => togglePassword('confirm')}>
                  {passwordVisible.confirm ? '🙈' : '👁️'}
                </button>
              </div>
              <button type="submit" className="btn btn-success">
                {formStatus === 'signup' ? 'Creating Account... 🔄' : 'Create Account & Start Shopping! 🎊'}
              </button>
            </form>
            <div className="social-divider">Or sign up with</div>
            <div className="social-buttons">
              <button className="social-btn google-btn">G</button>
              <button className="social-btn facebook-btn">f</button>
              <button className="social-btn apple-btn">🍎</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthPage;
