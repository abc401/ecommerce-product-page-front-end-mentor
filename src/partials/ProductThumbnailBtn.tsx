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
  return (
    <button
      onClick={function () {
        if (onSelected == null) return;
        onSelected(props.metaData);
      }}
      className={clsx(
        "hover-outline | relative aspect-square max-h-full max-w-full overflow-hidden rounded-lg after:absolute after:inset-0 ",
        {
          "z-50 outline-accent-500 after:bg-white/60 hover:outline-4 focus:outline-4":
            selected,
        },
        className
      )}
    >
      <img {...restProps} className="h-full w-full object-cover" />
    </button>
  );
}
