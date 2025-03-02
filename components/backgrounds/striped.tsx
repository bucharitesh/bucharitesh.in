import React from 'react'
import './style.css'

const StripedBackground = () => {
    return (
        <div className="w-full h-screen absolute left-0 top-0 z-[1] pointer-events-none" data-pattern="stripes">
            <img alt="Gradient" className="w-full h-full absolute left-0 top-0 object-fit object-center opacity-20" src="https://t2fkwfyzv1d0gw7a.public.blob.vercel-storage.com/backgrounds/gradient.webp" />
            <div className="w-full h-full absolute left-0 bottom-0 z-10 bg-gradient-to-t from-neutral-950 to-neutral-950/0 pointer-events-none"></div>
        </div>
    )
}

export default StripedBackground
