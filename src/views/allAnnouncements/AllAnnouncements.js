import React, { useEffect, useState } from "react";
import axios from "../../services/apiService";
import { FaShoppingBasket } from "react-icons/fa";
import UserBasket from "./UserBasket";
import { store } from "../../store";

export const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const [userBasket, setUserBasket] = useState([]);
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const pageSize = 10;

  const getAnnouncements = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/announcements/all-announcements?page=${page}&size=${pageSize}`
      )
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserBasket = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/users/basket`)
      .then((response) => {
        setUserBasket(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userBasketIncludes = (announcement) => {
    return userBasket.find((entry) => entry.announcementId === announcement.id);
  };

  const addItemToBasket = async (id) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/basket/${id}`)
      .catch((error) => console.log(error));
    getUserBasket();
  };

  const removeItemFromBasket = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/users/basket/${id}`)
      .catch((error) => console.log(error));
    getUserBasket();
  };

  useEffect(() => {
    getAnnouncements();
    getUserBasket();
  }, []);

  return (
    <>
      <UserBasket
        basket={userBasket}
        visible={isBasketVisible}
        closeModal={() => setIsBasketVisible(!isBasketVisible)}
        onDeleteItem={(id) => removeItemFromBasket(id)}
      />
      <div className="header-style">
        <div
          id="basket"
          className="basket-container"
          onClick={() => setIsBasketVisible(!isBasketVisible)}
        >
          <FaShoppingBasket size={24} />
          <span className="basket-count"> {userBasket?.length}</span>
        </div>
      </div>
      <div className="container-announcement">
        {announcements.map((item, index) => (
          <div className="custom-box" key={index}>
            <p className="title">{item.title}</p>
            <p>Price: {item.price} eur</p>
            <div className="image-container">
              <img
                src={item.file}
                alt="Your Image"
                className="imagine-exemplar"
              />
            </div>
            <p>{item.details}</p>
            {store?.getState().userId !== item.userId ? (
              <button
                className="btn btn-ok"
                style={{ padding: "10px" }}
                onClick={() =>
                  userBasketIncludes(item)
                    ? removeItemFromBasket(item.id)
                    : addItemToBasket(item.id)
                }
              >
                {userBasketIncludes(item)
                  ? "Remove item from basket"
                  : "Add item to basket"}
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
