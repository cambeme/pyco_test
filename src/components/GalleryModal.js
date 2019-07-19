import React, { memo, useEffect, useCallback } from 'react';

const GalleryModal = props => {
    const handleUserKeyPress = useCallback(
        event => {
            const { keyCode } = event;

            if (keyCode === 27) props.closeModal();
            if (keyCode === 37 && props.hasPrev) props.findPrev();
            if (keyCode === 39 && props.hasNext) props.findNext();
        },
        [props]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = props;

    return (
        <>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal">
                <div className="modal-body">
                    <a
                        href="#/"
                        className="modal-close"
                        onClick={closeModal}
                        onKeyDown={handleUserKeyPress}
                    >
                        &times;
                    </a>
                    {hasPrev && (
                        <a
                            href="#/"
                            className="modal-prev"
                            onClick={findPrev}
                            onKeyDown={handleUserKeyPress}
                        >
                            &lsaquo;
                        </a>
                    )}
                    {hasNext && (
                        <a
                            href="#/"
                            className="modal-next"
                            onClick={findNext}
                            onKeyDown={handleUserKeyPress}
                        >
                            &rsaquo;
                        </a>
                    )}
                    <img alt="" src={src} />
                </div>
            </div>
        </>
    );
};

export default memo(GalleryModal);
