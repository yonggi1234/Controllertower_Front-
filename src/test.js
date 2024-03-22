const obj = {
  status: {
  name: 'Joe',
  age: 25,
  },
  sayNode: function () {
    console.log('Node');
  },
};

const {sayNode, status:{age}} = obj;
sayNode();
console.log(age);
