import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
    if(props.landingPage) { // 영화
        return(
            <Col lg={6} md={8} xs={24}> {/* 그리드 카드  열 설정 */}
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img 
                            style={{ width: '100%', height: '320px' }} 
                            src={props.image} 
                            alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    }
    else { // 배우
        return(
            <Col lg={6} md={8} xs={24}> {/* 그리드 카드  열 설정 */}
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img 
                            style={{ width: '100%', height: '400px' }} 
                            src={props.image} 
                            alt={props.characterName} />
                    </a>
                </div>
            </Col>
        )
    }
}

export default GridCards