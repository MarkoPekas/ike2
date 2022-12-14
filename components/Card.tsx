import Image from "next/image"
import { useState } from "react";
import CardPage from "./Card/CardPage";
var youtubeThumbnail = require('youtube-thumbnail');

interface CardProps {
    image?: string
    title?: string
    description?: string
    category?: string
    youtubeUrl?: string
}

const Card = ({image, title, description, category, youtubeUrl}: CardProps) => {
    const [active, setActive] = useState(false)
    return (
        active?
        <CardPage {...{image, title, description, category, youtubeUrl}} setActive={setActive} />:
        <div onClick={() => setActive(true)} className="rounded-md mt-4 cursor-pointer shadow w-full overflow-hidden">
            <div className="w-full aspect-video relative flex-shrink-0">
                <Image src={image||youtubeThumbnail(youtubeUrl).medium.url||"/images/placeholder.png"} layout="fill" objectFit="cover" />
            </div>
            <div className="flex-1 h-full px-4 py-3">
                <p className="text-gray-800 font-medium text-sm uppercase whitespace-nowrap">{(category||'SVJEDOCANSTVA').replaceAll('_', ' ')}</p>
                <p className="text-lg font-semibold text-gray-900">{title||'Stijepo Gleđ Markos'}</p>
            </div>
        </div>
    )
}   

export default Card