USE github_analyzer;

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    followers INT,
    following INT,
    public_repos INT,
    public_gists INT,
    total_stars INT,
    total_forks INT,
    top_language VARCHAR(255),
    most_starred_repo VARCHAR(255),
    avatar_url TEXT,
    profile_url TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
