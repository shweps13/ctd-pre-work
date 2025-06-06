import { useState, useRef } from 'react';
import Landing from './Landing';
import Films from './Films';
import Characters from './Characters';
import Footer from './Footer';
import Species from './Species';

export default function HomePage() {
    const filmsRef = useRef<HTMLDivElement>(null);
    const charactersRef = useRef<HTMLDivElement>(null);
    const speciesRef = useRef<HTMLDivElement>(null);
    type Category = 'species' | 'planets' | 'starships' | 'vehicles';
    const [selectedCategory, setSelectedCategory] = useState<Category>('species');

    const scrollToSection = (section: string, category?: Category) => {
        const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
            '/films': filmsRef,
            '/characters': charactersRef,
            '/species': speciesRef,
        };
        if (category) {
            setSelectedCategory(category);
        }
        const targetRef = refs[section];
        targetRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div className="w-full h-full bg-black text-white font-sans overflow-x-hidden">
            <Landing
                onSelectFilms={() => scrollToSection('/films')}
                onSelectCharacters={() => scrollToSection('/characters')}
                onSelectSpecies={(category) => scrollToSection('/species', category)}
            />

            <div ref={filmsRef} className="min-h-screen w-full bg-black">
                <Films />
            </div>

            <div ref={charactersRef} className="min-h-screen w-full bg-black">
                <Characters />
            </div>

            <div ref={speciesRef} className="min-h-screen w-full bg-black">
                <Species selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            </div>

            <div className="min-h-screen w-full bg-black">
                <Footer/>
            </div>
        </div>
    );
}