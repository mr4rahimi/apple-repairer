import { useEffect } from "react";

export default function InlineMedia() {
  useEffect(() => {
    const video = document.querySelector("[data-inline-video]");
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    video.addEventListener("ended", () => {
      video.classList.add("opacity-0");
      const endFrame = document.querySelector("[data-end-frame]");
      if (endFrame) endFrame.classList.remove("opacity-0");
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
