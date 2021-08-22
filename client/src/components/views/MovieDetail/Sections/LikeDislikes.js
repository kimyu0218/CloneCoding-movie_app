import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';

import Axios from 'axios';
import { useSelector } from 'react-redux';

function LikeDislikes(props) {
    const user = useSelector(state => state.user)

    const [Likes, setLikes] = useState(0)                   // 좋아요 수
    const [Dislikes, setDislikes] = useState(0)             // 싫어요 수
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {};
    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {

        // 좋아요 확인
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length) // 좋아요 수
                    response.data.likes.map(like => {    // 사용자가 좋아요를 눌렀는지
                        if (like.userId === props.userId) setLikeAction('liked')
                    })
                } 
                else alert('Failed to get likes')
            })

        // 싫어요 확인
        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    setDislikes(response.data.dislikes.length) // 싫어요 수
                    response.data.dislikes.map(dislike => {    // 사용자가 싫어요를 눌렀는지
                        if (dislike.userId === props.userId) setDislikeAction('disliked')
                    })
                } 
                else alert('Failed to get dislikes')
            })
    }, [])

    const onLike = () => { // 좋아요 누르기
       
        if (user.userData && !user.userData.isAuth) { return alert('Please Log in first'); }

        if (LikeAction === null) { // 좋아요
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } 
                    else alert('Failed to increase the like')
                })
        } 
        else { // 좋아요 취소
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } 
                    else alert('Failed to decrease the like')
                })
        }
    }

    const onDisLike = () => { // 싫어요 누르기

        if (user.userData && !user.userData.isAuth) { return alert('Please Log in first'); }

        if (DislikeAction !== null) { // 싫어요
            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } 
                    else alert('Failed to decrease dislike')
                })

        } else { // 싫어요 취소
            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } 
                    else alert('Failed to increase dislike')
                })
        }
    }

    return (
        <React.Fragment>
            {/* 좋아요 */}
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon 
                        type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            {/* 싫어요 */}
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes