import clsx from "clsx";

export default function RoundedButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={clsx(
        "grid place-content-center rounded-full bg-white hover:text-accent-500 focus-visible:text-accent-500",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
