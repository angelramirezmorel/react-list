import Server from "./server";

const PORT = process.env.PORT || "3001";
const server = new Server(PORT);
server.start();
