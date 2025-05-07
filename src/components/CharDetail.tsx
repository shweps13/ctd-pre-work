import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import charBg from '../assets/backgrounds/char.png';
import imgPlaceholder from '../assets/visuals/101.png';

type CharacterData = {
    properties: {
        name: string;
        birth_year: string;
        gender: string;
        height: string;
        mass: string;
        skin_color: string;
        hair_color: string;
        eye_color: string;
        homeworld: string;
        species: string[];
        vehicles: string[];
    };
};


export default function CharDetail() {
    const { id } = useParams();
    const [char, setChar] = useState<CharacterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setChar(data.result);
                setLoading(false);
            });
        fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
            .then((res) => res.json())
            .then((data) => {
                setImageUrl(data.image);
            });
    }, [id]);

    if (loading || !char) return <div className="text-white p-10">Loading</div>;

    const {
        name,
        birth_year,
        gender,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        homeworld,
    } = char.properties;

    const homeworldId = homeworld.split('/').pop();

    return (
        <div
            className="min-h-screen z-10 bg-black text-white p-10 flex flex-col gap-8"
            style={{
                backgroundImage: `url(${charBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute z-0 inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

            <div className="z-10 flex justify-between items-start flex-wrap gap-4">
                <h1 className="text-4xl font-bold uppercase">{name}</h1>
                <div className="flex flex-wrap gap-6 text-sm opacity-80">
                    <div className="flex flex-col text-2xl font-bold">
                        <span className="text-sm">Gender:</span> {gender}
                    </div>
                    <div className="flex flex-col text-2xl font-bold">
                        <span className="text-sm">Birth Year:</span> {birth_year}
                    </div>
                    <div className="flex flex-col text-2xl font-bold">
                        <span className="text-sm">Height:</span> {height} cm
                    </div>
                    <div className="flex flex-col text-2xl font-bold">
                        <span className="text-sm">Mass:</span> {mass} kg
                    </div>
                </div>
            </div>

            <div className="z-10 flex flex-row gap-10">
                <div className="bg-white/12 p-6 rounded-lg w-full max-w-sm">
                    <p className="text-l leading-relaxed">
                        <strong >Hair:</strong> {hair_color} <br />
                        <strong>Skin:</strong> {skin_color} <br />
                        <strong>Eyes:</strong> {eye_color} <br />
                        <div className="cursor-pointer" onClick={() => navigate(`/planets/${homeworldId}`)}>
                            <strong>Homeworld:</strong> [Visit]
                        </div>
                    </p>
                </div>
                {imageUrl ?
                    <img
                        src={imageUrl}
                        alt={name}
                        className="rounded-lg max-w-xs shadow-lg"
                    />
                    :
                    <img
                        src={imgPlaceholder}
                        alt={name}
                        className="rounded-lg max-w-xs shadow-lg"
                    />
                }
            </div>
        </div >
    );
}