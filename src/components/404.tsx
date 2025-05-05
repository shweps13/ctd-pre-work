import { Link } from 'react-router-dom';
import droid from '../assets/404/droid.png';
import trooper from '../assets/404/trooper.png';
import yoda from '../assets/404/yoda.png';
import { FaArrowLeft } from 'react-icons/fa';

const cases = [
    {
        img: droid,
        alt: 'R2D2',
        hcolor: 'text-yellow-700',
        color: 'text-black-700',
        heading: 'C3PO Translates:',
        message: `I am sorry sir, but R2 says something\nis not right here. I guess we should go back\nthe way we came. Or maybe ask locals for directions?`,
    },
    {
        img: yoda,
        alt: 'Yoda',
        hcolor: 'text-black-700',
        color: 'text-green-800',
        heading: 'Wrong page you have come hmm?',
        message: `Fear not!\nShow you the way, the force Will!`,
    },
    {
        img: trooper,
        alt: 'Stormtrooper',
        hcolor: 'text-gray-500',
        color: 'text-gray-700',
        heading: 'Trooper Report:',
        message: `This is not the page you are looking for..\nMove along..`,
    },
];

const selectedCase = cases[Math.floor(Math.random() * cases.length)];

export default function NotFound() {
    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <img src={selectedCase.img} alt={selectedCase.alt} className='w-auto max-h-72mb-6 mr-5' />
            <div className='max-w-lg'>
                <h3 className={`text-xl font-semibold mb-2 ${selectedCase.hcolor}`}>{selectedCase.heading}</h3>
                <h1 className={`text-2xl font-semibold ${selectedCase.color}`}>
                    {selectedCase.message}
                </h1>
                <Link to="/" className={`flex items-center ${selectedCase.hcolor} hover:underline mt-4`}>
                    <FaArrowLeft className="mr-2" />
                    go back
                </Link>
            </div>
        </div>
    );
}