(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');

  nx.antBuildItems = function (inArray, inUseSelf) {
    return inArray.map(function (item, index) {
      const value = inUseSelf ? item : index;
      return {
        label: item,
        value: value
      };
    });
  };


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.antBuildItems;
  }

}());
