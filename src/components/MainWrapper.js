import React from "react";
import PopularProducts from "./PopularProducts";
import BestSellers from "./BestSellers";
import CategorySection from "./CategorySection"
class MainWrapper extends React.Component {
  render() {
    return (
      <main>
        {/* <MainSlider></MainSlider>
        {} */}
        <CategorySection />
        <PopularProducts />
        <BestSellers />
      </main>
    );
  }
}

export default MainWrapper;
