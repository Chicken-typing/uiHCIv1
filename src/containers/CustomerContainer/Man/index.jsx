import React, { useState, useEffect } from "react";
import Slider from "../../../components/Slider";
import Advertise from "../../../components/Advertise";
import Item from "../../../components/Item";
import Filter from "../../../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../action";
import { BackTop } from "antd";
import { useLocation } from "react-router";
import { getPath } from "../../../action";
import ItemSlider from "../../../components/ItemSlider";

function Man() {
  const DataSlider = [
    {
      id: 1,
      img: "https://i.pinimg.com/originals/ad/86/30/ad8630efb2a4b2acdf8f97e0841fe3e4.gif",
    },
  ];
  const listAdvertise = [
    {
      id: 1,
      imgSrc: "https://i.gifer.com/embedded/download/ku3.gif",
      title: "Running on the Road",
      info: "Hitting the pavement? You’ll want a shoe with extra cushioning that absorbs shock.",
    },
    {
      id: 2,
      imgSrc:
        "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_455,c_limit/fa4aad57-a5ea-4ade-a03a-02ff1da968c9/running-shoe-finder.jpg",
      title: "Racing on the Track",
      info: "Selecting the Right Running Shoes for SupinatioFly on the track with racing flats, which are super light with little to no heel drop. Need traction? Go for running spikes.",
    },
    {
      id: 3,
      imgSrc:
        "https://media3.giphy.com/media/mjHdtfDP25t7hRw8VT/200w.gif?cid=82a1493bsme82curxsi4ytg4hw3y2qj7h0qbu2lbupvjp705&rid=200w.gif&ct=g",
      title: "Taking on the Trails",
      info: "If you’re tackling the elements, try a shoe with extra traction and durability to run through all conditions with confidence.",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  const location = useLocation().pathname.split("/");
  useEffect(() => {
    dispatch(getPath(location[1]));
  });

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState();
  const res = useSelector((state) => state.fetchProduct.products);
  const check = res.filter((item) => item.category.includes("man"));

  useEffect(() => {
    setFilter(all);
    setProducts(check);
  }, [res]);

  const filterHighLow = () => {
    setFilter("HighLow");
    const datas = [...check];
    datas.sort((a, b) => {
      return b.price - a.price;
    });
    setProducts(datas);
  };
  const filterLowHigh = () => {
    setFilter("lowhigh");
    const datas = [...check];
    datas.sort((a, b) => {
      return a.price - b.price;
    });
    setProducts(datas);
  };
  const filterNike = () => {
    setFilter("nike");
    const datas = [...check];
    datas.filter((val) => val.brand === "Nike");
    setProducts(datas.filter((val) => val.brand === "Nike"));
  };
  const filterAdidas = () => {
    setFilter("adidas");
    const datas = [...check];
    datas.filter((val) => val.brand === "Adidas");
    setProducts(datas.filter((val) => val.brand === "Adidas"));
  };
  const all = () => {
    setFilter("all");
    setProducts(check);
  };
  return (
    <div>
      <Slider Data={DataSlider} />
      <h3 className="mt-[30px] text-center font-normal font-Helvetical text-3xl italic text-light-black">
        More Information
      </h3>
      <Advertise DataInfo={listAdvertise} />
      <div className="contain xl:px-[160px] s:px-[40px] ss:px-[60px] lg:px-[200px] smd:px-[160px]">
        <div className="flex justify-between">
          <h2 className="mt-[20px] lg:text-4xl font-medium font-Helvetical text-2xl  ">
            Man's Shoes
          </h2>
          <Filter
            filterHighLow={filterHighLow}
            filterLowHigh={filterLowHigh}
            filterNike={filterNike}
            filterAdidas={filterAdidas}
            all={all}
          />
        </div>
        <div className="list-product mt-[20px] mx-auto my-auto">
          <div className="grid grid-cols-4  gap-y-[24px] gap-x-[24px] xl:grid-cols-4 sm:grid-cols-1 s:grid-cols-1 md:grid-cols-2">
            {products.map((info) => {
              return <ItemSlider item={info} />;
            })}
          </div>
        </div>
      </div>
      <BackTop style={{ right: "50px" }} />
    </div>
  );
}

export default Man;
