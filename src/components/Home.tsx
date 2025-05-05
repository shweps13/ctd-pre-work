import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Landing from '../components/Landing';
import Films from '../components/Films';
import Characters from '../components/Characters';

export default function HomePage() {
    const filmsRef = useRef<HTMLDivElement>(null);
    const charactersRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const scrollToSection = (section: string) => {
        const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
            '/films': filmsRef,
            '/characters': charactersRef,
        };

        const targetRef = refs[section];
        targetRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToSection(location.pathname);
    }, [location.pathname]);

    return (
        <div className="w-full h-full bg-black text-white font-sans overflow-x-hidden">
            <Landing
                onSelectFilms={() => scrollToSection('/films')}
                onSelectCharacters={() => scrollToSection('/characters')}
            />

            <div ref={filmsRef} className="min-h-screen w-full bg-black">
                <Films />
            </div>

            <div ref={charactersRef} className="min-h-screen w-full bg-black">
                <Characters />
            </div>
        </div>
    );
}