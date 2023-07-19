import { useState, useMemo } from "react";

import clsx from "clsx";

import productImage1 from "@images/image-product-1.jpg";
import productImage3 from "@images/image-product-3.jpg";
import productImage2 from "@images/image-product-2.jpg";

import productImage4 from "@images/image-product-4.jpg";
import productThumbnail1 from "@images/image-product-1-thumbnail.jpg";

import productThumbnail2 from "@images/image-product-2-thumbnail.jpg";
import productThumbnail3 from "@images/image-product-3-thumbnail.jpg";

import productThumbnail4 from "@images/image-product-4-thumbnail.jpg";
import { ReactComponent as PreviousIcon } from "@images/icon-previous.svg";

import { ReactComponent as NextIcon } from "@images/icon-next.svg";
import RoundedButton from "@partials/RoundedButton";
import ProductThumbnailBtn from "@partials/ProductThumbnailBtn";
import { ReactComponent as CrossIcon } from "@images/icon-close.svg";

export class ProductImageMetaData {
  constructor(readonly largeImageSrc: string, readonly thumbnailSrc: string) {}
}

const productImages = [
  new ProductImageMetaData(productImage1, productThumbnail1),
  new ProductImageMetaData(productImage2, productThumbnail2),
  new ProductImageMetaData(productImage3, productThumbnail3),
  new ProductImageMetaData(productImage4, productThumbnail4),
];

interface Props {
  className?: string;
}

export default function ProductShowCase(props: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const currentImage = useMemo(() => {
    return productImages[currentImageIndex];
  }, [currentImageIndex]);

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

  return (
    <>
      <div
        className={clsx("flex w-full flex-col gap-8 sm:w-fit", props.className)}
      >
        {/* Main Image */}
        <div className="relative h-[19rem] sm:aspect-square sm:h-auto sm:max-h-[28rem] sm:rounded-xl">
          <RoundedButton
            onClick={previousImage}
            className="absolute left-5 top-1/2 aspect-square w-10 -translate-y-1/2 sm:hidden"
          >
            <PreviousIcon className="h-3 " />
          </RoundedButton>

          <div className="block h-full sm:hidden">
            <img
              className="h-full w-full object-cover "
              src={currentImage.largeImageSrc}
              alt=""
            />
          </div>
          <button
            onClick={function () {
              setIsModelVisible(true);
            }}
            className="hidden overflow-hidden rounded-xl sm:block"
          >
            <img
              className="h-full w-full object-cover"
              src={currentImage.largeImageSrc}
              alt=""
            />
          </button>
          <RoundedButton
            onClick={nextImage}
            className="absolute right-5 top-1/2 aspect-square w-10 -translate-y-1/2 sm:hidden"
          >
            <NextIcon className="h-3 " />
          </RoundedButton>
        </div>

        {/* Thumbnails */}
        <div className="hidden auto-cols-auto grid-flow-col justify-between gap-4 sm:grid">
          {productImages.map((imageData) => {
            return (
              <ProductThumbnailBtn
                key={imageData.thumbnailSrc}
                selected={
                  imageData.largeImageSrc === currentImage.largeImageSrc
                }
                className="min-w-[3.8rem] max-w-[5rem]"
                src={imageData.thumbnailSrc}
                metaData={imageData}
                onSelected={function (imageData) {
                  setCurrentImageIndex(productImages.indexOf(imageData));
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Model */}
      <div
        className={clsx(
          "fixed inset-0 z-[9999] hidden h-screen grid-rows-[_minmax(20rem,_80vh)] place-content-center bg-black/70",
          { "sm:grid": isModelVisible }
        )}
      >
        <div className="grid grid-rows-[minmax(17rem,_34rem),_minmax(3rem,_5.5rem)] place-items-center gap-4">
          {/* Main Image */}
          <div className="relative h-full sm:aspect-square sm:rounded-xl">
            <button
              onClick={function () {
                setIsModelVisible(false);
              }}
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
    </>
  );
}
