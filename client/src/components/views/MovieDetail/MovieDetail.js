import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { Row } from 'antd';
import axios from 'axios';

import MainImage from '../LandingPage/Sections/MainImage';
import Favorite from './Sections/Favorite';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Comments from './Sections/Comments'
//import LikeDislikes from './Sections/LikeDislikes';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [CommentLists, setCommentLists] = useState([])
    const [ActorToggle, setActorToggle] = useState(false) // 배우 정보 출력 활성화 여부

    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        fetch(endpointInfo) // 영화 정보
        .then(response => response.json())
        .then(response => {
            setMovie(response)
            setLoadingForMovie(false)
        })

        fetch(endpointCrew) // 배우 정보
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
            setLoadingForCasts(false)
        })

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                if (response.data.success) setCommentLists(response.data.comments)
                else alert('Failed to get comments Info')
            })
    }, [])

    const toggleActionView = () => { // 버튼 클릭 시 배우 사진 출력
        setActorToggle(!ActorToggle)
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ?
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                /> :
                <div>loading...</div>
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* Favorite Button : 좋아요 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite 
                        movieInfo={Movie} 
                        movieId={movieId} 
                        userFrom={localStorage.getItem('userId')}/>
                </div>

                {/* Movie Info : 영화 정보 출력 (표) */}
                {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}
                <br />

                {/* 배우 정보 출력 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                                    <button onClick={toggleActionView}> Toggle Actor View </button>
                </div>

                {/* Actors Grid : 배우 정보 출력 (사진) */}
                {ActorToggle &&
                    <Row gutter={[16, 16]}> {/* 그리드 카드 공백 설정 */}
                        {!LoadingForCasts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                /> :
                                <div>loading...</div>
                            </React.Fragment>
                        ))}
                    </Row>
                }
                <br />
                {/*
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>*/}

                {/* 댓글 */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
            </div>
        </div>
    )
}

export default MovieDetail