import { useState, useRef } from "react";

interface DragNDropProps {
    data: Group[];
}

interface Group {
    title: string;
    items: string[];
}

function DragNDrop({ data }: DragNDropProps) {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef<{ grpI: number; itemI: number } | null>(null);
    const dragNode = useRef<HTMLDivElement | null>(null);

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        params: { grpI: number; itemI: number }
    ) => {
        console.log("drag starting...", params);
        dragItem.current = params;
        dragNode.current = e.currentTarget;
        if (dragNode.current) {
            dragNode.current.addEventListener("dragend", handleDragEnd);
        }
        setTimeout(() => {
            setDragging(true);
        }, 0);
    };

    const handleDragEnter = (
        e: React.DragEvent<HTMLDivElement>,
        params: { grpI: number; itemI: number }
    ) => {
        console.log("Entering drag...", params);
        const currentItem = dragItem.current;
        if (!currentItem) {
            console.log("Current item is null");
            return;
        }

        /*if (e.target !== dragNode.current) {
            console.log("Target is not the same");
            setList((oldList) => {
                const newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(
                    params.itemI,
                    0,
                    newList[currentItem.grpI].items.splice(
                        currentItem?.itemI,
                        1
                    )
                );
                dragItem.current = params;
                return newList;
            });
        }*/

        //Swaping items
        if (
            currentItem.grpI !== params.grpI ||
            currentItem.itemI !== params.itemI
        ) {
            setList((oldList) => {
                // Create a deep copy of the old list to avoid mutating state directly
                const newList = JSON.parse(JSON.stringify(oldList)) as Group[];

                // Extract the items to swap
                const draggedItem =
                    newList[currentItem.grpI].items[currentItem.itemI];
                const targetItem = newList[params.grpI].items[params.itemI];

                // Swap the items
                newList[currentItem.grpI].items[currentItem.itemI] = targetItem;
                newList[params.grpI].items[params.itemI] = draggedItem;

                // Update the reference to the new item position
                dragItem.current = params;

                return newList;
            });
        }
    };

    const handleDragEnd = () => {
        console.log("Ending drag...");
        setDragging(false);
        if (dragNode.current) {
            dragNode.current.removeEventListener("dragend", handleDragEnd);
            dragNode.current = null;
        }
        dragItem.current = null;
    };

    const getStyles = (params: { grpI: number; itemI: number }) => {
        const currentItem = dragItem.current;
        if (
            currentItem?.grpI === params.grpI &&
            currentItem?.itemI === params.itemI
        ) {
            return "current dnd-item";
        }
        return "dnd-item";
    };

    return (
        <div className="drag-n-drop">
            {list.map((grp, grpI) => (
                <div
                    key={grp.title}
                    className="dnd-group"
                    onDragEnter={
                        dragging && !grp.items.length
                            ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                            : undefined
                    }
                >
                    <div className="group-title">{grp.title}</div>
                    {grp.items.map((item, itemI) => (
                        <div
                            draggable
                            onDragStart={(e) => {
                                handleDragStart(e, { grpI, itemI });
                            }}
                            onDragEnter={
                                dragging
                                    ? (e) => {
                                          handleDragEnter(e, { grpI, itemI });
                                      }
                                    : undefined
                            }
                            key={item}
                            className={
                                dragging
                                    ? getStyles({ grpI, itemI })
                                    : "dnd-item"
                            }
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default DragNDrop;
