import { validate } from "uuid";
import { hintMsg } from "./message";

export const JOIN_VALID = {
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,
  passwordConfirm: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,
  email: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
  phone: /^(01[0|1|6|7|8|9]-?[0-9]{3,4}-?([0-9]{4}))$/,
  username: /^[a-zA-Z0-9]{3,10}$/,
};

export const COMMON_VALID = {
  checkSpecial: /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g,
  checkKor: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g,
  checkEngNum: /[a-zA-Z0-9]/g,
};

export const REPLACE_VALID = {
  username: /[^a-zA-Z0-9]/gi,
  phone: /[^\d\s]/g,
  email: /[^\w\d\s@.]/gi,
  textarea: /(?:\r\n|\r|\n)/g,
};

// 정규식 함수 정규식 체크 결과를 리턴해줌. T/F
export function regExpFields(event) {
  console.log("regExpFields() 호출");
  const { name, value } = event.target;
  const regex = JOIN_VALID[name];
  if (regex) {
    return regex.test(value);
  }
}

// 이름과 값 넘겨서 유효성 검사하는 함수
export function regTest(name, value) {
  const regex = JOIN_VALID[name];
  if (regex) {
    return regex.test(value);
  }
}

export function createMessage(event) {
  console.log("createMessage() 호출");
  let name = event.target.name;
  // console.log("hintMsg : ", hintMsg[name]);
  let msg = hintMsg[name];
  alert(msg);
  return hintMsg[name];
}

// 이벤트 객체에서 name 속성 추출하는 이벤트 -> replace 함수 호출
// export function regTest(e) {
//   let name = e.target.name;
//   replaceChar(name);
// }

// 공통 replace 함수
export const onChangeExp = (e, validType) => {
  let data = e.target.value;
  console.log("dd :", validType);
  if (!regExpFields(e)) {
    // 입력값 지우기
    return data.replace(REPLACE_VALID[validType], "");
  }
};

export const VALID_TYPE = {
  // 한글
  KR: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  // 영문 + 숫자
  EN_NO: /[a-z|A-Z|0-9]/,
  // 영문, 숫자, 한글
  EN_KR_NO: /[a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9]/,
  // 숫자
  NO: /[0-9]/,
};
