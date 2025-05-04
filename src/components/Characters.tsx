import { useEffect, useState } from 'react';

type Character = {
    uid: string;
    name: string;
};

export default function Characters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.swapi.tech/api/people')
            .then((res) => res.json())
            .then((data) => {
                setCharacters(data.results);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : (
                <ul>
                    {characters.map((char) => (
                        <li key={char.uid} className="p-3">{char.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}