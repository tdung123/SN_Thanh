
/* =========================================
   1. LỜI CHÚC SINH NHẬT
========================================= */

const birthdayMessage =
  "Chúc mừng sinh nhật tuổi 18 lần 3! " +
  "Chúc Thành một tuổi mới luôn ngập tràn niềm vui, " +
  "bình an và nhận được thật nhiều yêu thương. " +
  "Mong rằng mọi ước mơ của Thành sẽ sớm trở thành hiện thực. " +
  "Happy Birthday!!! 🎉";


/* =========================================
   2. LẤY CÁC PHẦN TỬ HTML
========================================= */

const giftBox = document.getElementById("giftBox");
const cakeImg = document.getElementById("cakeImg");
const cakeWrapper = document.getElementById("cakeWrapper");

const stepGift = document.getElementById("step-gift");
const stepCake = document.getElementById("step-cake");
const stepGallery = document.getElementById("step-gallery");

const btnNext = document.getElementById("btnNext");
const typedTextElement = document.getElementById("typed-text");
const bgMusic = document.getElementById("bgMusic");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================
   3. CẤU HÌNH STICKER
========================================= */

/*
  QUAN TRỌNG:

  Các tên sticker1.png, sticker2.png... bên dưới
  là tên mẫu.

  Bạn cần thay bằng tên file thực tế trong thư mục
  của mình nếu chúng khác tên mẫu.

  Ví dụ:
  Pic/Gian_1/meo.png
  Pic/Gian_1/heart.gif

  Chỉ cần sửa tên trong mảng, không phải sửa CSS.
*/

const stickerConfig = {
  gift: {
    container: "stickers-gift",
    folders: ["Pic"],
    files: [
      "Gian_dung_1",
      "Gian_khanh_1",
      "Gian_dung_2",
      "Gian_khanh_2"
    ],
    sizes: [120, 120, 120, 120],
    rotations: [-12, 10, -8, 12]
  },

  cake: {
    container: "stickers-cake",
    folders: ["Pic"],
    files: [
      "Gian_dung_3",
      "Gian_khanh_3",
      "Gian_dung_4",
      "Gian_khanh_4"
    ],
    sizes: [110, 110, 110, 110],
    rotations: [10, -12, 8, -10]
  }
};


/* =========================================
   4. TẠO STICKER TỰ ĐỘNG
========================================= */

function createStickers(config) {
  const container = document.getElementById(config.container);

  if (!container) return;

  container.replaceChildren();

  config.files.forEach((fileName, index) => {
    const img = document.createElement("img");

    img.className = "sticker";
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    img.draggable = false;

    const size = config.sizes[index] || 55;
    const rotation = config.rotations[index] || 0;

    img.style.setProperty("--sticker-size", `${size}px`);
    img.style.setProperty("--sticker-rotate", `${rotation}deg`);
    img.style.setProperty(
      "--sticker-speed",
      `${4 + (index % 3)}s`
    );
    img.style.setProperty(
      "--sticker-delay",
      `${index * 0.35}s`
    );

    /*
      Tìm ảnh trong các thư mục đã cấu hình.
      Thử lần lượt PNG, WEBP, JPG, JPEG và GIF.
    */

    const folders = config.folders;
    const extensions = ["png", "webp", "jpg", "jpeg", "gif"];

    const candidates = [];

    folders.forEach(folder => {
      extensions.forEach(extension => {
        candidates.push(
          `${folder}/${fileName}.${extension}`
        );
      });
    });

    let candidateIndex = 0;

    function tryNextImage() {
      if (candidateIndex >= candidates.length) {
        img.remove();
        console.warn(
          `Không tìm thấy sticker "${fileName}". ` +
          "Hãy kiểm tra lại tên file và đường dẫn."
        );
        return;
      }

      img.src = candidates[candidateIndex];
      candidateIndex++;
    }

    img.onerror = tryNextImage;

    img.onload = () => {
      img.onerror = null;
    };

    container.appendChild(img);
    tryNextImage();
  });
}


/* Khởi tạo sticker cho cả ba màn hình */

Object.values(stickerConfig).forEach(createStickers);


/* =========================================
   5. TẠO BONG BÓNG NỀN
========================================= */

