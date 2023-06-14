import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import PropertyRoute from "@routes/property.route";
import PropertyDraftRoute from "@routes/propertyDraft.route";
import RealEstateNftRoute from "@routes/realEstateNft.route";
import PortfolioRoute from "./routes/portfolio.route";
import FaucetRoute from "./routes/faucet.route";
import validateEnv from "@utils/validateEnv";

validateEnv();

const app = new App([
  new IndexRoute(),
  //new AuthRoute(),
  new PropertyRoute(),
  new PropertyDraftRoute(),
  new RealEstateNftRoute(),
  new PortfolioRoute(),
  new FaucetRoute(),
]);

app.listen();
