import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import detailsBg from '../assets/backgrounds/details.png';

type FilmDetailData = {
    properties: {
        title: string;
        director: string;
        producer: string;
        release_date: string;
        opening_crawl: string;
    };
};

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

    const { title, director, producer, release_date, opening_crawl } = film.properties;

    return (

        <div className="min-h-screen bg-black text-white p-10 flex flex-col gap-8" style={{
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

                <div className="grid grid-cols-2 gap-6 ml-15">
                    <div className="bg-white/10 p-4 rounded">Characters</div>
                    <div className="bg-white/10 p-4 rounded">Planets</div>
                    <div className="bg-white/10 p-4 rounded">Species</div>
                    <div className="bg-white/10 p-4 rounded">Starships</div>
                </div>

            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
        </div>
    );
}