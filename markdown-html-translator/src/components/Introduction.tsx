import { Link } from "react-router";
import Header from "./Header";
import IntroductionContent from "./IntroductionContent";
import IntroductionSidebar from "./IntroductionSidebar";
import { useEffect, useState } from "react";

const Introduction = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="background-introduction">
            <div className="introduction-container">
                <Header />
                <div className="main__introduction">
                    <IntroductionContent />
                    {windowSize.width > 820 && <div></div>}
                    {windowSize.width > 820 && <IntroductionSidebar />}
                </div>
                <footer className="footer__introduction">
                    <Link to="/">
                        <span>Ir a Markdown</span>
                        <svg viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default Introduction;