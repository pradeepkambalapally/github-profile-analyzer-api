const db = require("../config/db");
const {fetchGithubProfileData} = require('../services/githubService');
const calculateInsights = require("../utils/calculateInsights");

const analyzeProfile = async (req, res) => {
    try{
        const {username} = req.params;
        const data = await fetchGithubProfileData(username);
        if(!data){
            return res.status(400).json({
                success : false,
                message : "fetching data failed",
            });
        }
        const insights = calculateInsights(data.repos);
        const query = `
            INSERT INTO github_profiles (
            username,
            name,
            bio,
            followers,
            following,
            public_repos,
            public_gists,
            total_stars,
            total_forks,
            top_language,
            most_starred_repo,
            avatar_url,
            profile_url
            )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE

        name = VALUES(name),
        bio = VALUES(bio),
        followers = VALUES(followers),
        following = VALUES(following),
        public_repos = VALUES(public_repos),
        public_gists = VALUES(public_gists),
        total_stars = VALUES(total_stars),
        total_forks = VALUES(total_forks),
        top_language = VALUES(top_language),
        most_starred_repo = VALUES(most_starred_repo),
        avatar_url = VALUES(avatar_url),
       profile_url = VALUES(profile_url)
       `;

       const values = [
            data.user.login,
            data.user.name,
            data.user.bio,
            data.user.followers,
            data.user.following,
            data.user.public_repos,
            data.user.public_gists,
            insights.totalStars,
            insights.totalForks,
            insights.topLanguage,
            insights.mostStarredRepo,
            data.user.avatar_url,
            data.user.html_url
            ];

        db.query(query, values, (err, result) => {

            if (err) {

              console.log(err);

            } else {

              console.log("Profile stored successfully");

           }

        });
        res.status(200).json({
            success : true,
            profile : data.user,
            insights : insights
        });
    }catch(err){
         if (
        err.response &&
        err.response.status === 404
    ) {

        return res.status(404).json({
            success: false,
            message: "GitHub user not found"
        });

    }

    if (
        err.response &&
        err.response.status === 403
    ) {

        return res.status(403).json({
            success: false,
            message: "GitHub API rate limit exceeded"
        });

    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
    }
}

const getAllProfiles = (req, res) => {

    const query = `SELECT * FROM github_profiles`;

    db.query(query, (err, results) => {
        if(err){
            return res.status(500).json({
                success : false,
                message : "Failed to fetch profiles",
                error : err.message
            });
        }

        res.status(200).json({
            success : true,
            count : results.length,
            profiles : results
        });
    });
};

const getSingleProfile = (req, res) => {

    const {username} = req.params;

    const query = `SELECT * FROM github_profiles WHERE username = ?`;

    db.query(query,[username], (err, results) => {
        if(err){
            return res.status(500).json({
                success : false,
                message : "Failed to fetch profiles",
                error : err.message
            })
        }

        if(results.length === 0){
            return res.status(404).json({
                success : false,
                message : "Profile not found",
            })
        }

        res.status(200).json({
            success : true,
            profile : results[0]
        });
    });
}


module.exports = {
    analyzeProfile,
    getAllProfiles,
    getSingleProfile
}