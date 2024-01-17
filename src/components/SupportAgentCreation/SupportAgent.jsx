import { useState, useEffect } from "react";

import { createAgent } from "../../redux/action/agentActions";
import "./supportAgent.css"; // Make sure to create this CSS file
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Toast from "../Toast/Toast";

import Dialog from "../Dioluge/Dioluge";
const SupportAgent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false); // State to control the visibility of the toast
  const [toastMessage, setToastMessage] = useState(""); // State to set the toast message
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const agent = useSelector((state) => state.agent);
  const { loading, agentInfo, error } = agent;
  const validateForm = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!phone.trim()) return "Phone number is required.";
    if (!description.trim()) return "Description is required.";
    return "";
  };
  useEffect(() => {
    if (agentInfo) {
      setToastMessage("Agent created successfully!");
      setShowToast(true);
      setIsDialogOpen(true);

      // Clear the form fields
      setName("");
      setEmail("");
      setPhone("");
      setDescription("");
    } else if (error) {
      setToastMessage(error);
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);

      setTimeout(() => setIsDialogOpen(false), 5000);
    }
  }, [error, agentInfo]);

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
          {loading && <Loading isLoading={loading} />}
          <h2>Create Support Agent</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>

      {showToast && <Toast message={toastMessage} type="error" />}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h3>Ticket Created Successfully</h3>
        {agentInfo && (
          <>
            <p>
              <strong>Name:</strong> {agentInfo.data.name}
            </p>
            <p>
              <strong>Email:</strong> {agentInfo.data.email}
            </p>
            <p>
              <strong>Active:</strong> {agentInfo.data.active}
            </p>
            <p>
              <strong>Description:</strong> {agentInfo.data.description}
            </p>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default SupportAgent;
