$(document).ready(function () {
    const $cursor = $('.cursor');
    const $link = $('.link');
    let isMouseOverLink = false; // .link 요소 위에 마우스가 있는지 추적
    let isMouseDown = false; // 마우스 버튼이 눌려 있는지 추적
    let viewportX = 0; // 뷰포트 기준 X 좌표
    let viewportY = 0; // 뷰포트 기준 Y 좌표

    // 커서 상태 업데이트 - $link 위에 있거나 마우스 버튼이 눌려있으면 확대
    function updateCursor() {
        if (isMouseOverLink || isMouseDown) {
            $cursor.addClass('cursor_expand');
        } else {
            $cursor.removeClass('cursor_expand');
        }
    }

    // 커서 위치를 업데이트하는 함수
    function updateCursorPosition() {
        const cursorWidth = $cursor.outerWidth();
        const cursorHeight = $cursor.outerHeight();
        $cursor.css({
            left: (viewportX - cursorWidth / 2) + 'px', // 마우스 중심에 위치
            top: (viewportY - cursorHeight / 2) + 'px' // 마우스 중심에 위치
        });
    }

    // 마우스 이동 시 좌표를 추적
    $(document).mousemove(function (e) {
        viewportX = e.clientX; // 뷰포트 기준 X 좌표
        viewportY = e.clientY; // 뷰포트 기준 Y 좌표
        updateCursorPosition(); // 위치 업데이트
        updateCursor(); // 상태 업데이트
    });

    // .link 요소에 마우스 오버 시 isMouseOverLink 업데이트
    $link.mouseenter(function () {
        isMouseOverLink = true;
        updateCursor();
    }).mouseleave(function () {
        isMouseOverLink = false;
        updateCursor();
    });

    // 마우스 버튼 누름/뗌에 따라 isMouseDown 업데이트
    $(document).mousedown(function () {
        isMouseDown = true;
        updateCursor();
    }).mouseup(function () {
        isMouseDown = false;
        updateCursor();
    });

    // 초기화: 페이지 로드 시 커서 위치를 중앙에 설정
    $(window).on('load', function () {
        viewportX = window.innerWidth / 2;
        viewportY = window.innerHeight / 2;
        updateCursorPosition();
    });
});
