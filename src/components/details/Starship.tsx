import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import detailsBg from '../../assets/backgrounds/details.png';
import { FaJediOrder, FaRobot, FaMeteor, FaRocket, FaDragon } from 'react-icons/fa';
import { GiPlanetConquest, GiAlienSkull, GiSpaceShuttle } from 'react-icons/gi';

type StarshipProps = {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: string[];
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
    routePrefix: 'characters' | 'planets' | 'species' | 'starships' | 'vehicles' | 'films';
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



export default function StarshipDetail() {
    const { id } = useParams();
    const [data, setData] = useState<StarshipProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/starships/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json.result.properties);
                setLoading(false);
            });
    }, [id]);

    if (loading || !data)
        return (
            <div className="min-h-screen flex justify-center items-center text-yellow-400 bg-black">
                Loading
            </div>
        );

    const {
        name,
        model,
        starship_class,
        manufacturer,
        cost_in_credits,
        length,
        crew,
        passengers,
        max_atmosphering_speed,
        hyperdrive_rating,
        MGLT,
        cargo_capacity,
        consumables,
        films,
    } = data;

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
                    <div className="flex flex-col text-xl font-bold">
                        <span className="text-sm">Model:</span> {model}
                    </div>
                    <div className="flex flex-col text-xl font-bold">
                        <span className="text-sm">Class:</span> {starship_class}
                    </div>
                    <div className="flex flex-col text-xl font-bold">
                        <span className="text-sm">Manufacturer:</span> {manufacturer}
                    </div>
                </div>
            </div>

            <div className="z-10 flex flex-row gap-10">
                <div className="bg-white/10 p-6 rounded-lg w-full max-w-md">
                    <p className="text-sm leading-relaxed">
                        <strong>Cost:</strong> {cost_in_credits} credits<br />
                        <strong>Length:</strong> {length} meters<br />
                        <strong>Crew:</strong> {crew}<br />
                        <strong>Passengers:</strong> {passengers}<br />
                        <strong>Speed:</strong> {max_atmosphering_speed} km/h<br />
                        <strong>Hyperdrive Rating:</strong> {hyperdrive_rating}<br />
                        <strong>MGLT:</strong> {MGLT}<br />
                        <strong>Cargo:</strong> {cargo_capacity}<br />
                        <strong>Consumables:</strong> {consumables}
                    </p>
                </div>

                <div className="z-10 grid grid-cols-1 gap-6 flex-1">
                    <div className="bg-white/10 p-4 rounded">
                        <p className="mb-2 text-l font-semibold">Films</p>
                        <IconGrid items={films} routePrefix="films" />
                    </div>
                </div>
            </div>
        </div>
    );
}