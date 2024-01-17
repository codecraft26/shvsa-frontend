// eslint-disable-next-line react/prop-types
const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="dialog-overlay">
        <div className="dialog">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };


  export default Dialog;