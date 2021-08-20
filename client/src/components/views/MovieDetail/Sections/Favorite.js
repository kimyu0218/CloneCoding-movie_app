import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Favorite(props) {
    
    const movieId = props.movieId
    const userForm = props.userForm
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)       // 좋아요 상태 여부

    useEffect((props) => {

        let variables = {
            userForm: userForm,
            movieId: movieId,
            movieTitle: movieTitle,
            moviePost: moviePost,
            movieRunTime: movieRunTime
        }

        // 해당 영화 favorite 정보 가져오기
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            setFavoriteNumber(response.data.favoriteNumber)
            if(response.data.success) {
            }
            else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorited)
            }
            else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })
    }, [])

    return (
        <button>{Favorited ? "Not Favorite" : "Add to Favorite"}</button>
    )
}

export default Favorite