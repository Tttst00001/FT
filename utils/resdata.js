function RD(arr){
  let finalArr = []
  arr.items.forEach(item => {
    let obj = {};
    item.forEach((v, i) => {
      obj[arr.fields[i]] = v;
    })
    finalArr.push(obj)
  });
  return finalArr
}

module.exports = RD