function createBalloons() {
  const bgDecor = document.getElementById("bgDecor");

  if (!bgDecor || reducedMotion) return;

  const colors = [
    "#ff9bb5",
    "#ffd166",
    "#a9baff",
    "#d6b5ff",
    "#9be9d7"
  ];

  for (let i = 0; i < 18; i++) {
    const balloon = document.createElement("div");

    balloon.className = "balloon";
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDelay = `${Math.random() * 8}s`;
    balloon.style.animationDuration =
      `${7 + Math.random() * 7}s`;

    balloon.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    bgDecor.appendChild(balloon);
  }
}

createBalloons();


/* =========================================
   6. HIỆU ỨNG PHÁO GIẤY
========================================= */

function burstConfetti(options = {}) {
  if (typeof confetti !== "function") return;

  confetti({
    particleCount: 70,
    spread: 65,
    origin: { x: 0.5, y: 0.6 },
    colors: [
      "#ff6f91",
      "#ffd166",
      "#a8c8ff",
      "#c9b6ff",
      "#a8e6cf"
    ],
    ...options
  });
}

function celebrateTransition() {
  if (typeof confetti !== "function") return;

  if (reducedMotion) {
    burstConfetti({ particleCount: 30 });
    return;
  }

  const duration = 1200;
  const endTime = Date.now() + duration;

  function frame() {
    if (Date.now() >= endTime) return;

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 50,
      origin: { x: 0, y: 0.65 },
      colors: ["#ff6f91", "#ffd166", "#c9b6ff"]
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 50,
      origin: { x: 1, y: 0.65 },
      colors: ["#ff6f91", "#a8c8ff", "#a8e6cf"]
    });

    requestAnimationFrame(frame);
  }

  frame();
}


/* =========================================
   7. PHÁT NHẠC
========================================= */

function playAudio() {
  if (!bgMusic || !bgMusic.paused) return;

  bgMusic.play().catch(error => {
    console.warn(
      "Không thể phát nhạc. Hãy kiểm tra file nhạc và trình duyệt.",
      error
    );
  });
}


/* =========================================
   8. CHUYỂN ĐỔI GIỮA CÁC MÀN HÌNH
========================================= */

function showScreen(currentScreen, nextScreen) {
  currentScreen.classList.remove("active");
  currentScreen.classList.add("hidden");

  nextScreen.classList.remove("hidden");
  nextScreen.classList.add("active");
}


/* Màn 1 -> Màn 2 */

giftBox.addEventListener("click", () => {
  playAudio();

  burstConfetti({
    particleCount: 120,
    spread: 85,
    origin: { x: 0.5, y: 0.6 }
  });

  showScreen(stepGift, stepCake);

  startTypeWriter();
});


/* =========================================
   9. BÁNH SINH NHẬT & QUE DIÊM LỬA
========================================= */

let cakeState = "unlit";
let isHoldingMatch = false;

const cakeHint = document.getElementById("cakeHint");
const btnCandleAction = document.getElementById("btnCandleAction");
const matchstickCursor = document.getElementById("matchstickCursor");
const candleFlames = document.getElementById("candleFlames");

// Bắt đầu cầm que diêm
function startHoldingMatch(e) {
    if (cakeState !== "unlit") return;

    isHoldingMatch = true;

    document.body.classList.add("holding-match");

    if (matchstickCursor) {
        matchstickCursor.classList.add("active");
        matchstickCursor.style.left = e.clientX + "px";
        matchstickCursor.style.top = e.clientY + "px";
    }

    if (cakeHint) {
        cakeHint.textContent =
            "🔥 Đưa ngọn lửa que diêm đến đầu một cây nến nhé!";
    }

    playIgniteSound();
}

// Đốt nến
function igniteCandle() {
    if (!isHoldingMatch || cakeState !== "unlit") return;

    cakeState = "lit";
    isHoldingMatch = false;

    document.body.classList.remove("holding-match");

    if (matchstickCursor) {
        matchstickCursor.classList.remove("active");
    }

    // Hiện lửa trên các cây nến
    cakeWrapper.classList.add("candle-lit");

    playIgniteSound();

    if (cakeHint) {
        cakeHint.textContent =
            "✨ Nến đã sáng rồi! Chúc Thành có một sinh nhật thật vui vẻ! 🎂";
    }

    // Ẩn nút đốt sau khi hoàn thành
    if (btnCandleAction) {
        btnCandleAction.style.display = "none";
    }

    // Pháo chúc mừng
    burstConfetti({
        particleCount: 120,
        spread: 100,
        startVelocity: 45,
        origin: {
            x: 0.5,
            y: 0.55
        }
    });

    celebrateTransition();

    if (btnNext) {
        btnNext.classList.add("btn-highlight-pulse");
    }
}

