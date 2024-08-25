"use client";
import useStore from "../store/store";

const Table = () => {
  const { selectedCell, grid, setSelectedCell, setGridData } = useStore();

  const handleCellChange = (rowIndex, colIndex, cellValue) => {
    let newGrid = [...grid];
    newGrid[rowIndex][colIndex].value = cellValue;
    setGridData(newGrid);
  };

  const handleSelection = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
  };

  return (
    <>
      <div className="w-full h-[32rem] overflow-auto p-2">
        <table className="table-auto overflow-auto w-full ">
          <tbody>
            {grid.map((curRow, rowIndex) => (
              <tr key={rowIndex}>
                {curRow.map((curCell, colIndex) => (
                  <td
                    key={colIndex}
                    className="text-slate-800 outline outline-1  hover:ring-4 hover:ring-red-400"
                  >
                    <input
                      type="text"
                      value={curCell.value}
                      className={
                        selectedCell.rowIndex === rowIndex &&
                        selectedCell.colIndex === colIndex
                          ? `w-full h-full  bg-transparent border-none outline-none text-red-400 ${curCell.cellFormat.fontSize} ${curCell.cellFormat.alignMent}`
                          : `w-full h-full bg-transparent border-none outline-none ${curCell.cellFormat.fontSize} ${curCell.cellFormat.alignMent}`
                      }
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      onClick={() => handleSelection(rowIndex, colIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
