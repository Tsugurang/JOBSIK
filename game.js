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
      { image: "images/four-leaf.png"},
      { image: "images/four-leaf.png"},
      { image: "images/four-leaf.png"},
      { image: "images/four-leaf.png"},
      { image: "images/four-leaf.png"},
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
  const cloverData = [
    { image: "images/네잎/감자튀김 띠지.png", link: "감자튀김.html" },
    { image: "images/네잎/개미집 띠지.png", link: "개미집.html" },
    { image: "images/네잎/돼지 띠지.png", link: "돼지저금통.html" },
    { image: "images/네잎/라면 띠지.png", link: "라면.html" },
    { image: "images/네잎/마요네즈 띠지.png", link: "마요네즈.html" },
    { image: "images/네잎/송편 띠지.png", link: "송편.html" },
    { image: "images/네잎/에스컬레이터 띠지.png", link: "에스컬레이터.html" },
    { image: "images/네잎/영화 띠지.png", link: "영화.html" },
    { image: "images/네잎/우유 띠지.png", link: "우유.html" },
    { image: "images/네잎/유리 띠지.png", link: "거울.html" },
    { image: "images/네잎/자갈 띠지.png", link: "자갈.html" },
    { image: "images/네잎/창문 띠지.png", link: "비행기.html" },
    { image: "images/네잎/쿠킹호일 띠지.png", link: "쿠킹호일.html" },
    { image: "images/네잎/튜브 띠지.png", link: "튜브.html" },
    { image: "images/네잎/페트병 꽃 띠지.png", link: "페트병 꽃.html" },
  ];

  function getRandomImageData() {
    const randomIndex = Math.floor(Math.random() * cloverData.length);
    return cloverData[randomIndex];
  }

  document.querySelectorAll(".clover").forEach((clover) => {
    clover.addEventListener("click", () => {
      if (clover.style.backgroundImage.includes("four-leaf")) {
        // 블러 활성화 및 네잎클로버 중앙 표시
        blurLayer.style.display = "block";
        centerImage.style.backgroundImage = `url('images/four-leaf.png')`;
        centerImage.style.opacity = "1";
        centerImage.classList.remove("no-animation"); // 네잎클로버에는 애니메이션 적용

        // 3초 후 랜덤 이미지로 변경 (애니메이션 없이)
        setTimeout(() => {
          const randomData = getRandomImageData();
          centerImage.style.backgroundImage = `url('${randomData.image}')`;

          // 랜덤 이미지 크기 키우기
          centerImage.style.width = "500px";  // 크기 조정
          centerImage.style.height = "500px"; // 크기 조정

          // 랜덤 이미지에는 애니메이션 제거
          centerImage.classList.add("no-animation");

          // 클릭 시 링크로 이동 설정
          centerImage.onclick = () => {
            window.location.href = randomData.link;
          };
        }, 3000);  // 3초 후 랜덤 이미지 변경
      }
    });
  });
});



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
  