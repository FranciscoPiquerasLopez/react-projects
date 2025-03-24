const IntroductionSection = ({ titleSection, idSection, children }: { titleSection: string, idSection: string, children: React.ReactNode }) => {
    return (
        <div className="introduction__section" id={idSection}>
            <div className="introduction__section__title">
                <h2>
                    <a href="#">{titleSection}</a>
                    <hr />
                </h2>
            </div>
            <div className="introduction__section__content">
                {children}
            </div>
        </div>
    );
}

export default IntroductionSection;