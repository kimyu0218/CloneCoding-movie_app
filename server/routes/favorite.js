const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {

    // DB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId })
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        // 프론트에 다시 숫자 정보 전송
        return res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

router.post('/favorited', (req, res) => {
    // 사용자가 이 영화를 favorite 리스트에 넣었는지
    Favorite.find({ "movieId": req.body.movieId, "userForm": req.body.userForm })
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        let result = false
        if(info.length !== 0) result = true
        
        res.status(200).json({ success: true, favorited: result })
    })
})

module.exports = router;