/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
class AllFunctionO {
  constructor(ctx, items, colors) {
    this.ctx = ctx;
    this.items = items;
    this.colors = colors;
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


  calculate(event, items) {
    const myItems = items;
    // 判断滑动方向，左右化时，把当前行传入changeThisLine，上下滑把当前列传入changeThisLine
    // changeThisLine返回当前操作返回的结果数组（只能为一行或一列）
    let dir = '';
    switch (event.keyCode) {
      case 39:
        dir = 'r';
        break;
      case 37:
        dir = 'l';
        break;
      case 40:
        dir = 'd';
        break;
      case 38:
        dir = 't';
        break;
      default:
        break;
    }

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
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const colorNum = items[i][j];
        if (colorNum === 0) {
          ctx.fillStyle = 'rgb(205, 193, 180)';
          ctx.fillRect((j * 120) + 20, (i * 120) + 20, 100, 100);
        } else {
          ctx.fillStyle = this.colors[(Math.log(colorNum) / Math.log(2)) - 1];
          ctx.fillRect((j * 120) + 20, (i * 120) + 20, 100, 100);
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

  // //  判断是否产生新的块儿
  // isCreat(ctx, items) {
  //   // 如果发现16个位置任意位置值为零，生成新块儿。否则什么都不做。
  //   for (let i = 0; i < 4; i += 1) {
  //     for (let j = 0; j < 4; j += 1) {
  //       if (items[i][j] === 0) {
  //         this.creatNewBlock(this.ctx, this.items);
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }
}

