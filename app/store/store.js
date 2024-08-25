import { create } from "zustand";
import { initialGrid } from "@/utils/initialGrid";

const useStore = create((set) => ({
    selectedCell: {
        rowIndex: 0,
        colIndex: 0,
    },
    grid: initialGrid,
    undoStack: [JSON.parse(JSON.stringify(initialGrid))],
    redoStack: [],

    setSelectedCell: (selectedCell) => {
        set((state) => ({ selectedCell: selectedCell }));
    },

    setGridData: (gridData) => {
        set((state) => ({
            grid: gridData,
            undoStack: [...state.undoStack, JSON.parse(JSON.stringify(state.grid))],
            redoStack: [],
        }));
    },
    setFormatAtIndex: (rowIndex, colIndex, formatedStyle) => {
        set((state) => {
            const newGrid = state.grid.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                    rIdx === rowIndex && cIdx === colIndex
                        ? { ...cell, cellFormat: formatedStyle }
                        : cell
                )
            );
            return {
                grid: newGrid,
                undoStack: [...state.undoStack, JSON.parse(JSON.stringify(state.grid))],
                redoStack: [],
            };
        });
    },
    undo: () => {
        set((state) => {
            if (state.undoStack.length === 1) {
                return initialGrid;
            }
            const prevGrid = state.undoStack[state.undoStack.length - 2];
            const newUndoStack = state.undoStack.slice(0, -1);
            return {
                grid: prevGrid,
                undoStack: newUndoStack,
                redoStack: [...state.redoStack, JSON.parse(JSON.stringify(state.grid))],
            };
        });
    },

    redo: () => {
        set((state) => {
            if (state.redoStack.length === 0) {
                return state;
            }

            const nextGrid = state.redoStack[state.redoStack.length - 1];
            const newRedoStack = state.redoStack.slice(0, -1);

            return {
                grid: nextGrid,
                redoStack: newRedoStack,
                undoStack: [...state.undoStack, JSON.parse(JSON.stringify(state.grid))],
            };
        });
    },
}));

export default useStore;