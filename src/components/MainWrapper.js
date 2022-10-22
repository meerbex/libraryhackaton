import React from "react";
import PopularProducts from "./PopularProducts";
import BestSellers from "./BestSellers";
import CategorySection from "./CategorySection"
import { Search } from './Search';
class MainWrapper extends React.Component {
  render() {
    return (
      <main className="my-4">
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
