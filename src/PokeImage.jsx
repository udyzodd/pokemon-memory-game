import { useState, useEffect } from 'react';

export const PokeImage = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [clickedIds, setClickedIds] = useState([]);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const [gameMode, setGameMode] = useState(null);

    useEffect(() => {
        if (!gameMode) return;

        const fetchPokemonData = async () => {
            setLoading(true);

            try {
                const cardCount = gameMode === 'normal' ? 12 : 24;

                const pokemonIds = new Set();

                while (pokemonIds.size < cardCount) {
                    const randomId = Math.floor(Math.random() * 151) + 1;
                    pokemonIds.add(randomId);
                }

                const pokemonData = [];

                for (const id of pokemonIds) {
                    const response = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/${id}`
                    );

                    const data = await response.json();

                    pokemonData.push({
                        id: data.id,
                        name: data.name,
                        image: data.sprites.front_default,
                    });
                }

                setPokemonList(shuffle(pokemonData));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [gameMode]);

    function shuffle(array) {
        const shuffled = [...array];

        let currentIndex = shuffled.length;

        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [shuffled[currentIndex], shuffled[randomIndex]] = [
                shuffled[randomIndex],
                shuffled[currentIndex],
            ];
        }

        return shuffled;
    }

    const reset = () => {
        setScore(0);
        setClickedIds([]);
        setGameOver(false);
        setPokemonList((prev) => shuffle(prev));
    };
    const quitToMenu = () => {
        setScore(0);
        setClickedIds([]);
        setGameOver(false);
        setPokemonList([]);
        setGameMode(null);
    }

    const handleClick = (id) => {
        if (gameOver) return;

        if (clickedIds.includes(id)) {
            setGameOver('failed');
            return;
        }

        const newScore = score + 1;

        setScore(newScore);
        setClickedIds((prev) => [...prev, id]);

        if (newScore > bestScore) {
            setBestScore(newScore);
        }

        if (newScore === pokemonList.length) {
            setGameOver('won');
        } else {
            setPokemonList((prev) => shuffle(prev));
        }
    };
    if (!gameMode) {
        return (
            <div className="menu-screen">
                <div className="menu-panel">
                    <h1 className="menu-title">Pokémon Memory Game</h1>

                    <p className="menu-subtitle">
                        Test your memory. Don't click the same Pokémon twice!
                    </p>

                    <h2 className="mode-heading">Select Game Mode</h2>

                    <div className="mode-buttons">
                        <button
                            className="mode-button"
                            onClick={() => setGameMode('normal')}
                        >
                            <span className="mode-name">Normal Mode</span>
                            <span className="mode-description">12 Pokémon</span>
                        </button>

                        <button
                            className="mode-button mode-button-hard"
                            onClick={() => setGameMode('hard')}
                        >
                            <span className="mode-name">Hard Mode</span>
                            <span className="mode-description">24 Pokémon</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    if (loading) {
        return (
            <div className="loading-screen">
                <div className="pokeball-loader" />
                <p>Finding Pokémon...</p>
            </div>
        );
    }
    return (
        <div className="game-screen">
            <header className="game-header">
                <div className="header-top">
                    <button
                        className="button button-secondary back-button"
                        onClick={quitToMenu}
                    >
                        ← Menu
                    </button>

                    <div className="title-section">
                        <h1 className="game-title">
                            Pokémon Memory Game
                        </h1>

                        <span className={`mode-badge ${gameMode}`}>
                            {gameMode} mode
                        </span>
                    </div>

                    <div className="score-board">
                        <div className="stat">
                            <span className="stat-label">SCORE</span>
                            <span className="stat-value">{score}</span>
                        </div>

                        <div className="stat">
                            <span className="stat-label">BEST</span>
                            <span className="stat-value">{bestScore}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={`pokemon-grid ${gameMode === 'hard' ? 'hard-grid' : ''
                    }`}
            >
                {pokemonList.map((pokemon) => (
                    <button
                        key={pokemon.id}
                        className="pokemon-card"
                        onClick={() => handleClick(pokemon.id)}
                    >
                        <div className="pokemon-image-container">
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                                className="pokemon-image"
                            />
                        </div>

                        <span className="pokemon-name">
                            {pokemon.name}
                        </span>
                    </button>
                ))}
            </div>

            {gameOver && (
                <div className="modal-overlay">
                    <div className="game-over-modal">
                        {gameOver === 'won' ? (
                            <>
                                <div className="result-icon">🏆</div>
                                <h2>You Won!</h2>
                                <p>
                                    You found all {pokemonList.length} Pokémon
                                    without repeating one.
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="result-icon">💥</div>
                                <h2>Game Over!</h2>
                                <p>You clicked the same Pokémon twice.</p>
                            </>
                        )}

                        <div className="final-score-section">
                            <span className="final-score-label">FINAL SCORE</span>
                            <strong className="final-score">{score}</strong>
                        </div>

                        <p className="best-score">
                            Best Score: <strong>{bestScore}</strong>
                        </p>

                        <div className="modal-actions">
                            <button
                                className="button button-primary"
                                onClick={reset}
                            >
                                Play Again
                            </button>

                            <button
                                className="button button-secondary"
                                onClick={quitToMenu}
                            >
                                Main Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default PokeImage;