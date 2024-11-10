getAllUsers(): input : \_\_ /output: "users":[array]
toggleBanUser(): input: "userId":int , "isBanned":int 1 or 0 / output: "message": "User banned updated"
getMovieActivity():input: \_\_ / output: "movies": array of all movie details with sum of clicks and total time spent

ALTER TABLE movies ADD title VARCHAR(45),ADD release_year VARCHAR(10), ADD genre VARCHAR(45), ADD details VARCHAR(255), ADD image_src VARCHAR(255);
