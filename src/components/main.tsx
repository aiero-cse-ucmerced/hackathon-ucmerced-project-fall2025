import Header from "../components/header";

interface Props {
    includeHeader?: boolean;
    children?: React.ReactNode;
    centerChildren?: boolean;
}

export default function Main(props: Props) {
    return (<>
        {props?.includeHeader && <Header />}
        <main className={`${props?.centerChildren ? "flex flex-col items-center" : ""}`}>
            {props?.children}
        </main>
    </>);
}