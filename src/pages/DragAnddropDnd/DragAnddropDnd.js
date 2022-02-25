import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
export default function DragAnddropDnd() {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "task 1" },
        { id: "2", taskName: "task 2" },
        { id: "3", taskName: "task 3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "task 4" },
        { id: "5", taskName: "task 5" },
        { id: "6", taskName: "task 6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "task 7" },
        { id: "8", taskName: "task 8" },
        { id: "9", taskName: "task 9" },
      ],
    },
  });
  const handleDragEnd = (result) => {
    let { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    //tạo ra 1 tag drags
    let itemCopy = { ...state[source.droppableId].items[source.index] };

    //Draggable bắt đầu kéo
    let index = state[source.droppableId].items.findIndex(
      (item) => item.id == itemCopy.id
    );
    state[source.droppableId].items.splice(index, 1);

    //Droppable thả vào
    let dropDestination = state[destination.droppableId].items;
    dropDestination.splice(destination.index, 0, itemCopy);

    setState(state);
  };
  return (
    <div className="container">
      <h3 className="text-center display-4">DemoDragAndDrop</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable droppableId={statusTask.id} key={statusTask.id}>
                {(provided) => {
                  return (
                    <div key={index} className="col-4 ">
                      <div
                        className="bg-dark p-5 text-white"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h5 className="text-white text-center">
                          {statusTask.id}
                        </h5>
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              index={index}
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    className="text-center mt-2 p-3 bg-success"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
