function setup() {
  createCanvas(400, 400);
  // Initialize camera
  let constraints = {
    video: {
      facingMode: "user"
    },
    audio: false
  };
  let video = createCapture(constraints);
  video.size(400, 400);
  video.hide();
}

function draw() {
  background(220);
  // Display the camera feed
  image(video, 0, 0, width, height);
  
  // Game logic can be added here
}

// 新增遊戲邏輯：點擊螢幕改變背景顏色
function mousePressed() {
  background(random(255), random(255), random(255));
}