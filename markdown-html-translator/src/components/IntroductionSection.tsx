import { useGlobalStore } from "../hooks/states/useGlobalStore";

const IntroductionSection = ({ titleSection, idSection, hrefValue, children }:
    {
        titleSection: string,
        idSection: string,
        hrefValue: string,
        children: React.ReactNode
    }) => {

    const setActiveSection = useGlobalStore(state => state.setActiveSection);

    const handleClick = (sectionClicked: string) => {
        setActiveSection(sectionClicked);
    };

    return (
        <div className="introduction__section" id={idSection} onClick={() => handleClick(idSection)} >
            <div className="introduction__section__title">
                <h2>
                    <a href={hrefValue}>{titleSection}
                        <span aria-label="Ir a una sección">🔗</span>
                    </a>
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