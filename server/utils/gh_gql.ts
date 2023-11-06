import jsonwebtoken from 'jsonwebtoken';


function signJWT(appId: number, key: string): Promise<string> {
  const timeNow = Math.floor(Date.now() / 1000);
  const payload = {
    iat: timeNow - 60, // Issued At
    exp: timeNow + (10 * 60), // Expires At
    iss: appId, // The ID of your GitHub App
    alg: 'RS256'
  };
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, key, {
      algorithm: 'RS256'
    }, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token!)
      }
    })
  })
}

type InstallationAccessTokenStorage = {
  token: string,
  expires_at: string,
}

export async function GetInstallationAccessToken() {
  const CACHE_TOKEN = 'gh_gql_client_token';
  const storage = useStorage();
  const config = useRuntimeConfig();

  const cachedToken: InstallationAccessTokenStorage | null = await storage.getItem(CACHE_TOKEN);
  if (cachedToken) {
    if (new Date(cachedToken.expires_at) > new Date((new Date()).getTime() + 60 * 1000)) {
      console.log('return cached')
      // Still valid
      return cachedToken.token;
    }
    console.log('Refreshing Installation Token')
  } else {
    console.log('creating new token')
  }


  const jwt = await signJWT(config.githubDiscussion.appId, config.githubDiscussion.key);

  const installationRes = await fetch(`https://api.github.com/orgs/${config.githubDiscussion.orgName}/installation`, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Authorization': 'Bearer ' + jwt
    },
  });
  const installationResContent = await installationRes.json();
  const installationId: number = installationResContent.id;

  const installationAccessTokenRes = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Authorization': 'Bearer ' + jwt
    },
    body: JSON.stringify({
      repositories: 'dust'
    })
  });
  const installationAccessTokenContent: InstallationAccessTokenStorage = await installationAccessTokenRes.json();
  await storage.setItem(CACHE_TOKEN, installationAccessTokenContent);
  return installationAccessTokenContent.token;
}

export async function githubRequest(
  query: string,
  operationName: string,
  variables: { [key: string]: any } = {}
) {
  const body = {
    query,
    operationName,
    variables
  };

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Authorization': 'Bearer ' + await GetInstallationAccessToken()
    }
  });
  const responseContent = await response.json();
  if (!responseContent) {
    throw createError({
      statusCode: 500,
      message: 'Empty Response Content',
    });
  }
  if (responseContent.errors && responseContent.errors.length > 0) {
    const firstMessage = responseContent.errors[0].message;
    if (responseContent.errors[0].type == 'NOT_FOUND') {
      throw createError({
        statusCode: 404,
        message: firstMessage,
      });
    }
    throw createError({
      statusCode: 500,
      data: responseContent,
      message: firstMessage,
    });
  }
  if (!responseContent.data) {
    throw createError({
      statusCode: 500,
      message: 'Empty Response Data',
    });
  }
  return responseContent.data;
}