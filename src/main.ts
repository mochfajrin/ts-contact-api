import { web } from "./application/web";

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  web.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
}
