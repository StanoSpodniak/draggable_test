import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useRef, useState } from "react";
import style from "./drag.module.css";

// https://www.npmjs.com/package/react-draggable?activeTab=readme#draggable
// https://codesandbox.io/s/crazy-hellman-3q7iv?file=/src/components/piece.tsx

const Drag = () => {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const nodeRef = useRef(null);

    const handleStart =
        (index: number) => (event: DraggableEvent, data: DraggableData) => {
            console.log(event, data, index);
        };

    const handleStop = () => {
        console.log("drag stopped");
    };

    return (
        <div className={style.gameLayout}>
            {numbers.map((number, index) => (
                <div className={style.buttonLayout} key={index}>
                    <Draggable
                        axis="both"
                        onStart={handleStart(index)}
                        onStop={handleStop}
                        nodeRef={nodeRef}
                    >
                        <button className={style.button} ref={nodeRef}>
                            {number}
                        </button>
                    </Draggable>
                </div>
            ))}
        </div>
    );
};

export default Drag;
