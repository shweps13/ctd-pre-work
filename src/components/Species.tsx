import { useEffect, useState } from 'react';
import CharsBg from '../assets/backgrounds/species.jpg';
import { useNavigate } from 'react-router-dom';

type Entity = {
    uid: string;
    name: string;
};

type Category = 'species' | 'planets' | 'starships' | 'vehicles';

interface EntityProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

export default function EntityBrowser({selectedCategory, setSelectedCategory}: EntityProps) {

    // const [selectedCategory, setSelectedCategory] = useState<Category>('species');
    const [page, setPage] = useState(1);
    const [data, setData] = useState<Entity[]>([]);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.swapi.tech/api/${selectedCategory}?page=${page}&limit=9`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.results);
                setTotalPages(data.total_pages || null);
                setLoading(false);
            });
    }, [selectedCategory, page]);

    const handleCategoryChange = (category: Category) => {
        setSelectedCategory(category);
        setPage(1);
    };

    return (
        <div
            className="relative min-h-screen bg-black text-white p-10 flex flex-col"
            style={{
                backgroundImage: `url(${CharsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute z-0 inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

            <div className="z-10 mb-8 flex flex-wrap justify-center gap-4 mt-25">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${selectedCategory === cat
                            ? 'bg-black text-white'
                            : 'bg-black/10 hover:bg-black/60'
                            }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center z-10">

                {loading ? (
                    <p className="z-10">Loading</p>
                ) : (
                    <>
                        <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                            {data.map((item) => (
                                <div
                                    key={item.uid}
                                    onClick={() => navigate(`/${selectedCategory}/${item.uid}`)}
                                    className="bg-black/30 rounded-lg p-6 text-center cursor-pointer hover:bg-black/60 transition 
                                     w-full h-25 max-w-60 flex items-center justify-center"
                                >
                                    <h4 className="text-lg font-semibold">{item.name}</h4>
                                </div>
                            ))}
                        </div>

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
                    </>
                )}
            </div>

        </div>
    );
}