// Di chuyển que diêm và kiểm tra đầu nến
function updateMatchstickPosition(clientX, clientY) {
    if (!isHoldingMatch || !matchstickCursor) return;

    matchstickCursor.style.left = clientX + "px";
    matchstickCursor.style.top = clientY + "px";

    if (!candleFlames) return;

    // Kiểm tra con trỏ có chạm gần đầu một trong 4 cây nến không
    const flames = candleFlames.querySelectorAll(".candle-flame");

    for (const flame of flames) {
        const rect = flame.getBoundingClientRect();

        const flameX = rect.left + rect.width / 2;
        const flameY = rect.top + rect.height / 2;

        const distance = Math.hypot(
            clientX - flameX,
            clientY - flameY
        );

        if (distance < 28) {
            igniteCandle();
            break;
        }
    }
}

// Theo dõi chuột
window.addEventListener("pointermove", e => {
    if (isHoldingMatch) {
        updateMatchstickPosition(e.clientX, e.clientY);
    }
});

// Nút bắt đầu lấy que diêm
if (btnCandleAction) {
    btnCandleAction.addEventListener("click", e => {
        e.stopPropagation();

        startHoldingMatch(e);
    });
}

/* =========================================
   10. HIỆU ỨNG GÕ CHỮ
========================================= */

let typingTimer = null;
let typingStarted = false;

function startTypeWriter() {
  if (typingStarted) return;

  typingStarted = true;
  typedTextElement.textContent = "";

  const cursor = document.querySelector(".typing-cursor");

  let index = 0;

  function typeNextCharacter() {
    if (index >= birthdayMessage.length) {
      if (cursor) cursor.style.display = "none";
      return;
    }

    typedTextElement.textContent += birthdayMessage.charAt(index);
    index++;

    typingTimer = setTimeout(
      typeNextCharacter,
      reducedMotion ? 0 : 35
    );
  }

  typeNextCharacter();
}


/* =========================================
   11. MÀN 2 -> MÀN 3
========================================= */

btnNext.addEventListener("click", () => {
  celebrateTransition();
  showScreen(stepCake, stepGallery);
});


/* =========================================
   12. MỞ BỐN HỘP QUÀ
========================================= */

const giftItems = document.querySelectorAll(".gift-item-box");

giftItems.forEach(item => {
  const giftCover = item.querySelector(".gift-cover");
  const photoCard = item.querySelector(".photo-card");

  if (!giftCover || !photoCard) return;

  giftCover.addEventListener("click", () => {
    /* Không mở lại nếu hộp quà đã được mở */

    if (giftCover.classList.contains("opened")) return;

    giftCover.classList.add("opened");

    /* Hiệu ứng pháo giấy */

    const rect = giftCover.getBoundingClientRect();

    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    burstConfetti({
      particleCount: 45,
      spread: 55,
      origin: {
        x: Math.max(0, Math.min(1, originX)),
        y: Math.max(0, Math.min(1, originY))
      }
    });

    /* Đóng hộp quà và mở ảnh */

    giftCover.style.display = "none";
    photoCard.classList.remove("hidden-photo");

    item.style.border = "none";
    item.style.background = "transparent";
    item.style.padding = "8px";
  });
});


/* =========================================
   13. HIỆU ỨNG CLICK STICKER GIÁN Ở GÓC ẢNH
========================================= */

const cornerRoaches = document.querySelectorAll(".corner-roach");

cornerRoaches.forEach(roach => {
  roach.addEventListener("click", e => {
    e.stopPropagation();

    const rect = roach.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    burstConfetti({
      particleCount: 35,
      spread: 60,
      origin: {
        x: Math.max(0, Math.min(1, originX)),
        y: Math.max(0, Math.min(1, originY))
      }
    });
  });
});


/* =========================================
   14. HIỆU ỨNG CLICK TRANG TRÍ ĐẦU ALBUM
========================================= */

const topDecors = document.querySelectorAll(".gallery-top-decor");

topDecors.forEach(decor => {
  decor.addEventListener("click", () => {
    const rect = decor.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    burstConfetti({
      particleCount: 45,
      spread: 75,
      origin: {
        x: Math.max(0, Math.min(1, originX)),
        y: Math.max(0, Math.min(1, originY))
      }
    });
  });
});
