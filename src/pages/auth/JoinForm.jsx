import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Link } from "react-router-dom";
import PostCode from "../../services/PostCode";
import axios from "axios";
import api from "../../utils/api";
import isMatch from "../../utils/utility";
import PasswordCheck from "../../components/PasswordCheck";

export const JoinForm = () => {
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    zonecode: "",
    extraAddress: "",
  });

  const handleInputChange = (event) => {
    console.log("handleInputChange() 호출");
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // 사용자 이름 & 이메일 중복 확인
  const checkDuplicate = async (e) => {
    console.log("checkDuplicate() 호출");
    e.preventDefault();
    let name = e.target.name;
    let requsetURL = "";

    if (name === "username") {
      requsetURL = `/api/username/${formData.username}/check`;
    } else {
      requsetURL = `/api/email/${formData.email}/check`;
    }

    try {
      const response = await api.get(requsetURL);
    } catch (error) {
      console.log("response.status :", error.response.status);
    }
  };

  return (
    <>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">회원가입</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          onChange={handleInputChange}
                          onBlur={checkDuplicate}
                          className="form-control form-control-user"
                          placeholder="이름"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            className="form-control form-control-user"
                            placeholder="이메일주소"
                          />
                        </div>
                        <div className="col-sm-3">
                          <button
                            name="emailCheck"
                            onClick={checkDuplicate}
                            className="btn btn-primary btn-user btn-block"
                          >
                            중복확인
                          </button>
                        </div>
                      </div>
                      {/* password checker component */}
                      <PasswordCheck />
                      <div className="form-group">
                        <input
                          type="phone"
                          name="phone"
                          className="form-control form-control-user"
                          placeholder="휴대폰번호"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="address"
                            defaultValue={formData.address}
                            className="form-control form-control-user"
                            placeholder="주소"
                          />
                        </div>
                        <div className="col-sm-3">
                          <PostCode setSignForms={setFormData} />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="detailAddress"
                          className="form-control form-control-user"
                          placeholder="상세주소"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="zipCode"
                            defaultValue={formData.zonecode}
                            className="form-control form-control-user"
                            placeholder="우편번호"
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="note"
                            defaultValue={formData.extraAddress}
                            className="form-control form-control-user"
                            placeholder="참고사항"
                          />
                        </div>
                      </div>

                      <Link
                        to="/join"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register Account
                      </Link>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/join">
                        Already have an account? Login!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
