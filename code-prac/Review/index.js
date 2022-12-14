let AllData = [], allList = [];

var getData = [
  {
    title: "未入账",
    data: [
      {
        feeName: "考试费1",
        num: 2001,
      },
      {
        feeName: "考试费2",
        num: 2002,
      },
      {
        feeName: "考试费3",
        num: 2003,
      },
      {
        feeName: "考试费4",
        num: 2004,
      },
    ],
  },
];
for (var i in getData) {
  var a = {};
  var b = [];
  a["title"] = getData[i].title;
  var x = 0;
  var join = 0;
  getData[i].data.forEach(function (e) {
    x += 1;
    join += e.num;
    b.push({ feeName: e.feeName, key: "num" + x });
    a["num" + x] = e.num;
    a["join"] = join;
  });
  AllData.push(a);
  allList = b;
}

console.log(AllData)
console.log(allList)