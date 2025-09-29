import { auth } from "../lib/auth.js";


export const getSession = async (req, res) => {
  try {
    const session = await auth.api.getSession(req, res);
    console.log("session",session);
    res.json(session);
  } catch (error) {
    res.status(401).json({ error: "Not logged in" });
  }
};