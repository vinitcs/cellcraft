"use client";

import { LuUndo2, LuRedo2 } from "react-icons/lu";
import React from "react";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";

import Table from "./components/Table";
import useStore from "./store/store";

export default function Home() {
  const { grid, selectedCell, setFormatAtIndex, undo, redo, undoStack } =
    useStore();

  const handleFontChange = (e) => {
    const fontSize = e.target.value;
    const { rowIndex, colIndex } = selectedCell;
    const formatedStyle = {
      ...grid[rowIndex][colIndex].cellFormat,
      fontSize: fontSize,
    };

    setFormatAtIndex(rowIndex, colIndex, formatedStyle);
  };

  const handleAlignMent = (alignment) => {
    const { rowIndex, colIndex } = selectedCell;
    const formatedStyle = {
      ...grid[rowIndex][colIndex].cellFormat,
      alignMent: alignment,
    };

    setFormatAtIndex(rowIndex, colIndex, formatedStyle);
  };
  return (
    <main className="flex h-screen flex-col items-center p-10 bg-slate-50 overflow-auto">
      <div className="bg-slate-100 flex-col  w-full h-full justify-center rounded-md relative border-2 border-gray-200">
        {/* Features Section */}
        <div className="px-3 py-1 @media bg-slate-300 w-full h-auto rounded-r-md  rounded-b-md items-center flex flex-wrap gap-3 ">
          <h1 className="bg-red-400 rounded-md text-lg px-2 font-mono text-center font-extrabold tracking-wider cursor-default select-none  left-0 -top-7 text-slate-800">
          CellCraft
          </h1>

          {/* Undo Redo */}
          <div className="w-max h-10 justify-center items-center flex gap-3">
            <LuUndo2
              className={`cursor-pointer text-black hover:text-red-500`}
              onClick={undo}
            />
            <LuRedo2
              className={`cursor-pointer text-black hover:text-red-500`}
              onClick={redo}
            />
          </div>

          {/* Search/Filter */}
          <div className="w-max ml-4">
            <input
              className="w-11/12 rounded-md p-1 text-black text-sm bg-slate-100 hover:bg-white"
              placeholder="Search/Filter"
            />
          </div>

          {/* Font Size */}
          <div className="flex gap-2 items-center justify-center ml-6">
            <h1 className="text-slate-600 font-semibold font-mono text-[0.8rem]">
              Font Size
            </h1>
            <select
              className="p-1 rounded-md w-16 text-center text-sm text-black  bg-slate-100 hover:bg-white cursor-pointer"
              onChange={handleFontChange}
            >
              <option value="text-xs">8</option>
              <option value="text-sm">10</option>
              <option value="text-base">12</option>
              <option value="text-lg">14</option>
              <option value="text-xl">16</option>
              <option value="text-2xl">18</option>
              <option value="text-3xl">20</option>
            </select>
          </div>

          {/* Left Center Right */}
          <div className="flex gap-4 ml-6">
            <h1 className="text-slate-600 font-semibold font-mono text-[0.8rem]">
              Alignments
            </h1>
            <FaAlignLeft
              className="cursor-pointer text-black hover:text-red-500 "
              onClick={() => handleAlignMent("text-left")}
            />
            <FaAlignCenter
              className="cursor-pointer text-black hover:text-red-500"
              onClick={() => handleAlignMent("text-center")}
            />
            <FaAlignRight
              className="cursor-pointer text-black hover:text-red-500"
              onClick={() => handleAlignMent("text-right")}
            />
          </div>
        </div>

        {/* Table cells */}
        <div className="h-5/6 overflow-hidden">
          <Table />
        </div>
      </div>
    </main>
  );
}
