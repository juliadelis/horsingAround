const { supabase } = require("../config/supabase");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado." });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Token inválido." });
    }

    req.user = data.user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Erro na autenticação." });
  }
}

module.exports = { authMiddleware };
