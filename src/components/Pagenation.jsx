import React from "react";
import { Link } from "react-router-dom";

const Pagenation = () => {
  return (
    <div>
      {/* <!--  페이징 표시되는 부분 추가 --> */}
      <div class="text-xs-center">
        <ul class="pagination justify-content-center">
          {/* <!-- 이전 --> */}
          <c:choose>
            <c:when test="${boardList.first}"></c:when>
            <c:otherwise>
              <li class="page-item">
                <Link to="?page=0" class="page-link">
                  처음
                </Link>
              </li>
              <li class="page-item">
                <Link
                  class="page-link"
                  href="${contextPath}?page=${boardList.number-1}"
                >
                  &larr;
                </Link>
              </li>
            </c:otherwise>
          </c:choose>

          {/* <!--  paging --> */}
          <c:forEach begin="${startBlockPage}" end="${endBlockPage}" var="i">
            <c:choose>
              <c:when test="${boardList.pageable.pageNumber + 1 == i}">
                <li class="page-item active">
                  <Link class="page-link" href="?page=${i-1}">
                    ${i}
                  </Link>
                </li>
              </c:when>
              <c:otherwise>
                <li class="page-item">
                  <Link class="page-link" href="?page=${i-1}">
                    ${i}
                  </Link>
                </li>
              </c:otherwise>
            </c:choose>
          </c:forEach>
          {/* <!-- 다음 --> */}
          <c:choose>
            <c:when test="${boardList.last}"></c:when>
            <c:otherwise>
              <li class="page-item">
                <Link class="page-link" href="?page=${boardList.number+1}">
                  &rarr;
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="?page=${boardList.totalPages-1}">
                  마지막
                </Link>
              </li>
            </c:otherwise>
          </c:choose>
        </ul>
      </div>
      {/* <!-- 페이징 영역 끝 --> */}
    </div>
  );
};

export default Pagenation;
