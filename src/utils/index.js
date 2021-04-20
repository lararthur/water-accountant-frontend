import cookie from 'cookie';

const getLoggedUser = (context) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const loggedUserExists = parsedCookies.LoggedUser;
  const loggedUserFormated = loggedUserExists ? JSON.parse(loggedUserExists) : null;
  return loggedUserFormated;
};

export default getLoggedUser;
