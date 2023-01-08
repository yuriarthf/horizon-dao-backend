import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import UsersRoute from "@routes/users.route";
import PropertyRoute from "@routes/property.route";
import RealEstateNftRoute from "@routes/realEstateNft.route";
import validateEnv from "@utils/validateEnv";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new PropertyRoute(),
  new RealEstateNftRoute(),
]);

app.listen();
