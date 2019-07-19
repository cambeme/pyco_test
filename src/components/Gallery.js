import React, { useState, useEffect } from 'react';

import GalleryModal from './GalleryModal';
import ImageBlock from './ImageBlock';

import '../assets/style/App.scss';

const apiKey = 'slTYyoCwhEKH83Anvz6zTXiRaTLA3WSU';
const limit = 20;

const Gallery = () => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);

    const [modal, setModal] = useState({ open: false, index: 0 });

    const _handleOpenModal = index => () => {
        setModal({
            open: true,
            index
        });
    };

    const _handleCloseModal = () => {
        setModal({
            open: false
        });
    };

    const _handleFindPrev = () => {
        setModal({
            open: true,
            index: modal.index - 1
        });
    };

    const _handleFindNext = () => {
        setModal({
            open: true,
            index: modal.index + 1
        });
    };

    const _handleFetchTrendingImages = async () => {
        const giphyAPI = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;
        const response = await fetch(giphyAPI);
        const responseStream = await response.text();
        const result = JSON.parse(responseStream);
        setData([...data, ...result.data]);
        setOffset(offset + limit);
    };

    const _handleLoadMore = () => {
        _handleFetchTrendingImages();
    };

    useEffect(() => {
        _handleFetchTrendingImages();
        // eslint-disable-next-line
    }, []);

    if (!data.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="gallery-container">
            <h1>
                <span role="img" aria-label="heart">
                    ❤️
                </span>{' '}
                Stephen Gallery{' '}
                <span role="img" aria-label="heart">
                    ❤️
                </span>
            </h1>
            <div className="gallery-grid">
                {data.map((item, index) => (
                    <ImageBlock
                        key={`image-${item.id || index}`}
                        src={item.images['original_still'].url}
                        user={item.user}
                        index={index}
                        onOpenModal={_handleOpenModal}
                    />
                ))}
            </div>
            {modal.open && (
                <GalleryModal
                    closeModal={_handleCloseModal}
                    findPrev={_handleFindPrev}
                    findNext={_handleFindNext}
                    hasPrev={modal.index > 0}
                    hasNext={modal.index + 1 < data.length}
                    src={data[modal.index].images['original_still'].url}
                />
            )}
            <button className="load-more" onClick={_handleLoadMore}>
                Load More
            </button>
        </div>
    );
};

export default Gallery;
