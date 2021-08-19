import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {

    const [Movies, setMovies] = useState([])                    // 영화
    const [MainMovieImage, setMainMovieImage] = useState(null)  // 메인 영화 이미지

    useEffect( () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1` // 영화 URL
        
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([response.results])
            setMainMovieImage(response.results[0])
        })

    }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image : 메인 영화 이미지 */}
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style={{ width: '80%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage