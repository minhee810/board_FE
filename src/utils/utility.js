// 공통 널값 체크
export const isRequired = (value) => (value === "" ? false : true);

// 날짜 포맷팅 함수
export function dateFormat(date) {
  var year = date.substring(0, 4);
  var month = date.substring(5, 7);
  var day = date.substring(8, 10);
  var fmtDate = year + "-" + month + "-" + day;

  return fmtDate;
}

export function padTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

export function getFormattedDate(org) {
  const date = new Date(org);

  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}

// 값 일치 체크
export function isMatch(str1, str2) {
  return str1 === str2;
}

let isAlertShown = false;

function showAlert(message) {
  if (!isAlertShown) {
    isAlertShown = true;
    alert(message);
    isAlertShown = false;
  }
}
