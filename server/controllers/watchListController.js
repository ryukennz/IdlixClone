const Movie = require('../models/movie');
const User = require('../models/user');
const WatchList = require('../models/watchList');

module.exports = class WatchListController {
    static async addToWatchList(req, res, next) {
        try {
            const { movieId } = req.body

            const currentUser = req.user.id

            const watchList = await WatchList.findOne({
                user: currentUser
            })

            if (!watchList) {
                const result = await WatchList.findOneAndUpdate(
                    { user: currentUser },
                    { $push: { movies: movieId } },
                    { new: true, upsert: true }
                );
                return res.status(200).json({ data: result, message: `Movie added to watch list` });
            } else {
                if (watchList.movies.includes(movieId)) {
                    return res.status(400).json({ message: `Movie already added to watch list` });
                } else {
                    const result = await WatchList.findOneAndUpdate(
                        { user: currentUser },
                        { $push: { movies: movieId } },
                        { new: true }
                    );
                    return res.status(200).json({ data: result, message: `Movie added to watch list` });
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getWatchListByCurrentUser(req, res, next) {
        try {
            const currentUser = req.user.id

            const watchList = await WatchList.findOne({
                user: currentUser
            })

            if (!watchList) throw { name: `NotFound`, message: `Watch list not found` }

            return res.json(watchList)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}