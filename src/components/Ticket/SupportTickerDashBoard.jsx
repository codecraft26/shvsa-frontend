// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../redux/action/ticketAction";
import "./SupportTickerDashBoard.css";
import ReactPaginate from "react-paginate";
import Loading from "../Loading/Loading";
const SupportTicket = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(""); // State to track the sorting order
  const [severityFilter, setSeverityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");

  const [typeFilter,setTypeFilter]=useState("")
  const dispatch = useDispatch();

  const { loading, error, tickets, pagination } = useSelector(
    (state) => state.ticketList
  );
  const totalPages = Math.ceil(
    pagination.totalCount / pagination.resultPerPage
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    dispatch(
      getTickets({
        page: currentPage,
        sort: sortOrder,
        severity: severityFilter,
        status: statusFilter,
        type:typeFilter
      })
    );
  }, [dispatch, currentPage, sortOrder, severityFilter,statusFilter,typeFilter]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSortOrder = () => {
    // Toggle between 'dateCreated' and '-dateCreated'
    setSortOrder(sortOrder === "dateCreated" ? "-dateCreated" : "dateCreated");
  };
  const renderSortArrow = () => {
    if (sortOrder === "dateCreated") {
      return "↑"; // Up arrow for ascending
    } else if (sortOrder === "-dateCreated") {
      return "↓"; // Down arrow for descending
    }
    return ""; // No arrow if not sorted
  };

  const handleSeverityChange = (event) => {
    setSeverityFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  const handleStatusChange=(event)=>{
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  }

  const handleTypeChange=(event)=>{
    setTypeFilter(event.target.value);
    setCurrentPage(1);
  }


  return (
    <div className="table-container">
      {loading ? (
        <div className="loading-container">
          <Loading isLoading={loading} />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Topic</th>
                <th>Description</th>
                <th>Assigned To</th>
                <th onClick={() => handleStatusChange}>
                  Status
                  <div>
                    <select
                      value={statusFilter}
                      onChange={handleStatusChange}
                    >
                      <option value="">All</option>
                      <option value="Assigned">Assigned</option>
                      <option value="New">New</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </th>
                <th onClick={() => handleSeverityChange("")}>
                  Severity{" "}
                  <div>
                    <select
                      value={severityFilter}
                      onChange={handleSeverityChange}
                    >
                      <option value="">All </option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </th>
                <th onClick={toggleSortOrder}>
                  Date Created {renderSortArrow()}
                </th>

                <th onClick={()=>handleTypeChange("")}>
                  Type{" "}
                  <div>
                    <select
                      value={typeFilter}
                      onChange={handleTypeChange}
                    >
                      <option value="">All </option>
                      <option value="ITSG">ITSG</option>
                      <option value="HR">HR</option>
                      <option value="HDT">HDT</option>
                    </select>
                  </div>



                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td data-label="ID">{ticket._id}</td>
                  <td data-label="Topic">{ticket.topic}</td>
                  <td data-label="Description">{ticket.description}</td>
                  <td data-label="Assigned To">{ticket.assignedTo}</td>
                  <td data-label="Status">{ticket.status}</td>
                  <td data-label="Severity">{ticket.severity}</td>
                  <td data-label="Date Created">
                    {new Date(ticket.dateCreated).toLocaleString()}
                  </td>

                  <td data-label="Type">{ticket.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => handlePageChange(data.selected + 1)}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={isFirstPage ? "hide" : ""}
            nextClassName={isLastPage ? "hide" : ""}
            forcePage={currentPage - 1} // Subtract 1 because ReactPaginate is zero-based
          />
        </div>
      )}
    </div>
  );
};

export default SupportTicket;
