import React from 'react';
import BGimg from '../images/BGimg.png';

function Retreatscroll() {
    return (
        <div
            className="flex justify-center items-center h-[900px] bg-cover bg-center text-center"
            style={{ backgroundImage: `url(${BGimg})` }}
        >
            <h1 className="text-white text-6xl font-bold shadow-md">
                RETREAT CENTERS
            </h1>
        </div>
    );
}

export default Retreatscroll;
