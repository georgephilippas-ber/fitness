function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function token_cookie() //: string | undefined
{
    return document.cookie.split(";").map(value => {
        const [key_, value_] = value.split("=");

        if (key_ === "token")
            return value_;
        else
            return null;
    }).filter(value => !!value)?.[0];
}

function user_id(token/*:string | undefined*/) //:string | null
{
    if (token)
        return parseJwt(token).user_id || null;
    else
        return null;
}

function getCurrentUser() //:string | null
{
    return user_id(token_cookie());
}
