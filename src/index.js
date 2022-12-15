function uniqueConstraint(db, username) {
  if (db.find((each) => each.username === username)) {
    throw new Error("username already exist");
  }
  return true;
}

function registration(options, db = []) {
  if (options == undefined) {
    throw new Error("first argument must not be undefined or null.");
  }
  if (!options?.username) {
    throw new Error("username must be not be empty and must be valid string");
  }
  if (!options?.password) {
    throw new Error("password must not be empty");
  }
  const passwordStrengthRegex = /^(?=.{8,})(?=.*[0-9])(?=.*[!@#\$%\^&\*]).*$/;

  if (!passwordStrengthRegex.test(options.password)) {
    throw new Error("password is weak");
  }

  if (!uniqueConstraint(db, options.username)) {
    throw new Error("username already exist");
  }

  return true;
}
function login(db, options) {
  if (!options) throw new Error("option is not null or undefined");
  if (!options?.password) throw new Error("password must be string");
  if (!options?.username) throw new Error("username must be string");

  if (
    db.find(
      (each) =>
        each.username === options.username && each.password === options.password
    )
  )
    return true;
  return false;
}
module.exports = { registration, uniqueConstraint, login };
