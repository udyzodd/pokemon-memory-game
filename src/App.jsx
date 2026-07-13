import './App.css';
import PokeImage from './PokeImage';

function App() {
    return (
        <main className="app">
            <div className="background" />
            <div className="background-overlay" />

            <div className="game-layer">
                <PokeImage />
            </div>
        </main>
    );
}

export default App;