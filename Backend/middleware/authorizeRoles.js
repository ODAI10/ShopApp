

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      console.log(req.user.role)
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }

    next();
  };
};
