const jwt = require('jsonwebtoken');

const getDashboardData = (req, res) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized profile request.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ balance: '$15,420.50', transactionCount: 142, role: verified.role });
  } catch (error) {
    return res.status(403).json({ message: 'Session Signature Invalid.' });
  }
};

module.exports = {
  getDashboardData
};
