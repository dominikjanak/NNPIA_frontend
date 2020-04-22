const _tokenName = '__loginToken';

export function setSessionToken(token) {
    if(validateToken(token))
    {
        localStorage.setItem(_tokenName, token);
        return true;
    }
    return false;
}

export function getSession()
{
    var token = getSessionToken();
    return extractToken(token);
}

export function getSessionToken()
{
    return localStorage.getItem(_tokenName);
}

export function validateSession()
{
    var token = getSessionToken();
    if(validateToken(token))
    {
        return true;
    }
    return false;
}

export function logOut()
{
    localStorage.removeItem(_tokenName);
    return true;
}

export function validateToken(token)
{
    var timestamp = extractToken(token);

    if(timestamp && (timestamp.exp - Date.now()) >= 0)
    {
        return true;
    }
    return false;
}

export function extractToken(token)
{
    try
    {
        if (token)
        {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            var data = JSON.parse(window.atob(base64));
            data.exp *= 1000;
            data.iat *= 1000;
            return data;
        }
    }
    catch (error)
    {
        console.log(error)
    }
    return null;
}