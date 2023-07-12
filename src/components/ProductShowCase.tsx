import { useState, useMemo } from "react";

import productImage1 from "@images/image-product-1.jpg";
import productImage2 from "@images/image-product-2.jpg";
import productImage3 from "@images/image-product-3.jpg";
import productImage4 from "@images/image-product-4.jpg";

import productThumbnail1 from "@images/image-product-1-thumbnail.jpg";
import productThumbnail2 from "@images/image-product-2-thumbnail.jpg";
import productThumbnail3 from "@images/image-product-3-thumbnail.jpg";
import productThumbnail4 from "@images/image-product-4-thumbnail.jpg";

import { ReactComponent as PreviousIcon } from "@images/icon-previous.svg";
import { ReactComponent as NextIcon } from "@images/icon-next.svg";
import RoundedButton from "@partials/RoundedButton";

const productImages = [
  productImage1,
  productImage2,
  productImage3,
  productImage4,
];

const productThumbnails = [
  productThumbnail1,
  productThumbnail2,
  productThumbnail3,
  productThumbnail4,
];

export default function ProductShowCase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    <div className="relative h-[19rem]">
      <RoundedButton
        onClick={previousImage}
        className="absolute left-5 top-1/2 aspect-square w-10 -translate-y-1/2"
      >
        <PreviousIcon className="h-3 " />
      </RoundedButton>
      <img className="h-full w-full object-cover" src={currentImage} alt="" />
      <RoundedButton
        onClick={nextImage}
        className="absolute right-5 top-1/2 aspect-square w-10 -translate-y-1/2"
      >
        <NextIcon className="h-3 " />
      </RoundedButton>
    </div>
  );
}
