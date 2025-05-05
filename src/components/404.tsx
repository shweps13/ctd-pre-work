import { Link } from 'react-router-dom';
import droidImg from '../assets/droidImg.png';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <img src={droidImg} alt="R2D2" className='w-75 mb-6 mr-3'/>
            <div className='max-w-max'>
                <h3 className='text-xl text-yellow-700 font-semibold mb-2'>C3PO Translates</h3>
                <h1 className='text-2xl font-semibold'>
                    I am sorry sir, but R2 says something<br />
                    is not right here. I guess we should go back<br />
                    the way we came. Or maybe ask locals for directions?
                </h1>
                <Link to="/" className="flex items-center text-yellow-700 hover:underline mt-4">
                    <FaArrowLeft className="mr-2" />
                    go back
                </Link>
            </div>
        </div>
    );
}