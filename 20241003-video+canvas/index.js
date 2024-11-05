window.onload = () => {
    // 创建一个虚拟video元素
    const videoEl = document.createElement("video");
    videoEl.src = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

    // 重要：由于浏览器限制自动播放问题，则需要使用无声播放即可实现自动播放
    videoEl.muted = "muted";
    videoEl.autoplay = "autoplay";
    videoEl.loop = "loop";
    videoEl.play();

    // 创建canvas
    const canvas = document.getElementById("canvas");
    const cvsWidth = canvas.width;
    const cvsHeight = canvas.height;
    const ctx = canvas.getContext("2d");

    // 使用requestAnimationFrame定时器实现canvas绘制video每一帧
    const videoRender = () => {
        window.requestAnimationFrame(videoRender);
        ctx.clearRect(0, 0, cvsWidth, cvsHeight);
        ctx.drawImage(videoEl, 0, 0, cvsWidth, cvsHeight);
    };
    videoRender();
};
