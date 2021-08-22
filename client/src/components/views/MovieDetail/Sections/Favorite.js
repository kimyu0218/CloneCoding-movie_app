import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';

function Favorite(props) {
    
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)       // 좋아요 상태 여부

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect((props) => {

        // 해당 영화 favorite 정보 가져오기 (favorite 누른 사람 수)
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success) setFavoriteNumber(response.data.favoriteNumber)
            else alert('숫자 정보를 가져오는데 실패했습니다.')
        })

        // 해당 영화 좋아요 눌렀는지
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success) setFavorited(response.data.favorited)
            else alert('정보를 가져오는데 실패했습니다.')
        })
    }, [])

    const onClickFavorite = () => { // 버튼 클릭시 favorite 추가 / 제거

        if (Favorited) { // favorite 누른 상태 : favorite 취소
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
            })
        } 
        else { // favorite 누르지 않은 상태 : favorite 추가
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } 
                else alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
            })
        }
    }

    return (
        <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"}{FavoriteNumber}</Button>
    )
}

export default Favorite