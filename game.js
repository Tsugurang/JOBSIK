document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("game-area");
  const blurLayer = document.getElementById("blur-layer");
  

  // 커서 생성
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  const cloverSize = 70; // 클로버 크기
  const threeLeafCount = 50; // 세잎클로버 개수 감소
  const movementDistance = 50; // 주변 클로버 이동 거리
  const cloverData = [
      { image: "images/four-leaf.png", link: "마요네즈.html" },
      { image: "images/four-leaf.png", link: "비행기.html" },
      { image: "images/four-leaf.png", link: "송편.html" },
      { image: "images/four-leaf.png", link: "영화.html" },
      { image: "images/four-leaf.png", link: "우유.html" },
  ];

  // 커서 위치 추적
  let cursorX = 0;
  let cursorY = 0;

  // 마우스 이동 이벤트
  document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      // 커서의 중심을 마우스 중앙에 맞추기
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
  });

  // 링크 hover와 클릭 이벤트 추가
  document.addEventListener("mouseover", (e) => {
      if (e.target.tagName === "A") {
          cursor.classList.add("cursor_expand");
      }
  });

  document.addEventListener("mouseout", (e) => {
      if (e.target.tagName === "A") {
          cursor.classList.remove("cursor_expand");
      }
  });

  document.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "A") {
          cursor.classList.add("cursor_click");
      }
  });

  document.addEventListener("mouseup", (e) => {
      if (e.target.tagName === "A") {
          cursor.classList.remove("cursor_click");
      }
  });

  // 랜덤 위치 생성
  function getRandomPosition() {
      const x = Math.random() * (gameArea.clientWidth - cloverSize);
      const y = Math.random() * (gameArea.clientHeight - cloverSize);
      return { x, y };
  }

  // 클로버 생성
  function createClover(isFourLeaf = false, data = null) {
      const position = getRandomPosition();

      const clover = document.createElement("div");
      clover.classList.add("clover");
      clover.style.backgroundImage = `url(${isFourLeaf ? data.image : "images/three-leaf.png"})`;
      clover.style.left = `${position.x}px`;
      clover.style.top = `${position.y}px`;

      // Hover 효과
      clover.addEventListener("mouseenter", () => {
          const allClovers = document.querySelectorAll(".clover");
          allClovers.forEach((otherClover) => {
              if (otherClover !== clover) {
                  const rect1 = clover.getBoundingClientRect();
                  const rect2 = otherClover.getBoundingClientRect();
                  const distance = Math.hypot(rect1.x - rect2.x, rect1.y - rect2.y);
                  if (distance < 150) {
                      const angle = Math.atan2(rect2.y - rect1.y, rect2.x - rect1.x);
                      otherClover.style.transform = `translate(${Math.cos(angle) * movementDistance}px, ${Math.sin(angle) * movementDistance}px)`;
                  }
              }
          });
      });

      // Leave 효과
      clover.addEventListener("mouseleave", () => {
          document.querySelectorAll(".clover").forEach((otherClover) => {
              otherClover.style.transform = "translate(0, 0)";
          });
      });

      return clover;
  }

  // 게임 영역 채우기
  function populateGameArea() {
      gameArea.innerHTML = ""; // 클리어하지 않고 기존 커서를 유지
      gameArea.appendChild(blurLayer);

      // 네잎 클로버 생성
      cloverData.forEach((data) => {
          const fourLeafClover = createClover(true, data);
          gameArea.appendChild(fourLeafClover);
      });

      // 세잎 클로버 생성
      for (let i = 0; i < threeLeafCount; i++) {
          const clover = createClover();
          gameArea.appendChild(clover);
      }
  }

  // 초기화
  populateGameArea();
});

document.addEventListener("DOMContentLoaded", () => {
  const blurLayer = document.getElementById("blur-layer");
  const centerImage = document.getElementById("center-image");

  document.querySelectorAll(".clover").forEach((clover) => {
    clover.addEventListener("click", () => {
      if (clover.style.backgroundImage.includes("four-leaf")) {
        // 배경 블러 활성화
        blurLayer.style.display = "block";

        // 랜덤 데이터 선택
        const randomData = getRandomImageData();
        centerImage.style.backgroundImage = `url('${randomData.image}')`;

        // 첫 등장: 페이드인 애니메이션
        centerImage.style.opacity = "1"; // 보이도록 설정
        centerImage.style.animation = "fadeIn 1.5s ease forwards"; // 첫 등장 애니메이션

        // 첫 등장 애니메이션이 끝난 후 살랑거림 애니메이션 시작
        centerImage.addEventListener("animationend", (e) => {
          if (e.animationName === "fadeIn") {
            centerImage.style.animation = "sway 2s ease-in-out infinite"; // 살랑거림 애니메이션
          }
        });

        // 이미지 클릭 시 해당 링크로 이동
        centerImage.addEventListener("click", () => {
          window.location.href = randomData.link; // 이미지에 맞는 링크로 이동
        });
      }
    });
  });
});

const imageData = [
  { image: "images/four-leaf.png", link: "마요네즈.html" },
  { image: "images/four-leaf.png", link: "비행기.html" },
  { image: "images/four-leaf.png", link: "송편.html" },
  { image: "images/four-leaf.png", link: "영화.html" },
  { image: "images/four-leaf.png", link: "우유.html" },
  { image: "images/four-leaf.png", link: "페트병 꽃.html" },
  { image: "images/four-leaf.png", link: "link7.html" },
  { image: "images/four-leaf.png", link: "link8.html" },
  { image: "images/four-leaf.png", link: "link9.html" },
  { image: "images/four-leaf.png", link: "link10.html" },
  { image: "images/four-leaf.png", link: "link11.html" },
  { image: "images/four-leaf.png", link: "link12.html" },
  { image: "images/four-leaf.png", link: "link13.html" },
  { image: "images/four-leaf.png", link: "link14.html" },
  { image: "images/four-leaf.png", link: "link15.html" },
];


function getRandomImageData() {
  const randomIndex = Math.floor(Math.random() * imageData.length);
  return imageData[randomIndex];
}
document.addEventListener("mouseover", (e) => {
    const cursor = document.querySelector(".cursor");
  
    // .link 클래스가 있는 요소에 마우스를 올렸을 때 커서를 확대
    if (e.target.classList.contains("link")) {
      cursor.classList.add("cursor_expand");
    }
  });
  
  document.addEventListener("mouseout", (e) => {
    const cursor = document.querySelector(".cursor");
  
    // .link 클래스에서 마우스가 벗어나면 커서를 원래 크기로
    if (e.target.classList.contains("link")) {
      cursor.classList.remove("cursor_expand");
    }
  });
  