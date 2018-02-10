var assert = require('assert');
var nx = require('next-js-core2');
require('../src/next-ant-build-items');

describe('next/antBuildItems', function () {

  it('nx.antBuildItems', function () {

    var arr = ['opt1', 'opt2', 'opt3'];
    var rs1 = nx.antBuildItems(arr);
    var rs2 = nx.antBuildItems(arr, true);


    // value use index:
    assert.deepEqual(rs1, [
      {
        text: 'opt1',
        value: 0
      }, {
        text: 'opt2',
        value: 1
      }, {
        text: 'opt3',
        value: 2
      }
    ]);

    // value use text:
    assert.deepEqual(rs2, [
      {
        text: 'opt1',
        value: 'opt1'
      }, {
        text: 'opt2',
        value: 'opt2'
      }, {
        text: 'opt3',
        value: 'opt3'
      }
    ]);


  });

});
