import { useContext } from "react";

import BoardContext from "../context/BoardContext.js";

const useBoard = () => useContext(BoardContext);

export default useBoard;
