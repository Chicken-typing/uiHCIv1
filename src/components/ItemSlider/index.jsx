import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../action";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ItemCard.module.scss";
import SizeSelection from "../SizeSelection";

function ItemSlider({ item }) {
  const { _id, name, defaultImage, brand, price } = item;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className={styles.itemCard} key={_id}>
        <div className={styles.imgContainer}>
          <img
            onClick={() => navigate(`/products/${_id}`)}
            className={styles.imgProduct}
            src={defaultImage.thumbUrl}
            alt=""
          />
          <div className={styles.overlay}>
            <div className={styles.overlay__container}>
              <button
                className={styles.addBtn}
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add to Cart</span>
              </button>
              <button
                className={styles.viewMoreBtn}
                onClick={() => {
                  navigate(`/products/${_id}`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>See Detail</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className={styles.content}
          onClick={() => navigate(`/products/${_id}`)}
        >
          <div className={styles.brand}>{brand}</div>
          <div className={styles.wrapper}>
            <span className={styles.name}>{name}</span>
            <span className={styles.price}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{price}</span>
            </span>
          </div>
        </div>
      </div>
      <SizeSelection
        open={showModal}
        item={item}
        addItem={handleAddToCart}
        handleClose={onCloseModal}
      />
    </>
  );
}

export default ItemSlider;
