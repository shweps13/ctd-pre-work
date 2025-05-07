import footerBg from '../assets/backgrounds/footer.jpg';

export default function Characters() {


    return (
        <div className="relative min-h-screen bg-black flex flex-col justify-center items-center"
            style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            
            <div className="absolute z-0 inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
        </div>
    );
}