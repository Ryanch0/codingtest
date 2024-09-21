// stack 기본문제
// (), {}, [] 짝맞추기 예제
const stackFunction = (s) => {

  const stack = []

  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  const answer = s.map(item => {
    for (const str of item) {
      if (str === '(' || str === '{' || str === '[') {
        stack.push(str)
      } else if (stack.length === 0 || stack.pop() !== map[str]) {
        return false
      }


    }
    return stack.length === 0 ? true : false
  })

  return answer


}

stackFunction(["(){}[]", "([{}])", "([])}"])


//   dfs 기본문제
// 문제 : 2차원 배열이 주어질때, 1은 땅이고 0은 물이다. 배열에서 연결된 땅의 갯수를 찾아라

const island = (grid) => {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;


  function dfs(x, y) {
    if (y < 0 || y >= cols || x < 0 || x >= rows || grid[x][y] === 0) {
      return;
    }

    grid[x][y] = 0

    dfs(x, y - 1)
    dfs(x, y + 1)
    dfs(x + 1, y)
    dfs(x - 1, y)
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++
        dfs(i, j)
      }
    }
  }

  console.log(count)
  return count

}

island([
  [1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 1, 1]
])

//   queue 기본문제
// 여러 문서를 인쇄하기 위해 대기중이다. 각 문서에는 중요도가 매겨져 있으며 더 높은 중요도의 문서가 먼자 인쇄된다.
// 주어진 중요도 순서에 따라 문서가 인쇄되는 순서를 구하라

function printerQueue(priorities, location) {
  let queue = priorities.map((item, idx) => ({ item: item, idx: idx })) // '문서와 인덱스 객체로 저장'
  let printOrder = 0; // '인쇄 순서'


  while (queue.length > 0) {
    const current = queue.shift()
    const highPriority = queue.some(doc => doc.item > current.item)

    if (highPriority) {
      queue.push(current)
    } else {
      printOrder++
      if (current.idx === location) {
        console.log(printOrder)
        return printOrder
      }
    }
  }
}

printerQueue([1, 1, 9, 1, 1, 1], 0)

// 이진탐색문제
// 배열에서 target의 인덱스를 찾아라
function binarySearch(arr1, target) {
  // find target index
  const arr = arr1.map((item, idx) => ({ item, idx }))
  arr.sort((a, b) => a.item - b.item)
  console.log(arr)

  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2)

  while (left <= right) {
    if (target === arr[mid].item) {
      console.log(arr[mid].idx)
      return arr[mid].idx;
    } else if (arr[mid].item < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}

binarySearch([1, 2, 3, 6, 7, 4, 19], 4)

// 소수 만들기
// 주어진 숫자중 서로다른 3개의 수를 더해 만들수있는 경우의 수 중에서 소수의 갯수를 찾아라
function solution(nums) {

  const arr = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        arr.push(nums[i] + nums[j] + nums[k])
      }
    }
  }

  console.log(arr)


  const answer = arr.filter(item => {
    const temp = []
    for (let i = 1; i <= Math.sqrt(item); i++) {
      if (item % i === 0) {
        temp.push(i)
      } if (item % i === 0 && i !== item / i) {
        temp.push(item / i)
      }
    }
    console.log(temp)

    if (temp.length === 2) {
      return true
    }
  })
  return answer.length

}
solution([1, 2, 3, 4])

// 비밀지도 찾기
// 입력으로 지도의 한 변 크기 n 과 2개의 정수 배열 arr1, arr2가 들어온다.
// 각 배열의 이진수를 비트 OR 연산자로 합하라
// 최종 비밀지도에서 1은 '#'으로, 0은 공백으로 처리하라
const secretMap = (n, arr1, arr2) => {
  const sumArr = []

  for (let i = 0; i < n; i++) {
    let sum = (arr1[i] | arr2[i]).toString(2).padStart(n, '0')
    sumArr.push(sum)
  }

  const answer = sumArr.map(item => {
    return item.replace(/1/g, '#').replace(/0/g, ' ')
  })

  return answer
}

secretMap(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28])