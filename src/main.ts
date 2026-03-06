import { app } from "./infra/http/server.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`Servidor escutando na porta ${env.PORT}`);
});
