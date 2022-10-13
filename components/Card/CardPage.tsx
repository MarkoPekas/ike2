import ReactMarkdown from 'react-markdown'

const CardPage = (props: any) => {
    console.log(props)
    return (
        <div className="fixed w-full m-0 h-screen top-0 left-0 bg-white z-50 overflow-y-auto">
            <div 
            onClick={() => props.setActive(false)}
            className="px-4 py-2 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div className="p-4">
                <div className="w-full aspect-video flex justify-center">
                <iframe className='video flex-grow'
                        title='Youtube player'
                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                        src={`https://youtube.com/embed/${
                            props.youtubeUrl?.split('v=')[1].split('&')[0]
                        }?autoplay=0`}>
                </iframe>
                </div>
            </div>
            <h1 className="text-2xl px-4 font-semibold">{props.title} Naslov</h1>
            <ReactMarkdown className='whitespace-pre-line p-4'>{props.description}</ReactMarkdown>
        </div>
    )
}

export default CardPage