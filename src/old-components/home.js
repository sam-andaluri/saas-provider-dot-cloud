import React, { Fragment } from "react";
import NavBar from "./NavBar";
import Box from "@material-ui/core/Box";
import WelcomeGrid from "./WelcomeGrid";
import PricingGrid from "./PricingGrid";


const Home = () => (
  <Fragment>
      <NavBar/>
      <Box p={2} bgcolor="background.paper">
      </Box>
      <WelcomeGrid/>
      <Box p={2} bgcolor="background.paper">
      </Box>
      <PricingGrid/>
  </Fragment>
);

export default Home;
