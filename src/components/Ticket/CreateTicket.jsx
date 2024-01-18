// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./CreateTicket.css"; // Make sure to create this CSS file
import Loading from "../Sharable/Loading/Loading";
import { createTicket } from "../../redux/action/ticketAction";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Sharable/Toast/Toast";

import Dialog from "../Sharable/Dioluge/Dioluge";

const CreateTickets = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const ticket = useSelector((state) => state.ticket);
  const { loading, ticketInfo, error } = ticket;

  const validateForm = () => {
    if (!topic.trim()) return "Topic is required.";
    if (!description.trim()) return "Description is required.";
    if (!type.trim()) return "Type is required.";
    if (!severity.trim()) return "Severity is required.";
    return "";
  };

  useEffect(() => {
    if (ticketInfo) {
      setToastMessage("Ticket created successfully!");
      setShowToast(true);

      setIsDialogOpen(true); // Open the dialog
      // Clear the form fields
      setTopic("");
      setDescription("");
      setType("");
      setSeverity("");
      setTimeout(() => setIsDialogOpen(false), 4000);
    } else if (error) {
      setToastMessage(error);
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    }
  }, [error,ticket]);

  const submitHandler = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setToastMessage(validationError);
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    }
    dispatch(createTicket(topic, description, type, severity));
  };

  return (
    <div className="container">
      <div className="form-container">
        <form id="contact-form" onSubmit={submitHandler}>
          {loading && (
            <div className="loading-wrapper">
              <Loading isLoading={loading} />
            </div>
          )}
          <h2>Create Ticket</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
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
          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="ITSG">ITSG</option>
              <option value="HR">HR</option>
              <option value="HDT">HDT</option>
            </select>
          </div>

          <div className="form-group">
            <label>Severity:</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit">Create</button>
        </form>
        {ticketInfo && <Toast message={toastMessage} type="success" />}
      </div>
      {showToast && <Toast message={toastMessage} type="error" />}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h3>Ticket Created Successfully</h3>
        {ticketInfo && (
          <>
            <p>
              <strong>TicketId:</strong> {ticketInfo.ticket._id}
            </p>
            <p>
              <strong>AssignedTo:</strong>
              {ticketInfo.ticket.assignedTo}
            </p>
            <p>
              <strong>Topic:</strong> {ticketInfo.ticket.topic}
            </p>
            <p>
              <strong>Description:</strong> {ticketInfo.ticket.description}
            </p>
            <p>
              <strong>Severity:</strong> {ticketInfo.ticket.severity}
            </p>
            <p>
              <strong>Type:</strong> {ticketInfo.ticket.type}
            </p>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default CreateTickets;
