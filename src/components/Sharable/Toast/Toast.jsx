// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Toast.css'; // Importing the CSS for styling

// eslint-disable-next-line react/prop-types
const Toast = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};

export default Toast;
