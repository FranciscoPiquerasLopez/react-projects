import Header from "./Header";
import IntroductionContent from "./IntroductionContent";
import IntroductionSidebar from "./IntroductionSidebar";

const Introduction = () => {
    return (
        <div className="background-introduction">
            <div className="introduction-container">
                <Header />
                <div className="main__introduction">
                    <IntroductionContent />
                    <div></div>
                    <IntroductionSidebar />
                </div>
                <footer className="footer__introduction">
                    <a href="/">
                        <span>Ir a Markdown</span>
                        <svg viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default Introduction;