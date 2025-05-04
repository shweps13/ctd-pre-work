import { useEffect, useState } from 'react';

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

    useEffect(() => {
        fetch('https://www.swapi.tech/api/films')
            .then((res) => res.json())
            .then((data) => {
                setFilms(data.result);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : (
                <ul>
                    {films.map((film) => (
                        <li key={film.uid} className="p-3">
                            {film.properties.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}