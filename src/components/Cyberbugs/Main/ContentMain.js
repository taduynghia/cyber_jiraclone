import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_TASK_DEATAIL_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
export default function ContentMain(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch();
  const handleDragEnd = (result) => {
    console.log(result);
    let { projectId, taskId } = JSON.parse(result.draggableId); //hàm chuyển lại thành object,lấy ra chuỗi sau mỗi lần drag
    let { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    //gọi api cập nhật lại status
    dispatch({
      type: UPDATE_TASK_STATUS_SAGA,
      taskUpdateStatus: {
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      },
    });
  };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((listTask, index) => {
          return (
            <Droppable droppableId={listTask.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    className="card pb-2"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">{listTask.statusName}</div>
                    <div
                      className="list-group list-group-flush"
                      style={{ height: "100%" }}
                      key={index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {listTask.lstTaskDeTail?.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId,
                            })}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <li
                                  key={index}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  //style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DEATAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  {/* task list */}
                                  <p className="font-weight-bold">
                                    {task.taskName}
                                  </p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      {/* <i className="fa fa-bookmark" />
                      <i className="fa fa-arrow-up" /> */}

                                      {
                                        <p className="text-danger font-weight-bold">
                                          {task.priorityTask.priority}
                                        </p>
                                      }
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group mb-2"
                                        style={{ display: "flex" }}
                                      >
                                        {task.assigness?.map(
                                          (assignMember, index) => {
                                            return (
                                              <div
                                                className="avatar"
                                                key={index}
                                              >
                                                <img
                                                  key={index}
                                                  src={assignMember.avatar}
                                                  alt="1"
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
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
      </DragDropContext>
    );
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">BACKLOG 3</div>
<ul className="list-group list-group-flush">
  <li
    className="list-group-item"
    data-toggle="modal"
    data-target="#infoModal"
    style={{ cursor: "pointer" }}
  >
    <p>
      Each issue has a single reporter but can have multiple assignees
    </p>
    <div className="block" style={{ display: "flex" }}>
      <div className="block-left">
        <i className="fa fa-bookmark" />
        <i className="fa fa-arrow-up" />
      </div>
      <div className="block-right">
        <div className="avatar-group" style={{ display: "flex" }}>
          <div className="avatar">
            <img
              src={require("../../../assets/image/download (1).jfif")}
              alt="1"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/image/download (2).jfif")}
              alt="2"
            />
          </div>
        </div>
      </div>
    </div>
  </li>
  <li className="list-group-item">
    <p>
      Each issue has a single reporter but can have multiple assignees
    </p>
    <div className="block" style={{ display: "flex" }}>
      <div className="block-left">
        <i className="fa fa-check-square" />
        <i className="fa fa-arrow-up" />
      </div>
      <div className="block-right">
        <div className="avatar-group" style={{ display: "flex" }}>
          <div className="avatar">
            <img
              src={require("../../../assets/image/download (1).jfif")}
              alt="1"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/image/download (2).jfif")}
              alt="2"
            />
          </div>
        </div>
      </div>
    </div>
  </li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">IN PROGRESS 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">DONE 3</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */
}
