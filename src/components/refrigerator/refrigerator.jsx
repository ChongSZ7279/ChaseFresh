import React, { useState } from 'react';
import './refrigerator.css';
import { IoAdd } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

const Refrigerator = () => {
  const initialRows = [['1.1', '1.2'], ['2.1', '2.2'], ['3.1', '3.2']];
  const [rows, setRows] = useState(initialRows);
  const [selectedCell, setSelectedCell] = useState(null);
  const [lastActionCoords, setLastActionCoords] = useState(null);

  const addRowAbove = (index) => {
    const newRow = new Array(rows[0].length).fill('');
    setRows((prevRows) => [...prevRows.slice(0, index), newRow, ...prevRows.slice(index)]);
    setLastActionCoords({ row: index, col: 0 });
    setSelectedCell({ row: index, col: 0 });
  };

  const addRowBelow = (index) => {
    const newRow = new Array(rows[0].length).fill('');
    setRows((prevRows) => [...prevRows.slice(0, index + 1), newRow, ...prevRows.slice(index + 1)]);
    setLastActionCoords({ row: index + 1, col: 0 });
    setSelectedCell({ row: index + 1, col: 0 });
  };

  const addColLeft = (colIndex) => {
    setRows((prevRows) => prevRows.map((row) => ['', ...row.slice(0, colIndex), '', ...row.slice(colIndex)]));
    setLastActionCoords({ row: 0, col: colIndex });
    setSelectedCell({ row: 0, col: colIndex });
  };

  const addColRight = (colIndex) => {
    setRows((prevRows) => prevRows.map((row) => [...row.slice(0, colIndex + 1), '', ...row.slice(colIndex + 1)]));
    setLastActionCoords({ row: 0, col: colIndex + 1 });
    setSelectedCell({ row: 0, col: colIndex + 1 });
  };

  const deleteCell = () => {
    if (selectedCell) {
      setRows((prevRows) =>
        prevRows.map((row, i) =>
          row.map((col, j) => {
            if (i === selectedCell.row && j === selectedCell.col) {
              return '';
            }
            return col;
          })
        )
      );
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  return (
    <>
      <section>
        <div className="title">Refrigerator</div>
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {col}
                    <div className="coordinates">
                      {lastActionCoords &&
                        lastActionCoords.row === rowIndex &&
                        lastActionCoords.col === colIndex &&
                        `Last Action (${lastActionCoords.row}, ${lastActionCoords.col})`}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="buttons">
          <button onClick={addRowAbove}>Add Row Above</button>
          <button onClick={addRowBelow}>Add Row Below</button>
          <button onClick={() => addColLeft(selectedCell?.col)}>Add Column Left</button>
          <button onClick={() => addColRight(selectedCell?.col)}>Add Column Right</button>
          <button onClick={deleteCell}>Delete Cell</button>
        </div>
      </section>
    </>
  );
};

export default Refrigerator;
