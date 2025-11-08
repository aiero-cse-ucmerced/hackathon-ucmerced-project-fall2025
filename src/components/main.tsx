interface Props {
    children?: React.ReactNode;
    centerChildren?: boolean;
}

export default function Main(props: Props) {
    return (<main className={`${props?.centerChildren ? "flex flex-col justify-center" : ""}`}>{props?.children}</main>);
}