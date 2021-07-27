import Dashboard from "../components/dashboard/index";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [styletron, setStyletron] = useState(false);
    useEffect(() => {
        if (!styletron) setStyletron(true);
    }, []);
    if (styletron) {
        return (
            <StyletronProvider value={new Styletron()}>
                <Dashboard />
            </StyletronProvider>
        );
    } else {
        return null;
    }
}
