import { useEffect, useMemo, useRef, useState } from "react";
import { ProductImageMetaData } from "./ProductShowCase";
import ProductThumbnailBtn from "@partials/ProductThumbnailBtn";
import { ReactComponent as CrossIcon } from "@images/icon-close.svg";
import { ReactComponent as PreviousIcon } from "@images/icon-previous.svg";
import { ReactComponent as NextIcon } from "@images/icon-next.svg";
import RoundedButton from "@partials/RoundedButton";

interface Props {
  productImages: ProductImageMetaData[];
  onClose: () => void;
  initialImageIndex?: number;
}

export default function ProductShowCaseModal(props: Props) {
  const modalContainer = useRef<HTMLDivElement>(null);
  const focusableElements = useRef<Array<HTMLElement>>();
  useEffect(function () {
    if (modalContainer.current == null) {
      return;
    }

    focusableElements.current = new Array();
    let queryResults = modalContainer.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    for (let focusable of queryResults) {
      focusableElements.current.push(focusable);
    }
  });

  const { productImages, onClose } = props;
  const initialImageIndex = props.initialImageIndex || 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const currentImage = useMemo(
    function () {
      return productImages[currentImageIndex];
    },
    [currentImageIndex]
  );

  function previousImage() {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(productImages.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }

  function nextImage() {
    setCurrentImageIndex((currentImageIndex + 1) % productImages.length);
  }

  const closeButton = useRef<HTMLButtonElement>(null);
  function trapFocus(e: KeyboardEvent) {
    if (
      e.code !== "Tab" ||
      !(document.activeElement instanceof HTMLElement) ||
      focusableElements.current == null
    ) {
      return;
    }

    const firstFocusable = focusableElements.current[0];
    const lastFocusable =
      focusableElements.current[focusableElements.current.length - 1];

    if (document.activeElement === firstFocusable && e.shiftKey) {
      lastFocusable.focus();
      e.preventDefault();
    } else if (
      (document.activeElement === lastFocusable && !e.shiftKey) ||
      !focusableElements.current.includes(document.activeElement)
    ) {
      firstFocusable.focus();
      e.preventDefault();
    }
  }
  useEffect(function () {
    document.addEventListener("keydown", trapFocus);
    return function () {
      document.removeEventListener("keydown", trapFocus);
    };
  });

  return (
    <div
      ref={modalContainer}
      className="fixed inset-0 z-[9999] h-screen grid-rows-[_minmax(20rem,_80vh)] place-content-center bg-black/70 sm:grid"
    >
      <div className="grid grid-rows-[minmax(17rem,_34rem),_minmax(3rem,_5.5rem)] place-items-center gap-4">
        {/* Main Image */}
        <div className="relative h-full sm:aspect-square sm:rounded-xl">
          <button
            ref={closeButton}
            onClick={onClose}
            className="absolute right-0 top-0 -translate-y-[calc(100%_+_1rem)] text-neutral-500 hover:text-accent-500 focus-visible:text-accent-500"
          >
            <CrossIcon />
          </button>
          <RoundedButton
            onClick={previousImage}
            className="absolute left-5 top-1/2 aspect-square w-10 -translate-y-1/2"
          >
            <PreviousIcon className="h-3" />
          </RoundedButton>
          <img
            className="rounded-xl object-cover"
            src={currentImage.largeImageSrc}
            alt=""
          />
          <RoundedButton
            onClick={nextImage}
            className="absolute right-5 top-1/2 aspect-square w-10 -translate-y-1/2"
          >
            <NextIcon className="h-3 " />
          </RoundedButton>
        </div>
        {/* Thumbnails */}
        <div className="h-full text-center">
          <div className="mx-auto grid h-full auto-cols-[minmax(3rem,_5.5rem)] grid-flow-col place-content-center gap-4">
            {productImages.map((imageData) => {
              return (
                <ProductThumbnailBtn
                  key={imageData.thumbnailSrc}
                  selected={
                    imageData.largeImageSrc === currentImage.largeImageSrc
                  }
                  src={imageData.thumbnailSrc}
                  metaData={imageData}
                  className="mx-auto h-full"
                  onSelected={function (imageData) {
                    setCurrentImageIndex(productImages.indexOf(imageData));
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
