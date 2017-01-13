insert into users (username, gitHubId) values ($1, $2) returning username, userid;
