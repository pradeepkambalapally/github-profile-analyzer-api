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
         res.status(500).json({
            success: false,
            message: "Failed to fetch GitHub profile",
            error: err.message
        });
    }
}


module.exports = {
    analyzeProfile
}