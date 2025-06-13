const video = document.getElementById('camera');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 啟用鏡頭
navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };
    })
    .catch(err => {
        if (err.name === 'NotFoundError') {
            alert('未找到攝像頭設備，請檢查是否已正確連接。');
        } else if (err.name === 'NotAllowedError') {
            alert('未授予攝像頭使用權限，請允許瀏覽器訪問攝像頭。');
        } else {
            alert(`無法啟用鏡頭: ${err.name}`);
        }
        console.error('錯誤詳情:', err);
    });

// 遊戲邏輯
function drawGame() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.save(); // 保存當前畫布狀態
        ctx.scale(-1, 1); // 水平翻轉畫布
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height); // 繪製翻轉後的畫面
        ctx.restore(); // 恢復畫布狀態
    }
    requestAnimationFrame(drawGame);
}

// 開始遊戲
video.addEventListener('play', () => {
    drawGame();
});
