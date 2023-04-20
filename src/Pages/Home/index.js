import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
    return (
        <React.Fragment>
            <p className='text-center text-2xl font-bold mb-3'>This is Home Page</p>
            <ul>
                <Link to='/about'>
                    <li>About Page</li>
                </Link>
                <Link to='/head-and-tail'>
                    <li>Head & Tail Page</li>
                </Link>
            </ul>
        </React.Fragment>
    )
}

export default Index