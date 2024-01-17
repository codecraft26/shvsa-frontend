import {useState,useEffect} from 'react';

import {createAgent} from '../../redux/action/agentActions'
import './supportAgent.css'; // Make sure to create this CSS file
import { useDispatch,useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import Toast from '../Toast/Toast';
import { useNavigate } from 'react-router-dom';

const SupportAgent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false); // State to control the visibility of the toast
  const [toastMessage, setToastMessage] = useState(''); // State to set the toast message

  const dispatch = useDispatch();


  const agent = useSelector(state => state.agent);
  const { loading, success, error } = agent;
  const validateForm = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!phone.trim()) return "Phone number is required.";
    if (!description.trim()) return "Description is required.";
    return "";
  };
  useEffect(() => {
    if (success) {
      setToastMessage('Agent created successfully!');
      setShowToast(true);
      setTimeout(() => {
        navigate('/');
      }, 3000); // Navigate after 3 seconds
    } else if (error) {
      setToastMessage(error);
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    }
  }, [error, success, navigate]);



  const submitHandler = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setToastMessage(validationError);
     
      setShowToast(false);
    setTimeout(() => setShowToast(true), 0);

    }
    dispatch(createAgent(name, email, phone, description));


  };

    return (

      <div className="container">
      <div className="form-container">
    <form id="contact-form" onSubmit={submitHandler}>
    {loading && <Loading isLoading={loading}/>}
      <h2>Create Support Agent</h2>
      <div className="form-group">
        <label >Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
      <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
      <label>Phone:</label>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
      <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
    {success && <Toast message={toastMessage} type="success" />}
  </div>

  {showToast && <Toast message={toastMessage} type="error" />}


  </div>
    );
};

export default SupportAgent;
