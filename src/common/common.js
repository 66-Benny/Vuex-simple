export default {
  transformSwitchValue(val) {
    return val ? "是" : "否";
  },
  transformDateValue(val, innerText) {
    return `${val[0]} ${innerText} ${val[1]}`;
  }
};
