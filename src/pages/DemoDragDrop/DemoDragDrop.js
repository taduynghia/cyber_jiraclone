import React, { useRef, useState } from "react";
import "./DemoDragdrop.css";

import { useSpring, animated } from "react-spring";

const defaultValue = [
  { id: 1, taskName: "task 1" },
  { id: 2, taskName: "task 2" },
  { id: 3, taskName: "task 3" },
  { id: 4, taskName: "task 4" },
  { id: 5, taskName: "task 5" },
];

export default function DemoDragDrop() {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});
  const tagDragEnter = useRef({});
  //animation
  const [propsSpring, set, stop] = useSpring(() => ({
    from: { bottom: -25 },
    to: { bottom: 0 },
    config: { duration: 250 },
    reset: true,
  }));
  const handleOndragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    console.log("index", index);
    tagDrag.current = task;
  };
  const handleDragOver = (e) => {
    //console.log("targetOver", e.target);
  };
  const handleDragEnter = (e, taskDragEnter, index) => {
    //   console.log("e", e);
    //   console.log("dragEntertag", e.target);
    //   console.log("dragEntertask", task);
    //   console.log("dragEnterindex", index);
    //mỗi lần drag qua thì swap
    set({ bottom: 0 });
    tagDragEnter.current = { ...taskDragEnter }; //lưu lại giá trị của tag được kéo ngang qua
    let taskListUpdate = [...taskList];
    //tìm ra vị trí tag (lấy ra index thằng kéo)
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );
    //tìm ra vị trí task drag tới (lấy ra index thằng kéo qua)
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );
    //hoán vị 2 vị trí (cần 1 biến trung gian)
    //biến chứa giá trị thằng đang kéo
    let temp = taskListUpdate[indexDragTag];
    //lấy giá trị tại vị trí đang kéo gán  = thằng kéo qua
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    //lấy thằng kéo qua gán = đang kéo
    taskListUpdate[indexDragEnter] = temp;
    setTaskList(taskListUpdate);
  };
  const handleDragEnd = (e) => {};
  const handleDrop = (e) => {
    //console.log("drop", e.target);
  };
  return (
    <div
      className="container"
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        tagDrag.current = {};
        console.log("dragend");
        setTaskList([...taskList]);
      }}
    >
      <div className="text-center display-4">Task list</div>
      <div className="row">
        <div className="col-3"></div>
        <div className="bg-dark text-white p-5 col-6 ">
          {taskList.map((task, index) => {
            let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";
            if (task.id === tagDragEnter.current.id) {
              return (
                <animated.div
                  key={index}
                  style={{
                    position: "relative",
                    bottom: propsSpring.bottom.to(
                      (numBottom) => `${numBottom}px`
                    ),
                  }}
                  className={`bg-success m-2 p-3 `}
                  draggable="true"
                  onDragStart={(e) => {
                    handleOndragStart(e, task, index);
                  }}
                  onDragEnter={(e) => {
                    handleDragEnter(e, task, index);
                  }}
                  onDragEnd={(e) => {
                    handleDragEnd(e);
                  }}
                >
                  {task.taskName}
                </animated.div>
              );
            }
            return (
              <div
                key={index}
                className={`bg-success m-2 p-3 ${cssDragTag}`}
                draggable="true"
                onDragStart={(e) => {
                  handleOndragStart(e, task, index);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task, index);
                }}
                onDragEnd={(e) => {
                  handleDragEnd(e);
                }}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div
          className="col-3 bg-warning text-white p-5 "
          onDrop={(e) => {
            handleDrop(e);
          }}
          draggable="true"
        >
          Thẻ 3
        </div>
      </div>
    </div>
  );
}

// onDragOver={(e) => {
//     e.stopPropagation();
//     e.preventDefault();
//   }}
