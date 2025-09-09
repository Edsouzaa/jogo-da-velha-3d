import "./App.css";
import { useState } from "react";

//Criação do elemento square que irá compor o tabuleiro
function Square({ valor, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

function Tabuleiro({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Se squares de i é null o if não executa o return.
    if (squares[i] || haVencedor(squares)) {
      return;
    }
    // O handleClick continua a execução pois o return não
    // foi executado o squares[i] era null.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "o";
    }
    onPlay(nextSquares);
  }

  const vencedor = haVencedor(squares);
  let status;

  if (vencedor) {
    status = "Vencedor foi o " + vencedor;
  } else {
    status = "Proximo a jogar: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="jogos">
        <div className="Tabuleiro">
          <div className="jogo">
            <Square valor={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square valor={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square valor={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="jogo">
            <Square valor={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square valor={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square valor={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="jogo">
            <Square valor={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square valor={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square valor={squares[8]} onSquareClick={() => handleClick(8)} />
            <div>Jogo Superior</div>
          </div>
        </div>

        <div className="Tabuleiro">
          <div className="jogo">
            <Square valor={squares[9]} onSquareClick={() => handleClick(9)} />
            <Square valor={squares[10]} onSquareClick={() => handleClick(10)} />
            <Square valor={squares[11]} onSquareClick={() => handleClick(11)} />
          </div>
          <div className="jogo">
            <Square valor={squares[12]} onSquareClick={() => handleClick(12)} />
            <Square valor={squares[13]} onSquareClick={() => handleClick(13)} />
            <Square valor={squares[14]} onSquareClick={() => handleClick(14)} />
          </div>
          <div className="jogo">
            <Square valor={squares[15]} onSquareClick={() => handleClick(15)} />
            <Square valor={squares[16]} onSquareClick={() => handleClick(16)} />
            <Square valor={squares[17]} onSquareClick={() => handleClick(17)} />
            <div>Jogo Médio</div>
          </div>
        </div>

        <div className="Tabuleiro">
          <div className="jogo">
            <Square valor={squares[18]} onSquareClick={() => handleClick(18)} />
            <Square valor={squares[19]} onSquareClick={() => handleClick(19)} />
            <Square valor={squares[20]} onSquareClick={() => handleClick(20)} />
          </div>
          <div className="jogo">
            <Square valor={squares[21]} onSquareClick={() => handleClick(21)} />
            <Square valor={squares[22]} onSquareClick={() => handleClick(22)} />
            <Square valor={squares[23]} onSquareClick={() => handleClick(23)} />
          </div>
          <div className="jogo">
            <Square valor={squares[24]} onSquareClick={() => handleClick(24)} />
            <Square valor={squares[25]} onSquareClick={() => handleClick(25)} />
            <Square valor={squares[26]} onSquareClick={() => handleClick(26)} />
            <div>Jogo Inferior</div>
          </div>
        </div>
      </div>
    </div>
  );
}

//Implementa o game
export default function Game() {
  const [history, setHistory] = useState([Array(27).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsnext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Voltar para o movimento numero #" + move;
    } else {
      description = "Voltar para o inicio do jogo";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="gameboard">
        <Tabuleiro
          xIsNext={xIsnext}
          squares={currentSquare}
          onPlay={handlePlay}
        />
        <div className="historico">Historico</div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    </div>
  );
}

function haVencedor(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17],
    [9, 13, 17],
    [11, 13, 15],
    [18, 19, 20],
    [21, 22, 23],
    [24, 25, 26],
    [18, 22, 26],
    [20, 22, 24],
    [0, 10, 20],
    [3, 13, 23],
    [6, 16, 26],
    [0, 12, 24],
    [1, 13, 25],
    [2, 14, 26],
    [0, 13, 26],
    [2, 13, 24],
    [0, 9, 18],
    [1, 10, 19],
    [2, 11, 20],
    [3, 12, 21],
    [4, 13, 22],
    [5, 14, 23],
    [6, 15, 24],
    [7, 16, 25],
    [8, 17, 26],
  ];
  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
