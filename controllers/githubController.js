const {fetchGithubProfileData} = require('../services/githubService');

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

        res.status(200).json({
            success : true,
            profile : data.user,
            repositories : data.repos
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