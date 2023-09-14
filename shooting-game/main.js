//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList = []; //총알들을 저장하는 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 20;
    this.y = spaceshipY;

    bulletList.push(this);
  };

  this.update = function () {
    this.y -= 7;
  };
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.gif";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.jpg";
}

let keysDown = {};
function setupKeyboardListner() {
  document.addEventListener("keydown", function (event) {
    // console.log("무슨 키가 눌렸어?", event.key);
    keysDown[event.key] = true;
    // console.log(keysDown);
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];
    // console.log("버튼 클릭후", keysDown);

    if (event.key == 32) {
      createBullet(); // 총알 생성
    }
  });
}

function createBullet() {
  console.log(aaaaaaaaa);
  let b = new Bullet();
  b.init();
  console.log("새로운 총알 리스트", bulletList);
}

function update() {
  if (39 in keysDown) {
    spaceshipX += 3; //우주선 속도
  } //right ArrowRight

  if (37 in keysDown) {
    spaceshipX -= 3;
  } //left ArrowLeft

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }
  //우주선의 좌표값이 무한대로 업데이트가 되는게 아닌 경기장 안에서만 있게 하려면...?

  //총일의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update(); // 좌표값을 업데이트하고
  render(); // 그려주고
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListner();
main();

// 방향키 누르면
// 우주선이 xy 좌표가 바뀌고
// 다시 render 그려둔다

//우주선이 오른쪽으로 간다: x좌표의 값이 증가한다
//우주선의 왼쪽으로 간다: y좌표의 값이 감소한다

//총알만들기
//1. 스페이스바 누르면 발사
//2. 총알이 위로 발사 = y값이 --(Y좌표의 값이 줄어듬), x값은 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알이 배열에 저장을 한다
//4. 총알들은 x,y좌표값이 있어야 항다
//5. 총알 배열을 가지고 render 그려준다


//1. 적군은 위치가 랜덤하다
//2. 적군은 밑으로 내려온다
//3. 1초마다 하나씩 적군이 나온다
//4. 적군의 우주선이 바닥에 닿으면 게임 어버
//5. 