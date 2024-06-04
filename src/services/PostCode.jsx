//useDaumPostcodePopup hook 을 사용하여, 반환받은 함수를 통해 우편번호 검색 서비스를 팝업 방식으로 이용

import { useDaumPostcodePopup } from "react-daum-postcode";

export default function PostCode({ scriptUrl, setSignForms }) {
  const open = useDaumPostcodePopup(scriptUrl);

  // 주소 검색 완료 핸들러 -> 주소 검색 후 선택 시 호출되는 함수
  const handleComplete = (data) => {
    let address = data.address;
    let zipCode = data.zonecode;
    let note = ""; // 참고항목 변수

    if (data.userSelectedType === "R") {
      // 사용자가 도로명 주소를 선택했을 경우
      address = data.roadAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      address = data.jibunAddress;
    }

    if (data.addressType === "R") {
      if (data.bname !== "") {
        note += data.bname;
      }
      if (data.buildingName !== "") {
        note += note !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    //주소값을 상태값으로 저장
    setSignForms((prev) => ({
      ...prev,
      address: address,
      note,
      zipCode,
    }));
  };

  const handleClick = (e) => {
    open({ onComplete: handleComplete });
    e.preventDefault();
  };

  return (
    <button
      className="btn btn-primary btn-user btn-block"
      onClick={handleClick}
    >
      주소 찾기
    </button>
  );
}
