import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pagenation = ({
  bList, // number 컬럼 존재함.
  startBlockPage,
  endBlockPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  // for 문으로 돌려서 페이지 숫자 배열 완성
  for (let i = startBlockPage; i <= endBlockPage; i++) {
    pageNumbers.push(i); // 5페이지
  }
  return (
    <div>
      {/* <!--  페이징 표시되는 부분 추가 --> */}
      <div className="text-xs-center">
        <ul className="pagination justify-content-center">
          {bList.first === false && (
            <>
              <li className="page-item">
                <button onClick={() => onPageChange(0)} className="page-link">
                  처음
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => onPageChange(bList.number - 1)}
                >
                  &larr;
                </button>
              </li>
            </>
          )}

          {/* <!--  paging --> */}
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${
                bList.number + 1 === page ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page - 1)}
              >
                {page}
              </button>
            </li>
          ))}
          {/* <!-- 다음 --> */}
          {bList.last === false && (
            <>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => onPageChange(bList.number)}
                >
                  &rarr;
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => onPageChange(bList.totalPages - 1)}
                >
                  마지막
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* <!-- 페이징 영역 끝 --> */}
    </div>
  );
};

export default Pagenation;
