import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [wins, setWins] = useState([]);
    const [newWin, setNewWin] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/wins")
            .then(response => setWins(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const addWin = () => {
        axios.post("http://127.0.0.1:8000/wins", { title: newWin })
            .then(response => setWins([...wins, response.data]))
            .catch(error => console.error("Error adding win:", error));
    };

    return (
        <div>
            <h1>Dev Wins Tracker 🚀</h1>
            <input type="text" value={newWin} onChange={(e) => setNewWin(e.target.value)} />
            <button onClick={addWin}>Add Win</button>
            <ul>
                {wins.map((win, index) => (
                    <li key={index}>{win.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
