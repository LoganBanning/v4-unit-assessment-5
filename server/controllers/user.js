const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, password } = req.body;
  const profile_pic = `https://robohash.org/${username}.png`;
  const db = req.app.get('db');
  const result = await db.find_user([username]);
  const existingUser = result[0];
  if(existingUser){
    return res.status(409).send('Username taken');
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.create_user([username, profile_pic, hash]);
    const user = registeredUser[0];
    req.session.user = {
      username: user.username,
      profile_pic: user.profile_pic,
      id: user.id,
    };
    return res.status(201).send(user) ;
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.get('db');
  const foundUser = await db.find_user([username]);
  const user = foundUser[0];
  if(!user){
    return res.status(401).send('User not found.  Please register as a new user before logging in')
  } 
  const isAuthenticated = bcrypt.compareSync(password, user.hash)
  if(!isAuthenticated){
    return res.status(403).send('Incorrect password')
  } 
  req.session.user = {
    id: user.id,
    username: user.username
  };
    return res.send(req.session.user);
    }

const logout = async (req, res) => {
  req.session.destroy();
  return res.sendStatus(200);
}

const getUser = async (req, res) => {
  if(req.session.user) {
    return res.send(user);
  } else (
    res.sendStatus(404)
  );
}

module.exports = {
  register,
  login,
  logout,
  getUser,
}