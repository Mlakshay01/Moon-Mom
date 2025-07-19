import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import accountStyles from '../styles/Account.module.css';

export default function Account() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear auth (optional, based on your app)
    localStorage.removeItem('authToken'); // example
    sessionStorage.clear(); // if you're using session storage

    // Redirect to /auth
    navigate('/auth');
  };

  return (
    <main className={accountStyles.accountPage}>
      <Header />
      <section className={`container ${accountStyles.accountContainer}`}>
        <div className={accountStyles.accountHeader}>
          <h1>👤 My Account</h1>
          <p>Welcome back, Lakshmi! Here’s your dashboard.</p>
        </div>

        <div className={accountStyles.sectionsWrapper}>
          {/* Profile Info */}
          <div className={accountStyles.card}>
            <h2>📋 Profile Information</h2>
            <p><strong>Name:</strong> Lakshmi Sharma</p>
            <p><strong>Email:</strong> lakshmi@example.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
          </div>

          {/* Order History */}
          <div className={accountStyles.card}>
            <h2>📦 Recent Orders</h2>
            <ul>
              <li>#1001 - Rainbow Dress - ₹799 - <span className={accountStyles.statusDelivered}>Delivered</span></li>
              <li>#1002 - Unicorn Hoodie - ₹999 - <span className={accountStyles.statusShipped}>Shipped</span></li>
              <li>#1003 - Star Shorts - ₹499 - <span className={accountStyles.statusProcessing}>Processing</span></li>
            </ul>
          </div>

          {/* Address Book */}
          <div className={accountStyles.card}>
            <h2>🏠 Shipping Address</h2>
            <p>
              Lakshmi Sharma<br />
              123, Rainbow Street<br />
              Mumbai, Maharashtra - 400001<br />
              India
            </p>
            <button className={accountStyles.editBtn}>✏️ Edit Address</button>
          </div>

          {/* Actions */}
          <div className={accountStyles.card}>
            <h2>⚙️ Account Settings</h2>
            <button className={accountStyles.secondaryBtn}>Change Password</button>
            <button className={accountStyles.secondaryBtn}>Manage Payment Methods</button>
            <button className={accountStyles.dangerBtn} onClick={handleSignOut}>🚪 Sign Out</button>
          </div>
        </div>
      </section>
    </main>
  );
}
