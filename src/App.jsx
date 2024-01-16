import axios from "axios";
import { useEffect, useState } from "react";
import SupportAgent from "./components/SupportAgent";
const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/healthcheck')
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      {/* Check if data is available and then display */}
      {data && (
        <div>
          <h2>API Response:</h2>
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Uptime:</strong> {data.data.uptime}</p>
          <p><strong>Response Time:</strong> {data.data.responsetime.join(', ')}</p>
          <p><strong>Timestamp:</strong> {data.data.timestamp}</p>
        </div>
      )}

      <SupportAgent/  >
    </div>
  );
};

export default App;
