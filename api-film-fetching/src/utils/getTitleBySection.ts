export default function getTitleBySection(section: string, movieName: string): string {
    if (movieName !== "") {
        return `Buscando por "${movieName}"`;
    } else {
        switch (section) {
            case "peliculasPopulares": return "Películas populares";
            case "peliculasCartelera": return "Películas en cartelera";
            case "proximosEstrenos": return "Próximos estrenos";
            default: return "Películas";
        }
    }
}