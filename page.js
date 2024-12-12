document.addEventListener("DOMContentLoaded", function () {
    const expandCircle = document.querySelector(".expand-circle");
    const content = document.getElementById("content");

    // 애니메이션 완료 후 콘텐츠 표시
    expandCircle.addEventListener('animationend', () => {
        expandCircle.style.visibility = "hidden"; // 검정 원 숨기기
        content.style.visibility = "visible"; // 콘텐츠 표시
    });
});

// .link 요소에 마우스 오버 시 isMouseOverLink 업데이트
$link.mouseenter(function() {
    isMouseOverLink = true;
    updateCursor();
}).mouseleave(function() {
    isMouseOverLink = false;
    updateCursor();
});