import React, { useEffect, useState } from "react";
import axios from "../../services/apiService";
import NewAnnouncement from "./NewAnnouncement";
import moment from "moment";

export const Announcements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isAddAnnouncementVisible, setIsAddAnnouncementVisible] =
    useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sortIndex, setSortIndex] = useState(null);
  const [order, setOrder] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const handleSearch = (input) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/announcements/my-announcements/?search_input=${input}&sortInput=${sortIndex}&order=${order}`
      )
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAnnouncements = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/my-announcements`)
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const renderArrow = (columnName) => {
    if (order !== null && sortIndex === columnName) {
      return order ? <span>{"\u25B2"}</span> : <span>{"\u25BC"}</span>;
    }
    return null;
  };

  const handleClick = (columnName) => {
    setSortIndex(columnName);
    if (order === null || columnName !== sortIndex) {
      setOrder(true);
    } else {
      setOrder(!order);
    }
  };

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleInputBlur = () => {
    setIsClicked(false);
  };

  const _closeAddAnnouncementModal = () => {
    setIsAddAnnouncementVisible(false);
    fetchAnnouncements();
    setSelectedAnnouncement(null);
  };

  return (
    <>
      <NewAnnouncement
        announcement={selectedAnnouncement}
        closeModal={_closeAddAnnouncementModal}
        visible={isAddAnnouncementVisible}
      />

      <div className="header-style">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              padding: "10px",
              marginLeft: "10px",
              border: isClicked ? "2px solid #ccc" : "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              ...(isClicked && {
                borderColor: "#873b9f",
              }),
              transition: "border-color 0.3s ease",
            }}
            onFocus={handleInputClick}
            onBlur={handleInputBlur}
            value={searchInput}
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <button
          id="newButton"
          onClick={() => {
            setSelectedAnnouncement(null);
            setIsAddAnnouncementVisible(true);
          }}
          className="btn btn-ok"
        >
          + New Announcement
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          width: "100%",
          top: "17vh",
          height: "5vh",
          background: "#ebedef",
          padding: "0 10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div
          key="title"
          className="clickable-cell"
          onClick={() => handleClick("title")}
        >
          Title {renderArrow("title")}
        </div>
        <div
          key="description"
          className="clickable-cell"
          onClick={() => handleClick("description")}
        >
          Description {renderArrow("description")}
        </div>
        <div
          key="price"
          className="clickable-cell"
          onClick={() => handleClick("price")}
        >
          Price {renderArrow("price")}
        </div>
        <div
          key="phoyo"
          className="clickable-cell"
        >
          Photo
        </div>
        <div
          key="date"
          className="clickable-cell"
          onClick={() => handleClick("date")}
        >
          Date {renderArrow("date")}
        </div>
      </div>

      <div style={{ paddingTop: "5vh" }}>
        {announcements &&
          announcements.map((announcement, index) => (
            <div
              key={`announcement-${index}`}
              className="table-row"
              onClick={() => {
                setSelectedAnnouncement(announcement);
                setIsAddAnnouncementVisible(true);
              }}
            >
              <div className="clickable-cell">{announcement.title}</div>
              <div className="clickable-cell">{announcement.details}</div>
              <div className="clickable-cell">{announcement.price}</div>
              <img
                src={announcement.file}
                alt="announcement"
                style={{
                  width: "calc(20% - 20px)",
                  height: "480px",  
                  objectFit: "cover", 
                  borderRadius: "5px", 
                }}
              />
              <div className="clickable-cell">{moment(announcement.createdAt).format("YYYY-MM-DD")}</div>
            </div>
          ))}
      </div>
    </>
  );
};
