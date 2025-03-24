import GithubImage from "./svg/GithuhImage";

export default function Header() {
    return (
        <>
            <header>
                <ul>
                    <li><a href="/introduction">Inicio</a></li>
                    <li><a href="/">Markdown</a></li>
                </ul>
                <a href="https://github.com/FranciscoPiquerasLopez" target='_blank'>
                    <GithubImage />
                </a>
            </header>
        </>
    );
}