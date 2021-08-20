import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { Row } from 'antd';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false) // 배우 정보 출력 활성화 여부

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        fetch(endpointInfo) // 영화 정보
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })

        fetch(endpointCrew) // 배우 정보
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })
    }, [])

    const toggleActionView = () => { // 버튼 클릭 시 배우 사진 출력
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* Movie Info : 영화 정보 출력 (표) */}
                <MovieInfo movie={Movie} />
                <br />

                {/* Actors Grid : 배우 정보 출력 (사진) */}
                {ActorToggle &&
                    <Row gutter={[16, 16]}> {/* 그리드 카드 공백 설정 */}
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }
                {/* 배우 정보 출력 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActionView}> Toggle Actor View </button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail