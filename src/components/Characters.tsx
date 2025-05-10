import { useEffect, useState } from 'react';
import CharsBg from '../assets/backgrounds/chars.jpg';
import visual1 from '../assets/visuals/101.png';
import visual2 from '../assets/visuals/102.png';
import visual3 from '../assets/visuals/103.png';
import visual4 from '../assets/visuals/104.png';
import visual5 from '../assets/visuals/105.png';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

type Character = {
    uid: string;
    name: string;
};

type ApiResponse = {
    results: Character[];
    total_pages: number;
    previous: string | null;
    next: string | null;
};

const vusials = [visual1, visual2, visual3, visual4, visual5];

export default function Characters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.swapi.tech/api/people?page=${page}&limit=8`)
            .then((res) => res.json())
            .then((data: ApiResponse) => {
                setCharacters(data.results);
                setTotalPages(data.total_pages || null);
                setLoading(false);
            });
    }, [page]);

    return (
        <div className="relative min-h-screen bg-black flex flex-col justify-center items-center"
            style={{
                backgroundImage: `url(${CharsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            {loading ? (
                <MoonLoader color="#FFEEFF" loading={loading} size={75} aria-label="Loading Spinner" />
            ) : (
                <>
                    <div className="z-10 grid grid-cols-4 gap-7 pt-10">
                        {characters.map((char) => (
                            <div key={char.uid} className="bg-black/60 rounded-lg p-5 hover:bg-black/100 transition cursor-pointer flex justify-center flex-col text-center"
                                onClick={() => navigate(`/characters/${char.uid}`)}
                            >
                                <img className="w-full max-h-50 object-contain mb-2" src={vusials[Math.floor(Math.random() * vusials.length)]} alt="character's graph" />
                                <h2 className="text-xl font-semibold">{char.name}</h2>
                            </div>
                        ))}
                    </div>

                    {!loading ?
                        <div className="flex justify-center items-center gap-6 mt-10">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="z-10 px-4 py-2 text-2xl hover:opacity-80 transition disabled:opacity-30 cursor-pointer"
                            >
                                ←
                            </button>

                            <span className="text-sm opacity-60">{page}{totalPages ? ` / ${totalPages}` : ''}</span>

                            <button
                                onClick={() => setPage((p) => (totalPages ? Math.min(p + 1, totalPages) : p + 1))}
                                disabled={totalPages !== null && page >= totalPages}
                                className="z-10 px-4 py-2 text-2xl hover:opacity-80 transition disabled:opacity-30 cursor-pointer"
                            >
                                →
                            </button>
                        </div>
                        : <></>}
                </>
            )}
            <div className="absolute z-0 inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
        </div>
    );
}