import React, { memo } from 'react';

import avatar from '../assets/images/avatar.jpg';
import attach from '../assets/images/attach.svg';
import eye from '../assets/images/eye.svg';
import comment from '../assets/images/comment.svg';
import heart from '../assets/images/heart.svg';

const numberWithCommas = x =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const ImageBlock = ({ src, user, index, onOpenModal }) => {
    const random = () => numberWithCommas(~~(Math.random() * 100000) + 1);

    return (
        <div className="image_box">
            <div className="main_image" onClick={onOpenModal(index)}>
                <img alt="" src={src} />
            </div>
            <div className="image_box__options">
                <div className="options__left">
                    <img alt="" src={attach} />
                </div>
                <div className="options__right">
                    <div>
                        <img alt="" src={eye} />
                        <span>{random()}</span>
                    </div>
                    <div>
                        <img alt="" src={comment} />
                        <span>{random()}</span>
                    </div>
                    <div>
                        <img alt="" src={heart} />
                        <span>{random()}</span>
                    </div>
                </div>
            </div>
            <div className="image_box__author">
                <div className="image_box__avatar">
                    <img alt="" src={user ? user.avatar_url : avatar} />
                </div>
                <a
                    href={user ? user.profile_url : '#/'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {user ? user.display_name : 'Travis'}
                </a>
            </div>
        </div>
    );
};

export default memo(ImageBlock);
