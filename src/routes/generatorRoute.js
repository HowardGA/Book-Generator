import express from 'express';
import {BookGenerator} from '../utils/generatorUtils.js'

const router = express.Router();

router.post('/', (req, res) => {
    const { language, seed, likes, review, count = 20, offset = 0  } = req.body;
    if (!language || !seed || likes === undefined || review === undefined)
        return res.status(422).json({message: 'All params are necesary'});
    
    const books = BookGenerator(language, seed, likes, review, count, offset);
    res.status(201).json({
        books: books,
        offset: offset,
        count: books.length,
        message: 'Books generated successfully'
    });
});

export default router;