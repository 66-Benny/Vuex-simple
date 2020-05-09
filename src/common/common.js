var that = this;
export default {
  transformSwitchValue(val) {
    return val ? "是" : "否";
  },
  transformDateValue(val, innerText) {
    return `${val[0]} ${innerText} ${val[1]}`;
  },
  getKeyType(sourceKey) {
    let key = Object.prototype.toString.call(this.form[sourceKey]);
    let type = "";
    if (key === "[object String]") {
      type = "";
    } else if (key === "[object Number]") {
      type = 0;
    } else if (key === "[object Boolean]") {
      type = false;
    } else if (key === "[object Undefined]") {
      type = undefined;
    } else if (key === "[object Null]") {
      type = null;
    } else if (key === "[object Date]") {
      type = new Date();
    } else if (key === "[object Array]") {
      type = [];
    }
    return type;
  },
  isEmpty(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    // 本身为空直接返回true
    if (obj == null) return true;
    // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (obj) return false;
    //最后通过属性长度判断。
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    if (obj == "") return true;
    return true;
  },
  getFormItemLabelName(key, childrenValue) {
    const item = this.arrayFind(
      childrenValue,
      component => component.prop === key
    );
    return item.label;
  },
  getFormItemValue(key, childrenValue) {
    const item = this.arrayFind(
      childrenValue,
      component => component.prop === key
    );
    const itemClassName = item.$children[1].$el.className;
    let itemValue = "";
    if (itemClassName.indexOf("el-checkbox-group") !== -1) {
      itemValue = item.$children[1].value;
    } else if (itemClassName.indexOf("el-select") !== -1) {
      itemValue = item.$children[1].selectedLabel;
    } else if (itemClassName.indexOf("el-input") !== -1) {
      itemValue = item.$children[1].value;
    } else if (itemClassName.indexOf("el-col-11") !== -1) {
      itemValue = this.transformDateValue(
        item.fieldValue,
        item.$children[1].$el.innerText
      );
    } else if (itemClassName.indexOf("el-switch") !== -1) {
      itemValue = this.transformSwitchValue(item.fieldValue);
    } else if (itemClassName.indexOf("el-radio-group") !== -1) {
      itemValue = item.$children[1].value;
    } else if (itemClassName.indexOf("el-textarea") !== -1) {
      itemValue = item.$children[1].value;
    }
    // if (Object.prototype.toString.call(itemValue) === "[object String]") {
    //   itemValue = itemValue.split();
    // }
    return itemValue;
  },
  arrayFind(arr, pred) {
    const idx = this.arrayFindIndex(arr, pred);
    return idx !== -1 ? arr[idx] : undefined;
  },
  arrayFindIndex(arr, pred) {
    for (let i = 0; i !== arr.length; ++i) {
      if (pred(arr[i])) {
        return i;
      }
    }
    return -1;
  }
};
