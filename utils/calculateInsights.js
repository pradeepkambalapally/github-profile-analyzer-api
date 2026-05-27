const calculateInsights = (repos) => {

    let totalStars = 0;

    let totalForks = 0;

    let languageCount = {};

    let mostStarredRepo = "";

    let maxStars = 0;

    repos.forEach((repo) => {

        totalStars += repo.stargazers_count;

        totalForks += repo.forks_count;

        if (repo.language) {

            languageCount[repo.language] =
                (languageCount[repo.language] || 0) + 1;

        }

        if (repo.stargazers_count > maxStars) {

            maxStars = repo.stargazers_count;

            mostStarredRepo = repo.name;

        }

    });

    let topLanguage = "";

    let maxLanguageCount = 0;

    for (let language in languageCount) {

        if (languageCount[language] > maxLanguageCount) {

            maxLanguageCount =
                languageCount[language];

            topLanguage = language;

        }

    }

    return {
        totalStars,
        totalForks,
        topLanguage,
        mostStarredRepo
    };

};

module.exports = calculateInsights;