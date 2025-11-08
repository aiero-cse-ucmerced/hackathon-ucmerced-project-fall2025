interface Props {
  href: string;
  children: React.ReactNode;
}

export default function Button(props: Props) {
  return (
    <a href={props.href} className={`bg-sky-200 font-bold w-fit px-4 py-2 border-0 rounded-lg`}>
      {props.children}
    </a>
  )
}