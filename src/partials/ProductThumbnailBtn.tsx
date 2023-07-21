import { ProductImageMetaData } from "@components/ProductShowCase";
import clsx from "clsx";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  selected?: boolean;
  metaData: ProductImageMetaData;
  className?: string;
  onSelected?: (imageData: ProductImageMetaData) => void;
}

export default function ProductThumbnailBtn(props: Props) {
  const { selected, metaData, className, onSelected, ...restProps } = props;
  return selected ? (
    <div
      className={clsx(
        "relative z-50 aspect-square max-h-full max-w-full overflow-hidden rounded-lg outline outline-2 outline-accent-500 after:absolute after:inset-0 after:bg-white/60 ",
        className
      )}
    >
      <img {...restProps} className="h-full w-full object-cover" />
    </div>
  ) : (
    <button
      onClick={function () {
        if (onSelected == null) return;
        onSelected(props.metaData);
      }}
      className={clsx(
        "hover-outline | relative aspect-square max-h-full max-w-full overflow-hidden rounded-lg after:absolute after:inset-0 hover:after:bg-white/40 focus-visible:after:bg-white/40 ",
        className
      )}
    >
      <img {...restProps} className="h-full w-full object-cover" />
    </button>
  );
}
