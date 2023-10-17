import mongoose from 'mongoose';

export const connectDB = mongoose.connect("mongodb://localhost:27017/chatroom")

mongoose.connection.on("open", () => {
  console.log("Connexion à la DB effectué avec succès.")
})

mongoose.connection.on("error", () => {
  console.log("Impossible de se connecter à la DB.")
})
