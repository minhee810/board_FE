import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostCode from "../../services/PostCode";
import api from "../../utils/api";
import PasswordCheck from "../../components/PasswordCheck";
import { useForm } from "react-hook-form";
import { REPLACE_VALID, VALID_TYPE, onChangeExp } from "../../utils/validation";

export const JoinForm = () => {
  // watch : 값의 변화를 감지
  // handleSubmit : validation(검증을 담당)
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log("data", data);
  };

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    note: "",
  });

  // input 창 상태 관리
  const handleInputChange = (event, validType = "") => {
    if (event.nativeEvent.isComposing) {
      return;
    } else {
      console.log("handleInputChange() 호출");
      let { name, value } = event.target;
      // replace 함 값 다시 값에 할당해주는 방법
      if (validType) {
        console.log("validType", validType);
        const filteredValue = value.replace(REPLACE_VALID[validType], "");
        setFormData({ ...formData, [name]: filteredValue });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
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
      await api.get(requsetURL);
    } catch (error) {
      console.log("response.status :", error.response.status);
    }
  };

  // 회원가입 버튼 클릭 시 폼 제출
  const handleFormSubmit = async (e) => {
    console.log("handleFormSubmit() 호출");
    e.preventDefault();
    try {
      console.log(formData);
      await api.post(`/api/join`, formData, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log("response.status :", error.response.status);
    }
  };

  const handlePasswordChange = (password) => {
    console.log("handlePasswordChange() 호출");
    setFormData({ ...formData, password: password });
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
                    {/* form start */}
                    <form className="user" onSubmit={onValid}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          onChange={(e) => handleInputChange(e, "username")}
                          onBlur={checkDuplicate}
                          // {...register("username", {
                          //   required: true,
                          //   pattern: /^[a-zA-Z0-9]{3,10}$/,
                          // })}
                          className="form-control form-control-user"
                          placeholder="이름"
                          value={formData.username}
                        />
                        {errors.name && errors.name.type === "required" && (
                          <p>this name field is required</p>
                        )}
                        {errors.name && errors.name.type === "maxLength" && (
                          <p>your input exceed maximun length</p>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="email"
                            name="email"
                            // {...register("email", {
                            //   required: true,
                            //   pattern: /^\S+@\S+$/i,
                            // })}
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
                      <PasswordCheck onDataChange={handlePasswordChange} />
                      <div className="form-group">
                        <input
                          type="phone"
                          name="phone"
                          onChange={handleInputChange}
                          className="form-control form-control-user"
                          placeholder="휴대폰번호"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="address"
                            onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          className="form-control form-control-user"
                          placeholder="상세주소"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="zipCode"
                            defaultValue={formData.zipCode}
                            onChange={handleInputChange}
                            className="form-control form-control-user"
                            placeholder="우편번호"
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="note"
                            defaultValue={formData.note}
                            onChange={handleInputChange}
                            className="form-control form-control-user"
                            placeholder="참고사항"
                          />
                        </div>
                      </div>

                      <button
                        // onClick={handleFormSubmit}
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register Account
                      </button>
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
