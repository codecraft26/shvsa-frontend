import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SupportAgent from "./components/SupportAgentCreation/SupportAgent";
import SupportTicket from "./components/Ticket/SupportTickerDashBoard";
import CreateTicket from "./components/Ticket/CreateTicket";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/creation" element={<SupportAgent />} />
          <Route path="/" element={<SupportTicket/>} />

          <Route path="/ticket-entry" element={<CreateTicket />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
