import Header from "../components/header";

interface Props {
    includeHeader?: boolean;
    children?: React.ReactNode;
    centerChildren?: boolean;
    className?: string;
}

export default function Main(props: Props) {
    return (<>
        {props?.includeHeader && <Header />}
        <main className={`flex gap-6 ${props?.centerChildren ? "flex-col items-center" : ""} ${props.className}`}>
            {props?.children}
        </main>
    </>);
}