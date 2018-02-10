# next-ant-build-items
> Ant build group items based on next.

## install:
```bash
npm install -S afeiship/next-ant-build-items --registry=https://registry.npm.taobao.org
```

## usage:
```js
var arr = ['opt1', 'opt2', 'opt3'];
var rs1 = nx.antBuildItems(arr);
var rs2 = nx.antBuildItems(arr, true);


//rs1: use array index:
[ { text: 'opt1', value: 0 },
  { text: 'opt2', value: 1 },
  { text: 'opt3', value: 2 } ]

//rs2: use array item self
[ { text: 'opt1', value: 'opt1' },
  { text: 'opt2', value: 'opt2' },
  { text: 'opt3', value: 'opt3' } ]
```
