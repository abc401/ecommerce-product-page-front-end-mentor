import { ProductImageMetaData } from "@components/ProductShowCase";
import clsx from "clsx";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  selected?: boolean;
  metaData: ProductImageMetaData;
  onSelected?: (imageData: ProductImageMetaData) => void;
}

export default function ProductThumbnail(props: Props) {
  return (
    <div
      onClick={function () {
        if (props.onSelected == null) return;
        props.onSelected(props.metaData);
      }}
      className={clsx(
        "min-w-[3.8rem] max-w-[5rem] overflow-hidden rounded-lg",
        {
          "outline outline-2 outline-accent-500": props.selected,
        }
      )}
    >
      <img {...props} className={clsx({ "opacity-25": props.selected })} />
    </div>
  );
}
