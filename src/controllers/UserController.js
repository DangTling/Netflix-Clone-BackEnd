import pool from "../config/connectDB";

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      const user = rows[0];
      return res.json({ msg: "success", movies: JSON.parse(user.likedMovies) });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    console.error(error);
    return res.json({ msg: "Error fetching movies." });
  }
};

const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      const user = rows[0];
      const likedMovies = JSON.parse(user.likedMovies);
      const movieAlreadyLiked = likedMovies.find(
        (movie) => movie.id === data.id
      );
      if (!movieAlreadyLiked) {
        likedMovies.push(data);
        await pool.execute("UPDATE user SET likedMovies = ? WHERE id = ?", [
          JSON.stringify(likedMovies),
          user.id,
        ]);
        return res.json({ msg: "Movie successfully added to liked list." });
      } else {
        return res.json({ msg: "Movie already added to the liked list." });
      }
    } else {
      await pool.execute(
        "INSERT INTO user (email, likedMovies) VALUES (?, ?)",
        [email, JSON.stringify([data])]
      );
      return res.json({ msg: "Movie successfully added to liked list." });
    }
  } catch (error) {
    console.error(error);
    return res.json({ msg: "Error adding movie to the liked list." });
  }
};

const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      const user = rows[0];
      const likedMovies = JSON.parse(user.likedMovies);
      const movieIndex = likedMovies.findIndex((movie) => movie.id === movieId);
      if (movieIndex !== -1) {
        likedMovies.splice(movieIndex, 1);
        await pool.execute("UPDATE user SET likedMovies = ? WHERE id = ?", [
          JSON.stringify(likedMovies),
          user.id,
        ]);
        return res.json({
          msg: "Movie successfully removed.",
          movies: likedMovies,
        });
      } else {
        return res.status(400).send({ msg: "Movie not found." });
      }
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    console.error(error);
    return res.json({ msg: "Error removing movie from the liked list." });
  }
};

module.exports = {
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies,
};
