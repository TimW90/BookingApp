import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './Carousel';

const RoomCard = () => {

    return (
        <>
            <div className="card-body">
                <div className="card lg:card-side bg-base-100 w-1/2">
                        <div className="flex flex-col items-center">
                            <div>
                                <h2 className="card-title">Room title</h2>
                            </div>
                            <Carousel />
                        </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Reserve</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomCard;