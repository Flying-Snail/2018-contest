/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
class AllFunctionO {
  constructor(ctx, items, colors, canvas) {
    this.ctx = ctx;
    this.items = items;
    this.colors = colors;
    this.canvas = canvas;
    this.moveArr = [];
    this.times = 1;
    // 生成程序中的随机数
    this.randomNum = function randomNum() {
      // 随机位置[0,3]
      const randomIndex = parseInt(Math.random() * 4, 10);
      // 2或四的随机数
      const twoOrFour = (parseInt(Math.random() * 2, 10) + 1) * 2;
      return {
        randomIndex,
        twoOrFour,
      };
    };
    this.initBackground = function initBackground() {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // 绘制初始图形，为16个底色块儿
      for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < 4; j += 1) {
          ctx.fillStyle = 'rgb(205, 193, 180)';
          ctx.fillRect((j * 120) + 20, (i * 120) + 20, 100, 100);
        }
      }
    };
    this.move = function move() {
      const arr = this.moveArr;
      const { times } = this;
      this.initBackground();
      for (let i = 0, len = arr.length; i < len; i++) {
        const nowMoveArr = arr[i];
        const nowI = nowMoveArr[0]; const nowJ = nowMoveArr[1];
        const colorNum = items[nowI][nowJ];
        const eachMoveLen = times * (nowMoveArr[3] / 10);
        let xB; let yB; let xT; let yT;
        switch (nowMoveArr[2]) {
          case 'r':
            // 当右滑时
            xB = (nowJ * 120) + 20 + eachMoveLen;
            yB = (nowI * 120) + 20;
            xT = (nowJ * 120) + 30 + eachMoveLen;
            yT = (nowI * 120) + 70;
            ctx.fillStyle = this.colors[(Math.log(colorNum) / Math.log(2)) - 1];
            ctx.fillRect(xB, yB, 100, 100);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgb(187, 173, 165)';
            ctx.fillText(colorNum, xT, yT);
            break;
          case 'l':
            // 左滑
            xB = ((nowJ * 120) + 20) - eachMoveLen;
            yB = (nowI * 120) + 20;
            xT = ((nowJ * 120) + 30) - eachMoveLen;
            yT = (nowI * 120) + 70;
            ctx.fillStyle = this.colors[(Math.log(colorNum) / Math.log(2)) - 1];
            ctx.fillRect(xB, yB, 100, 100);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgb(187, 173, 165)';
            ctx.fillText(colorNum, xT, yT);
            break;
          case 'd':
            // 下滑
            xB = (nowJ * 120) + 20;
            yB = (nowI * 120) + 20 + eachMoveLen;
            xT = (nowJ * 120) + 30;
            yT = (nowI * 120) + 70 + eachMoveLen;
            ctx.fillStyle = this.colors[(Math.log(colorNum) / Math.log(2)) - 1];
            ctx.fillRect(xB, yB, 100, 100);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgb(187, 173, 165)';
            ctx.fillText(colorNum, xT, yT);
            break;
          case 't':
            // 上滑
            xB = ((nowJ * 120) + 20);
            yB = (nowI * 120) + 20 + eachMoveLen;
            xT = (nowJ * 120) + 30;
            yT = ((nowI * 120) + 70) - eachMoveLen;
            ctx.fillStyle = this.colors[(Math.log(colorNum) / Math.log(2)) - 1];
            ctx.fillRect(xB, yB, 100, 100);
            ctx.fillStyle = 'rgb(187, 173, 165)';
            ctx.fillText(colorNum, xT, yT);
            break;
          default:
            break;
        }
      }
    };
    // 判断当前行或列是否有值
    this.nowLineHasValue = function nowLineHasValue(arr) {
      for (let i = 0; i < 4; i += 1) {
        if (arr[i] !== 0) {
          return true;
        }
      }
      return false;
    };
    this.changeThisLine = function changeThisLine(dir, thisline) {
      const arr1 = [0, 0, 0, 0];
      let arr2 = [0, 0, 0, 0];
      // toRight or toDown
      if (dir === 'r' || dir === 'd') {
        let end = 3;
        for (let i = 3; i >= 0; i -= 1) {
          if (thisline[i]) arr1[end--] = thisline[i];
        }

        if (end === 2) {
          arr2 = arr1;
        } else if (end === 1) {
          if (arr1[3] === arr1[2]) {
            arr2 = [0, 0, 0, arr1[2] + arr1[3]];
          } else {
            arr2 = arr1;
          }
        } else if (end === 0) {
          if (arr1[3] === arr1[2]) {
            arr2 = [0, 0, arr1[1], arr1[2] + arr1[3]];
          } else if (arr1[2] === arr1[1]) {
            arr2 = [0, 0, arr1[1] + arr1[2], arr1[3]];
          } else {
            arr2 = arr1;
          }
        } else if (end === -1) {
          if (arr1[3] === arr1[2] && arr1[1] === arr1[0]) {
            arr2 = [0, 0, arr1[0] + arr1[1], arr1[2] + arr1[3]];
          } else if (arr1[3] === arr1[2] && arr1[1] !== arr1[0]) {
            arr2 = [0, arr1[0], arr1[1], arr1[2] + arr1[3]];
          } else if (arr1[3] !== arr1[2] && arr1[2] === arr1[1]) {
            arr2 = [0, arr1[0], arr1[1] + arr1[2], arr1[3]];
          } else if (
            arr1[3] !== arr1[2] &&
            arr1[2] !== arr1[1] &&
            arr1[1] === arr1[0]
          ) {
            arr2 = [0, arr1[0] + arr1[1], arr1[2], arr1[3]];
          } else if (
            arr1[3] !== arr1[2] &&
            arr1[2] !== arr1[1] &&
            arr1[1] !== arr1[0]
          ) {
            arr2 = arr1;
          }
        }
      } else if (dir === 'l' || dir === 't') {
        // toLeft or toTop
        let end = 0;
        for (let i = 0; i < 4; i += 1) {
          if (thisline[i]) arr1[end++] = thisline[i];
        }
        if (end === 1) {
          arr2 = arr1;
        } else if (end === 2) {
          if (arr1[0] === arr1[1]) {
            arr2 = [arr1[0] + arr1[1], 0, 0, 0];
          } else {
            arr2 = arr1;
          }
        } else if (end === 3) {
          if (arr1[0] === arr1[1]) {
            arr2 = [arr1[0] + arr1[1], arr1[2], 0, 0];
          } else if (arr1[1] === arr1[2]) {
            arr2 = [arr1[0], arr1[1] + arr1[2], 0, 0];
          } else {
            arr2 = arr1;
          }
        } else if (end === 4) {
          if (arr1[0] === arr1[1] && arr1[2] === arr1[3]) {
            arr2 = [arr1[0] + arr1[1], arr1[2] + arr1[3], 0, 0];
          } else if (arr1[0] === arr1[1] && arr1[2] !== arr1[3]) {
            arr2 = [arr1[0] + arr1[1], arr1[2], arr1[3], 0];
          } else if (arr1[0] !== arr1[1] && arr1[1] === arr1[2]) {
            arr2 = [arr1[0], arr1[1] + arr1[2], arr1[3], 0];
          } else if (
            arr1[0] !== arr1[1] &&
            arr1[1] !== arr1[2] &&
            arr1[2] === arr1[3]
          ) {
            arr2 = [arr1[0], arr1[1], arr1[2] + arr1[3], 0];
          } else if (
            arr1[0] !== arr1[1] &&
            arr1[1] !== arr1[2] &&
            arr1[2] !== arr1[3]
          ) {
            arr2 = arr1;
          }
        }
      }
      return arr2;
    };
  }


  calculate(dir, items) {
    const myItems = items;
    // 判断滑动方向，左右化时，把当前行传入changeThisLine，上下滑把当前列传入changeThisLine
    // changeThisLine返回当前操作返回的结果数组（只能为一行或一列）
    if (dir === 'r' || dir === 'l') {
      // 左右滑
      for (let i = 0; i < 4; i += 1) {
        if (this.nowLineHasValue(items[i])) {
          const nowLine = this.changeThisLine(dir, items[i]);
          myItems[i] = nowLine;
        }
      }
    } else if (dir === 'd' || dir === 't') {
      // 上下滑
      for (let i = 0; i < 4; i += 1) {
        if (this.nowLineHasValue([
          items[0][i],
          items[1][i],
          items[2][i],
          items[3][i],
        ])) {
          const nowLine = this.changeThisLine(dir, [
            items[0][i],
            items[1][i],
            items[2][i],
            items[3][i],
          ]);
          [myItems[0][i], myItems[1][i], myItems[2][i], myItems[3][i]] = nowLine;
        }
      }
    }
    return myItems;
  }

  draw(ctx, items) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const colorNum = items[i][j];
        if (colorNum === 0) {
          ctx.fillStyle = 'rgb(205, 193, 180)';
          ctx.fillRect((j * 120) + 20, (i * 120) + 20, 100, 100);
        } else {
          ctx.fillStyle = this.colors[(Math.log(colorNum) / Math.log(2)) - 1];
          ctx.fillRect((j * 120) + 20, (i * 120) + 20, 100, 100);
          ctx.font = '30px Arial';
          ctx.fillStyle = 'rgb(187, 173, 165)';
          ctx.fillText(colorNum, (j * 120) + 30, (i * 120) + 70);
        }
      }
    }
  }

  static overOrWin(items) {
    let gameStatus = 'next';
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (items[i][j] === 2048) {
          gameStatus = 'win';
        } else if (
          items[i][j] === 0 ||
          (i + 1 === 4 && j + 1 < 4 && items[i][j] === items[i][j + 1]) ||
          (j + 1 === 4 && i + 1 < 4 && items[i][j] === items[i + 1][j]) ||
          (i + 1 < 4 &&
            j + 1 < 4 &&
            (items[i][j] === items[i][j + 1] || items[i][j] === items[i + 1][j]))
        ) {
          return 'next';
        }
      }
    }
    gameStatus = 'over';
    return gameStatus;
  }

  creatNewBlock(ctx, items) {
    const nowItems = items;
    // this.randomNum().randomIndex生成[0 - 3]随机数
    const nowIndexX = this.randomNum().randomIndex;
    const nowIndexY = this.randomNum().randomIndex;
    // 生成坐标[0,0] - [3,3]，即随机生成[0,0] - [3,3]的块儿
    // 如果当前位置已经有值，再次判定，否则生成新块
    if (items[nowIndexX][nowIndexY] === 0) {
      const creatN = this.randomNum().twoOrFour;
      nowItems[nowIndexX][nowIndexY] = creatN;
      const colorIndex = (Math.log(creatN) / Math.log(2)) - 1;
      ctx.fillStyle = this.colors[colorIndex];
      ctx.fillRect((nowIndexY * 120) + 20, (nowIndexX * 120) + 20, 100, 100);
      ctx.font = '30px Arial';
      ctx.fillStyle = 'rgb(187, 173, 165)';
      ctx.fillText(creatN, (nowIndexY * 120) + 30, (nowIndexX * 120) + 70);
    } else {
      this.creatNewBlock(this.ctx, this.items);
    }
  }

  static copy(arr) {
    const arrCopy = [[], [], [], []];
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        arrCopy[i][j] = arr[i][j];
      }
    }
    return arrCopy;
  }

  static arrSame(arr1, arr2) {
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (arr1[i][j] !== arr2[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  // 生成程序中的随机数
  static randomNum() {
    // 随机位置[0,3]
    const randomIndex = parseInt(Math.random() * 4, 10);
    // 2或四的随机数
    const twoOrFour = (parseInt(Math.random() * 2, 10) + 1) * 2;
    return {
      randomIndex,
      twoOrFour,
    };
  }

  static win() {
    document.getElementById('append').innerHTML =
      `<div id="gameStatus">
        <p>You Win!</p>
        <button class="confirmB" onclick = "init()">确认</button>
      </div>`;
  }

  static over() {
    document.getElementById('append').innerHTML =
      `<div id="gameStatus">
        <p>Game Over!</p>
        <button class="confirmB" onclick = "init()">确认</button>
      </div>`;
  }

  calculateMove(ctx, items, dir) {
    if (dir === 'r' || dir === 'd') {
      for (let i = 0; i < 4; i += 1) {
        let thisline = [];
        if (dir === 'r') {
          thisline = items[i];
        } else {
          thisline = [
            items[0][i],
            items[1][i],
            items[2][i],
            items[3][i],
          ];
        }
        if (this.nowLineHasValue(thisline)) {
          // 当前行有值
          let moveL = 0; const arr1 = thisline; let end = 3;
          for (let k = 0; k < 4; k += 1) {
            for (let j = end; j >= 0; j -= 1) {
              if (arr1[j] === 0) {
                moveL += 120;
              } else {
                if (dir === 'r') {
                  this.moveArr.push([i, j, dir, moveL]);
                } else {
                  this.moveArr.push([j, i, dir, moveL]);
                }
                moveL = 0;
                arr1[end--] = thisline[j];
                arr1[j] = 0;
                break;
              }
            }
          }
        }
      }
    } else if (dir === 't' || dir === 'l') {
      for (let i = 0; i < 4; i += 1) {
        let thisline = [];
        if (dir === 'l') {
          thisline = items[i];
        } else {
          thisline = [
            items[0][i],
            items[1][i],
            items[2][i],
            items[3][i],
          ];
        }
        if (this.nowLineHasValue(thisline)) {
          // 当前行有值
          let moveL = 0; const arr1 = thisline; let end = 0;
          for (let k = 0; k < 4; k += 1) {
            for (let j = end; j < 4; j += 1) {
              if (arr1[j] === 0) {
                moveL += 120;
              } else {
                if (dir === 'l') {
                  this.moveArr.push([i, j, dir, moveL]);
                } else {
                  this.moveArr.push([j, i, dir, moveL]);
                }
                moveL = 0;
                arr1[end++] = thisline[j];
                arr1[j] = 0;
                break;
              }
            }
          }
        }
      }
    }
    return this.moveArr;
  }
}

