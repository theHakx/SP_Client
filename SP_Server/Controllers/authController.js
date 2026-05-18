const jwt = require('jsonwebtoken');

const createToken = () => jwt.sign({ id: '4182', role: 'agent' }, process.env.JWT_SECRET, { expiresIn: '1d' });

const createUserProfile = () => ({
  id: '4182',
  username: 'hex',
  firstName: 'Clive',
  lastName: 'Hakaperi',
  email: 'c.hakaperi@omnicontact.co.zw',
  sex: 'Male',
  dateOfBirth: '1994-08-14',
  nationalID: '29-234567-X-29',
  role: 'agent',
  tier: 'Level 3 Premium'
});

const loginVulnerable = (req, res) => {
  const token = createToken();

  return res.json({
    success: true,
    token,
    user: createUserProfile()
  });
};

const loginSecure = (req, res) => {
  const token = createToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 24 * 60 * 60 * 1000
  };

  if (process.env.COOKIE_DOMAIN) cookieOptions.domain = process.env.COOKIE_DOMAIN;

  res.cookie('token', token, cookieOptions);

  return res.json({
    success: true,
    user: { id: '4182', username: 'hex', firstName: 'Clive', role: 'agent' }
  });
};

module.exports = {
  loginVulnerable,
  loginSecure
};
