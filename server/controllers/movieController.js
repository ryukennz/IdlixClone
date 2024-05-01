const Movie = require('../models/movie');
const movieJson = require('.././movies.json');

module.exports = class MovieController {

    static async getMovies(req, res, next) {
        try {
            const {search, page, limit, sort, genre} = req.query

            const inPage = parseInt(page) -1 || 0
            const inLimit = parseInt(limit) || 5
            const inSearch = search || ''
            const inSort = sort || 'rating'
            const inGenre = genre || 'All'

            const query = {}

            inSearch ? query.name = {$regex: inSearch, $options: 'i'} : null
            inGenre !== 'All' ? query.genre = inGenre : null

            const skip = Math.max((inPage) * inLimit, 0);

            const totalMovies = await Movie.countDocuments(query)

            const movies = await Movie.find(query)
                .sort({[inSort]: -1})
                .skip(skip)
                .limit(inLimit)

            if (!movies) throw { name: `NotFound`, message: `Movies not found` }

            return res.status(200).json({
                movies,
                totalMovies,
                currentPage: inPage + 1,
                totalPage: Math.ceil(totalMovies / inLimit)
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}