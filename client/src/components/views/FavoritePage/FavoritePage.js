import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';
import Axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config';
import './FavoritePage.css'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]) // favorite 영화 목록

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => { // 사용자의 favorite 영화 정보 가져오기
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') })
        .then(response => {
            if (response.data.success) setFavorites(response.data.favorites)
            else alert('영화 정보를 가져오는데 실패 했습니다.')
        })
    }

    const onClickDelete = (movieId, userFrom) => { // remove 버튼 클릭시 해당 영화 삭제

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if (response.data.success) fetchFavoredMovie()
            else alert("리스트에서 지우는데 실패했습니다.")
        })
    }

    const renderCards = Favorites.map((favorite, index) => { // favorite 영화

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
                }
            </div>
        )

        return (
            <tr key={index}>
                {/* (마우스 올리면 그림 보임) */}
                <Popover content={content} title={`${favorite.movieTitle}`} >
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            </tr>
        )
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />
            
            <table>
                <thead>
                    <th>Movie Title</th>
                    <th>Moview RunTime</th>
                    <th>Remove from favorites</th>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage