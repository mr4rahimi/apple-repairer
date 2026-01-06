import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";

export default function ServicesSwiper() {
  useEffect(() => {
    const el = document.querySelector("[data-services-swiper]");
    const section = document.querySelector("[data-services-section]");
    if (!el || !section) return;

    const swiper = new Swiper(el, {
      direction: "horizontal",
      slidesPerView: 1,
      speed: 800,
      resistanceRatio: 0,
      grabCursor: true,
    });

    let isLocked = false;
    let isActive = false;
    let isExiting = false;

    const getOffset = () => {
      const raw = section.dataset.servicesOffset;
      const value = Number.parseFloat(raw);
      return Number.isFinite(value) ? value : 0;
    };

    const getEpsilon = () => {
      const raw = section.dataset.servicesEpsilon;
      const value = Number.parseFloat(raw);
      return Number.isFinite(value) ? value : 2;
    };

    const isIntersecting = (rect, offset) =>
      rect.top < offset + window.innerHeight && rect.bottom > offset;

    const isFullyVisible = (rect, offset, epsilon) =>
      rect.top <= offset + epsilon &&
      rect.bottom >= offset + window.innerHeight - epsilon;

    const alignSection = (rect, offset) => {
      const delta = rect.top - offset;
      if (Math.abs(delta) > 1) {
        window.scrollTo({ top: window.scrollY + delta, behavior: "auto" });
      }
    };

    const onWheel = (e) => {
      const rect = section.getBoundingClientRect();
      const offset = getOffset();
      const epsilon = getEpsilon();
      const inView = isIntersecting(rect, offset);
      const fullyVisible = isFullyVisible(rect, offset, epsilon);

      if (isExiting) {
        if (!inView) {
          isExiting = false;
          isActive = false;
        }
        return;
      }

      if (!inView) {
        isActive = false;
        return;
      }

      const wantsExitDown = e.deltaY > 0 && swiper.isEnd;
      const wantsExitUp = e.deltaY < 0 && swiper.isBeginning;
      const aligned = Math.abs(rect.top - offset) <= epsilon;

      if (isActive && (aligned || fullyVisible) && (wantsExitDown || wantsExitUp)) {
        isActive = false;
        isExiting = true;
        return;
      }

      e.preventDefault();

      if (!isActive || !fullyVisible) {
        alignSection(rect, offset);
        isActive = true;
      }

      if (isLocked) return;
      isLocked = true;

      if (e.deltaY > 0) {
        if (!swiper.isEnd) {
          swiper.slideNext();
        }
      } else {
        if (!swiper.isBeginning) {
          swiper.slidePrev();
        }
      }

      setTimeout(() => {
        isLocked = false;
      }, 800); 
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      swiper.destroy(true, true);
    };
  }, []);

  return null;
}
