import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import filmsBg from '../assets/backgrounds/films.png';
import shape1 from '../assets/visuals/1.svg';
import shape2 from '../assets/visuals/2.svg';
import shape3 from '../assets/visuals/3.svg';
import shape4 from '../assets/visuals/4.svg';
import shape5 from '../assets/visuals/5.svg';
import shape6 from '../assets/visuals/6.svg';

const shapes = [shape1, shape2, shape3, shape4, shape5, shape6];

type Film = {
    uid: string;
    title: string;
    properties: {
        title: string;
        episode_id: number;
        release_date: string;
    };
};

export default function Films() {
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://www.swapi.tech/api/films')
            .then((res) => res.json())
            .then((data) => {
                setFilms(data.result);
                setLoading(false);
            });
    }, []);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
    };

    return (
        <div
            className="relative w-full min-h-screen flex flex-col justify-center items-center text-white"
            style={{
                backgroundImage: `url(${filmsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div ref={scrollContainerRef} className="z-10 w-full overflow-x-auto pb-4 snap-x snap-mandatory flex gap-6 scroll-smooth overflow-hidden hide-scrollbar">
                    {films.map((film, index) => {
                        const year = new Date(film.properties.release_date).getFullYear();
                        const shape = shapes[index % shapes.length];

                        return (
                            <div
                                key={film.uid}
                                onClick={() => navigate(`/films/${film.uid}`)}
                                className={`min-w-[400px] snap-center bg-black bg-opacity-50 rounded-lg p-6 flex flex-row items-center text-center cursor-pointer ${index === 0 ? 'ml-[200px]' : ''} ${index === films.length - 1 ? 'mr-[200px]' : ''}`}
                            >
                                <img src={shape} alt={`shape-${index}`} className="w-40 h-50 mb-4" />
                                <div className='flex flex-col ml-10'>
                                    <h3 className="text-2xl font-bold uppercase mb-2">{film.properties.title}</h3>
                                    <div className="w-3 h-3 bg-red-500 rounded-full mb-2 mt-4 mr-auto ml-auto" ></div>
                                    <p className="text-xl font-semibold mt-3">{year}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="flex justify-center items-center gap-6 mt-8 z-10">
                <button onClick={scrollLeft} className="text-2xl hover:opacity-80 transition cursor-pointer">←</button>
                <p className="opacity-60">Scroll it</p>
                <button onClick={scrollRight} className="text-2xl hover:opacity-80 transition cursor-pointer">→</button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
        </div>
    );
}