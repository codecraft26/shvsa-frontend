import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../redux/action/ticketAction'
import './SupportTickerDashBoard.css'
const SupportTicket = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector(state => state.ticketList);
  const { loading, error, tickets } = ticketList;

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <div className="table-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Topic</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Severity</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td data-label="ID">{ticket._id}</td>
                <td data-label="Topic">{ticket.topic}</td>
                <td data-label="Description">{ticket.description}</td>
                <td data-label="Assigned To">{ticket.assignedTo}</td>
                <td data-label="Severity">{ticket.severity}</td>
                <td data-label="Date Created">{new Date(ticket.dateCreated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )

};

export default SupportTicket;
