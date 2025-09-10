const BASE_ENDPOINT = 'https://api.github.com/users';

export async function getGithubData(username: string) {
  const userResponse = await fetch(`${BASE_ENDPOINT}/${username}`);
  const userReposResponse = await fetch(
    `${BASE_ENDPOINT}/${username}/repos?per_page=1000`
  );

  const user = await userResponse.json();
  const repositories = await userReposResponse.json();

  if (repositories.message) {
    return {
      followers: null,
      stars: null,
      repoCount: null,
      following: null,
    };
  }

  const mine = repositories.filter((repo: any) => !repo.fork);

  const stars = mine.reduce((accumulator: any, repository: any) => {
    return accumulator + repository['stargazers_count'];
  }, 0);

  return {
    followers: user.followers,
    stars,
    repoCount: user.public_repos,
    following: user.following,
  };
}
