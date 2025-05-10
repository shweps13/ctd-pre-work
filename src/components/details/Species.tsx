import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import detailsBg from '../../assets/backgrounds/details.png';
import { FaJediOrder, FaRobot, FaMeteor, FaRocket, FaDragon } from 'react-icons/fa';
import { GiPlanetConquest, GiAlienSkull, GiSpaceShuttle } from 'react-icons/gi';
import { MoonLoader } from 'react-spinners';

type SpeciesProps = {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    hair_colors: string;
    skin_colors: string;
    eye_colors: string;
    language: string;
    homeworld: string;
    people: string[];
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

const IconGrid = ({ items, routePrefix, }: {
    items: string[];
    routePrefix: 'characters' | 'planets' | 'species' | 'starships' | 'vehicles';
}) => {
    const navigate = useNavigate();

    const extractId = (url: string) => url?.split('/').filter(Boolean).pop();

    return (
        <div className="z-10 flex flex-wrap gap-4 mt-4">
            {items.map((url, i) => {
                const Icon = icons[Math.floor(Math.random() * icons.length)];
                const id = extractId(url);

                return (
                    <div
                        key={i}
                        onClick={() => navigate(`/${routePrefix}/${id}`)}
                        className={`w-16 h-16 rounded-full ${randomColor()} 
                flex items-center justify-center text-white text-xl
                hover:scale-105 hover:brightness-110 transition duration-200 ease-in-out cursor-pointer`}
                        title={`Go to ${routePrefix} ${id}`}
                    >
                        <Icon />
                    </div>
                );
            })}
        </div>
    );
};



export default function SpeciesDetail() {
    const { id } = useParams();
    const [data, setData] = useState<SpeciesProps | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/species/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json.result.properties);
                setLoading(false);
            });
    }, [id]);

    if (loading || !data)
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-900'>
                <MoonLoader color="#FFEE58" loading={loading} size={100} aria-label="Loading Spinner" />
            </div>
        );

    const {
        name,
        classification,
        designation,
        average_height,
        average_lifespan,
        hair_colors,
        skin_colors,
        eye_colors,
        language,
        homeworld,
        people,
    } = data;

    const homeworldId = homeworld.split('/').pop();

    return (
        <div
            className="min-h-screen z-10 bg-black text-white p-10 flex flex-col gap-8"
            style={{
                backgroundImage: `url(${detailsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute z-0 inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold uppercase">{name}</h1>
                <div className="flex flex-wrap gap-6 text-sm opacity-80">
                    <div className="flex flex-col text-xl font-bold"><span className="text-sm">Classification:</span> {classification}</div>
                    <div className="flex flex-col text-xl font-bold"><span className="text-sm">Designation:</span> {designation}</div>
                    <div className="flex flex-col text-xl font-bold"><span className="text-sm">Language:</span> {language}</div>
                </div>
            </div>

            <div className="z-10 flex flex-row gap-10">
                <div className="bg-white/10 p-6 rounded-lg w-full max-w-md">
                    <p className="text-sm leading-relaxed">
                        <strong>Height:</strong> {average_height} cm<br />
                        <strong>Lifespan:</strong> {average_lifespan} years<br />
                        <strong>Hair:</strong> {hair_colors}<br />
                        <strong>Skin:</strong> {skin_colors}<br />
                        <strong>Eyes:</strong> {eye_colors}<br />
                    </p>
                    <div className="cursor-pointer" onClick={() => navigate(`/planets/${homeworldId}`)}>
                        <p><strong>Homeworld:</strong> [Visit]</p>
                    </div>
                </div>

                <div className="z-10 grid grid-cols-1 gap-6 flex-1">
                    <div className="bg-white/10 p-4 rounded">
                        <p className="mb-2 text-l font-semibold">Characters</p>
                        <IconGrid items={people} routePrefix="characters" />
                    </div>
                </div>
            </div>

        </div>
    );
}