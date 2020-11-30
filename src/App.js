import React, { useState, useEffect } from 'react';
import LiveStocks from './components/LiveStocks';

function App() {
  const [ws, setWS] = useState(new WebSocket("ws://stocks.hulqmedia.com"));
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }
    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      console.log('stocks...',message);
      setStockData(message);
    }
    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
    }
  }, [ws.onmessage]);

  return (
    <div className="App">
      <LiveStocks data={stockData} />
    </div>
  );
}

export default App;
