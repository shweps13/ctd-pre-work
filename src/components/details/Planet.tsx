import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import detailsBg from '../../assets/backgrounds/details.png';
import { MoonLoader } from 'react-spinners';

type PlanetProps = {
    name: string;
    climate: string;
    diameter: string;
    gravity: string;
    orbital_period: string;
    population: string;
    rotation_period: string;
    surface_water: string;
    terrain: string;
    residents: string[];
    films: string[];
};

export default function PlanetDetail() {
    const { id } = useParams();
    const [data, setData] = useState<PlanetProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${id}`)
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
        climate,
        diameter,
        gravity,
        orbital_period,
        population,
        rotation_period,
        surface_water,
        terrain,
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
                    <div className="flex flex-col text-xl font-bold"><span className="text-sm">Climate:</span> {climate}</div>
                    <div className="flex flex-col text-xl font-bold"><span className="text-sm">Terrain:</span> {terrain}</div>
                    <div className="flex flex-col text-xl font-bold"><span className="text-sm">Gravity:</span> {gravity}</div>
                </div>
            </div>

            <div className="z-10 flex flex-row gap-10">
                <div className="bg-white/10 p-6 rounded-lg w-full max-w-md">
                    <p className="text-sm leading-relaxed">
                        <strong>Population:</strong> {population}<br />
                        <strong>Diameter:</strong> {diameter} km<br />
                        <strong>Rotation Period:</strong> {rotation_period} hrs<br />
                        <strong>Orbital Period:</strong> {orbital_period} days<br />
                        <strong>Surface Water:</strong> {surface_water}%
                    </p>
                </div>
            </div>
        </div>
    );
}