(function () {
  function __canvasWm({
    container = document.body,
    width = "150px",
    height = "150px",
    font = "20px Microsoft Yahei",
    fillStyle = "rgba(184, 184, 184, 0.6)",
    content = "水印",
    rotate = "45",
    zIndex = 10000,
  } = {}) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    const ctx = canvas.getContext("2d");
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

    const base64Url = canvas.toDataURL();
    const __wm = document.querySelector(".__wm");

    const waterMarker = __wm || document.createElement("div");
    const style = `
      position:fixed;
      top:0;
      left:0;
      bottom:0;
      right:0;
      width:100%;
      height:100%;
      z-index:${zIndex};
      pointer-events:none;
      opacity: 0.4;
      background-repeat:repeat;
      background-image:url('${base64Url}');
    `;
    waterMarker.setAttribute("style", style);

    if (!__wm) {
      waterMarker.classList.add("__wm");
      container.insertBefore(waterMarker, container.firstChild);
    }

    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        const __wm = document.querySelector(".__wm");
        if ((__wm && __wm.getAttribute("style") !== style) || !__wm) {
          observer.disconnect();
          __canvasWm(arguments[0]);
        }
      });

      observer.observe(container, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }
  }

  window.__canvasWm = __canvasWm;
})();

__canvasWm({
  content: "wm",
});
