interface Props {
    trailerKey: string;
}

export function DetailTrailer({ trailerKey }: Props) {
    return (
        <section className="w-full ">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-white text-lg font-bold mb-4">트레일러</h2>
                <div className="w-full aspect-video rounded-lg overflow-hidden">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
}
