import React from "react";
import { Link } from "react-router-dom";

export const JoinForm = () => {
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
                          className="form-control form-control-user"
                          placeholder="이름"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            placeholder="이메일주소"
                          />
                        </div>
                        <div className="col-sm-3">
                          <Link
                            to="login.html"
                            className="btn btn-primary btn-user btn-block"
                          >
                            중복확인
                          </Link>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="비밀번호"
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="비밀번호 확인"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="휴대폰번호"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            placeholder="주소"
                          />
                        </div>
                        <div className="col-sm-3">
                          <Link
                            to="login.html"
                            className="btn btn-primary btn-user btn-block"
                          >
                            주소찾기
                          </Link>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="상세주소"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="우편번호"
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="참고사항"
                          />
                        </div>
                      </div>

                      <Link
                        to="login.html"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register Account
                      </Link>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="login.html">
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
