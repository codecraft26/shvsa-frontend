import React, { useState, useEffect } from 'react';
import './Toast.css'; // Importing the CSS for styling

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
