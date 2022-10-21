import React from "react";
import PopularProducts from "./PopularProducts";
import BestSellers from "./BestSellers";

class MainWrapper extends React.Component {
  render() {
    return (
      <main>
        {/* <MainSlider></MainSlider>
        {} */}
        {/* <CategorySection></CategorySection>
        {} */}
        <PopularProducts></PopularProducts>
        {}
        <BestSellers></BestSellers>
      </main>
    );
  }
}

export default MainWrapper;
