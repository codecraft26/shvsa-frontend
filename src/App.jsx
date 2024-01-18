import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SupportAgent from "./components/SupportAgentCreation/SupportAgent";

import CreateTickets from "./components/Ticket/CreateTicket";
import SupportTicketDashBoard from "./components/Ticket/SupportTickerDashBoard"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/creation" element={<SupportAgent />} />
          <Route path="/" element={<SupportTicketDashBoard />} />
          <Route path="/ticket-entry" element={<CreateTickets />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
