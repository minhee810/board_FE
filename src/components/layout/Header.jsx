import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UserObjContext } from "../../context/UserObjContext";

/**
 *
 * 사용자의 정보가 없을 경우  즉, userId 가  null 일 경우 guest 로 설정
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, setUserData } = useContext(UserObjContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      sessionStorage.removeItem("userData");

      console.log("setUserData Guest 로 변경");
      setUserData({ username: "Guest" }); // user의 정보가 변했으니까 헤더 컴포넌트가 재 랜더링이 되어야 하는데, 재 랜더링 되면 그 값이 사라지게 되는데 나는 값이 사라지는 게 아닌 Guest의 기본 값이 다시 전해졋으면 좋겠음.
      // 그럼 UserObjcontext 가 다시 호출되어야 하는건가?
      navigate("/");
      console.log("userData : ", userData);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect 를 사용해서 사용자의 정보가 변경되면 컴포넌트를 리랜더링 시키자
  /**
   * 로그인 하면 사용자의 정보를
   */

  useEffect(() => {
    console.log("mount 시 userData : ", userData);
    setUserData(userData);
    console.log("userData : ", userData);
    // header 에 사용자의 이름이 바로 적용되지 않고 새로고침해야 이름이 적용되는 이유
  }, [userData]);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/**Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/** Sidebar Toggle (Topbar) */}
        <form className="form-inline">
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>
        </form>

        {/** Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          {/** Nav Item - User Information true -> show  */}
          <li className={`nav-item dropdown no-arrow ${isOpen ? "show" : ""}`}>
            <Link
              onClick={handleDropdown}
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {userData.username}
              </span>
              <img
                className="img-profile rounded-circle"
                src={`${process.env.PUBLIC_URL}/images/undraw_profile.svg`}
                alt="프로필 이미지"
              />
            </Link>

            {/**  Dropdown - User Information */}
            {userData.userId == null ? (
              ""
            ) : (
              <div
                className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
                  isOpen ? "show" : ""
                }`}
                aria-labelledby="userDropdown"
              >
                <Link to="/profile" className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </Link>

                <div className="dropdown-divider"></div>
                <button
                  onClick={handleLogout}
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      {/** End of Topbar */}
    </>
  );
}
