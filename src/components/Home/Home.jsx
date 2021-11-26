import React from "react";
// import { useHistory } from "react-router";
import Slider from "react-slick";
import banners from "../../server/banners/index.get.json";
import categories from "../../server/categories/index.get.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  let flag = 0;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-page">
      <div className="slider-container">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div className="banner" key={banner.id}>
              <img src={banner.bannerImageUrl} alt={banner.bannerImageAlt} />
            </div>
          ))}
        </Slider>
      </div>

      {categories.map((category) => {
        if (category.enabled && flag === 0) {
          flag = 1;
          return (
            <div className="categories" key={category.id}>
              <div className="category-description">
                <h3 className="category-name">{category.name}</h3>
                <p>{category.description}</p>
                <button
                  onClick={() => history.push(`/products/${category.id}`)}
                  className="btn-primary"
                >
                  Explore {category.name}
                </button>
              </div>
              <div className="category-image">
                <img
                  src={category.imageUrl}
                  height="150"
                  width="200"
                  alt={category.name}
                />
              </div>
            </div>
          );
        }
        if (category.enabled && flag === 1) {
          flag = 0;
          return (
            <div className="categories" key={category.id}>
              <div className="category-image">
                <img
                  src={category.imageUrl}
                  height="150"
                  width="200"
                  alt={category.name}
                />
              </div>
              <div className="category-description">
                <h3 className="category-name">{category.name}</h3>
                <p>{category.description}</p>
                <button
                  onClick={() => history.pushState(`/products/${category.id}`)}
                  className="btn-primary"
                >
                  Explore {category.name}
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Home;
