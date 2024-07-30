import DragNDrop from "./components/DragNDrop";
import "./App.css";

const data = [
    { title: "group 1", items: ["1", "2", "3"] },
    { title: "group 2", items: ["4", "5", "6"] },
    { title: "group 3", items: ["7", "8", "9"] },
];

function App() {
    return (
        <div className="App-header">
            <DragNDrop data={data} />
        </div>
    );
}

export default App;
