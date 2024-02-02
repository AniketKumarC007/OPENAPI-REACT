import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import myimg from "./giphy.gif" ;
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    // Fetch data from JSONPlaceholder API
    const randomStartIndex = Math.floor(Math.random() * 190) + 1;
    axios.get(`https://jsonplaceholder.typicode.com/todos?_start=${randomStartIndex}&_limit=7`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div className="App">
      <h3>List of Items Fetched Using Open API JSON Placeholder</h3>
      {loading ? (
        <p><img src={myimg}></img></p>
      ) : (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <button onClick={fetchData}>Refresh</button>
        </div>
      )}
    </div>
  );
}

export default App;

