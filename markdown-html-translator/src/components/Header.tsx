import GithubImage from "./svg/GithuhImage";

export default function Header() {
    return (
        <>
            <header className='flex justify-end'>
                <a href="https://github.com/FranciscoPiquerasLopez" target='_blank'>
                    <GithubImage />
                </a>
            </header>
        </>
    );
}