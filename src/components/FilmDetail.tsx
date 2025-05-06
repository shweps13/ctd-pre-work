import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import detailsBg from '../assets/backgrounds/details.png';
import { FaJediOrder, FaRobot, FaMeteor, FaRocket, FaDragon } from 'react-icons/fa';
import { GiPlanetConquest, GiAlienSkull, GiSpaceShuttle } from 'react-icons/gi';

type FilmDetailData = {
    properties: {
        title: string;
        director: string;
        producer: string;
        release_date: string;
        opening_crawl: string;
        starships: string[];
        vehicles: string[];
        planets: string[];
        characters: string[];
        species: string[];
    };
};

const randomColor = () => {
    const colors = [
        'bg-gray-900',
        'bg-neutral-900',
        'bg-slate-900',
        'bg-zinc-900',
        'bg-stone-900',
        'bg-blue-900',
        'bg-purple-900',
        'bg-indigo-900',
        'bg-emerald-900',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const icons = [
    FaJediOrder,
    FaRobot,
    FaMeteor,
    FaRocket,
    FaDragon,
    GiPlanetConquest,
    GiAlienSkull,
    GiSpaceShuttle,
  ];

const IconGrid = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-4 mt-4">
      {items.slice(0, 20).map((_, i) => {
        const Icon = icons[Math.floor(Math.random() * icons.length)];
        return (
          <div
            key={i}
            className={`w-16 h-16 rounded-full ${randomColor()} 
              flex items-center justify-center
              hover:scale-105 hover:brightness-110 transition duration-200 ease-in-out cursor-pointer`}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );

export default function FilmDetail() {
    const { id } = useParams();
    const [film, setFilm] = useState<FilmDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/films/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFilm(data.result);
                setLoading(false);
            });
    }, [id]);

    if (loading || !film) return <div className="text-white p-10">Loading</div>;

    const { title, director, producer, release_date, opening_crawl, characters, planets, starships, species } =
        film.properties;

    return (

        <div className="min-h-screen z-10 bg-black text-white p-10 flex flex-col gap-8" style={{
            backgroundImage: `url(${detailsBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className='flex justify-between'>
                <h1 className="text-4xl font-bold uppercase">{title}</h1>
                <div className="flex flex-wrap gap-10 text-sm opacity-80">
                    <p className='flex flex-col text-2xl font-bold'><span className="text-sm">Director:</span> {director}</p>
                    <p className='flex flex-col text-2xl font-bold'><span className="text-sm">Producer:</span> {producer}</p>
                    <p className='flex flex-col text-2xl font-bold'><span className="text-sm">Year:</span> {new Date(release_date).getFullYear()}</p>
                </div>
            </div>

            <div className='flex flex-row'>
                <div className="bg-white/10 p-6 rounded-lg w-full max-w-md">
                    <p className="whitespace-pre-line text-sm leading-relaxed">{opening_crawl.replace(/\\r\\n/g, '\n')}</p>
                </div>


                <div className="z-20 grid grid-cols-2 gap-6 flex-1 ml-10">
                    <div className="bg-white/10 p-4 rounded">
                        <p className="mb-2 text-l font-semibold">Characters</p>
                        <IconGrid items={characters} />
                    </div>
                    <div className="bg-white/10 p-4 rounded">
                        <p className="mb-2 text-l font-semibold">Planets</p>
                        <IconGrid items={planets} />
                    </div>
                    <div className="bg-white/10 p-4 rounded">
                        <p className="mb-2 text-l font-semibold">Species</p>
                        <IconGrid items={species} />
                    </div>
                    <div className="bg-white/10 p-4 rounded">
                        <p className="mb-2 text-l font-semibold">Starships</p>
                        <IconGrid items={starships} />
                    </div>
                </div>

            </div>
            <div className="absolute z-0 inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
        </div>
    );
}