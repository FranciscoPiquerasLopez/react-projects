import { Link } from "react-router";
import GithubImage from "./svg/GithuhImage";

export default function Header() {
    return (
        <>
            <header>
                <ul>
                    <li><Link to="/introduction">Inicio</Link></li>
                    <li><Link to="/">Markdown</Link></li>
                </ul>
                <a href="https://github.com/FranciscoPiquerasLopez" target='_blank'>
                    <GithubImage />
                </a>
            </header>
        </>
    );
}