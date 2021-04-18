import style from "./timer.css";

(function createTimer() {
  // Only allow one instance to exist
  if (document.getElementById("simple-timer-root")) return;

  let time: number = 0;
  let state: "RUNNING" | "PAUSED" = "PAUSED";

  const box = document.createElement("div");
  box.id = "simple-timer";

  // Time counter display
  const timeDisplay = document.createElement("span");
  timeDisplay.textContent = "00:00:00";

  // Start/pause button
  const toggle = document.createElement("div");
  toggle.className = "btn";
  toggle.textContent = "Start";
  toggle.onclick = () => {
    if (state === "PAUSED") {
      state = "RUNNING";
      toggle.textContent = "Pause";
    } else {
      state = "PAUSED";
      toggle.textContent = "Start";
    }
  };

  // Time counter functionality
  const timer = setInterval(() => {
    if (state === "PAUSED" || !document.hasFocus()) return;
    time++;
    const { h, m, s } = {
      h: Math.floor(time / 3600),
      m: Math.floor((time / 60) % 60),
      s: Math.floor(time % 60),
    };
    timeDisplay.textContent =
      (h < 10 ? "0" + h : h) +
      ":" +
      (m < 10 ? "0" + m : m) +
      ":" +
      (s < 10 ? "0" + s : s);
  }, 1000);

  // Close button
  const close = document.createElement("div");
  close.className = "btn close";
  close.textContent = "✕";
  close.onclick = () => {
    if (timer) clearInterval(timer);
    document.getElementById("simple-timer-root")?.remove();
  };

  // Create a separate style element not to interfere with the site's CSS
  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;

  // Append elements to the main box
  box.appendChild(close);
  box.appendChild(timeDisplay);
  box.appendChild(toggle);

  // Create a root node for shadow DOM and attach it to the body
  const root = document.createElement("div");
  root.id = "simple-timer-root";

  const shadowRoot = root.attachShadow({ mode: "closed" });
  shadowRoot.appendChild(styleElement);
  shadowRoot.appendChild(box);
  document.body.appendChild(root);
})();
