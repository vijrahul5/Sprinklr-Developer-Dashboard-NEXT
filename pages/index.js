import LandingPage from "../components/landingPage/index";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [styletron, setStyletron] = useState(false);
    useEffect(() => {
        if (!styletron) setStyletron(true);
    }, []);
    
    if (styletron) {
        return (
            <StyletronProvider value={new Styletron()}>
                <LandingPage />
            </StyletronProvider>
        );
    } else {
        return <LandingPage />;
    }
}
