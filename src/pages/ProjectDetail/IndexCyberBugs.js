import React, { useEffect } from "react";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/constants/Cyberbugs/Cyberbugs";
export default function IndexCyberBugs(props) {
  const { projectDetail } = useSelector((state) => state.EditProjectReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    //Khi người dùng link qua trang này bằng thẻ navLink hoặc người dùng tự gọi url thì ta sẽ lấy
    //tham số từ url => gọi saga
    const { projectId } = props.match.params;
    const members = projectDetail.members;

    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId,
    });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />

      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
