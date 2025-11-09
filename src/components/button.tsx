interface Props {
  href: string;
  children?: React.ReactNode;
  cta?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function Button(props: Props) {
  return (
    <a href={props.href} className={`${props.cta ? "bg-sky-200 text-2xl" : "border-2 rounded-xl"} font-bold w-fit px-4 py-2 border-0 rounded-lg my-auto`} onClick={props.onClick}>
      {props.children}
    </a>
  )
}