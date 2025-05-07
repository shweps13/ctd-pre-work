import filmIcon from '../assets/menu/films.svg';
import charactersIcon from '../assets/menu/characters.svg';
import speciesIcon from '../assets/menu/species.svg';
import planetsIcon from '../assets/menu/planets.svg';
import starshipsIcon from '../assets/menu/starships.svg';
import vehiclesIcon from '../assets/menu/vehicles.svg';
import logo from '../assets/logo.svg';
import mainBg from '../assets/backgrounds/main.jpg';

interface LandingProps {
    onSelectFilms: () => void;
    onSelectCharacters: () => void;
    onSelectSpecies: () => void;
}

export default function Landing({ onSelectFilms, onSelectCharacters, onSelectSpecies }: LandingProps) {
    const menuItems = [
        { icon: filmIcon, label: 'FILMS', action: onSelectFilms },
        { icon: charactersIcon, label: 'CHARACTERS', action: onSelectCharacters},
        { icon: speciesIcon, label: 'SPECIES', action: onSelectSpecies },
        { icon: planetsIcon, label: 'PLANETS', action: onSelectSpecies },
        { icon: starshipsIcon, label: 'STARSHIPS', action: onSelectSpecies },
        { icon: vehiclesIcon, label: 'VEHICLES', action: onSelectSpecies },
    ];
    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
            style={{ backgroundImage: `url(${mainBg})` }}
        >
            <img src={logo} alt="Star Wars Logo" className="absolute top-7 w-45" />

            <div className="flex flex-wrap gap-12 items-center justify-center max-w-5xl">
                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        onClick={item.action}
                        className="cursor-pointer flex flex-col items-center hover:scale-110 transition"
                    >
                        <img src={item.icon} alt={item.label} className="h-16 mb-2" />
                        <span className="text-lg font-bold">{item.label}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}