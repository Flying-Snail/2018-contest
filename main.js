/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// 获取画布
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// allFunc是所有需要用到的工具函数的封装类
let allFunc = null;
// 初始数组，每个位置值都为零
let items = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
// 颜色数组
const colors = [
  '#eee4da',
  '#ece0ca',
  '#f2b179',
  '#ec8d53',
  '#f57c5f',
  '#e95839',
  '#f4d86d',
  '#f1d04b',
  '#e4c02a',
  '#e3ba14',
  '#ecc400',
];

// 初始化画布
function init() {
  items = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  allFunc = new AllFunctionO(ctx, items, colors);
  // 清空虚拟对话框
  document.getElementById('append').innerHTML = '';
  // 绘制初始图形，为16个底色块儿
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      ctx.fillStyle = 'rgb(205, 193, 180)';
      ctx.fillRect((j * 120) + 20, (i * 120) + 20, 100, 100);
    }
  }
  // 创建两个新块儿
  allFunc.creatNewBlock(ctx, items);
  allFunc.creatNewBlock(ctx, items);
}

init();

// 键盘按下时触发的事件
function myMove(event) {
  if (event && event.keyCode >= 37 && event.keyCode <= 40) {
    // 储存当前数组改变之前的状态和计算改变后的状态
    const oldArr = AllFunctionO.copy(items);
    const newArr = allFunc.calculate(event, items);
    // 重绘新的的内容
    allFunc.draw(ctx, items);
    // 判断是否胜利
    if (AllFunctionO.overOrWin(items) === 'win') {
      AllFunctionO.win();
    } else if (!AllFunctionO.arrSame(oldArr, newArr)) {
      // 未胜利的话判断新旧数组是否相等
      // 不相等生成新块
      allFunc.creatNewBlock(ctx, items);
      // 生成新块后判定游戏是否失败
      if (AllFunctionO.overOrWin(items) === 'over') {
        AllFunctionO.over();
      }
    }
  }
  return false;
}
