import React, { useState, useEffect } from "react";
import "../styles/group-modal.css";

const GroupModal = ({ closeModal, setChatGroups, chatGroups }) => {
  const [formData, setFormData] = useState({ grpName: " ", color: " " });
  const color = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute("color"),
    });
  };

  const handleSubmit = (e) => {
    if (formData.color === "") {
      alert("Please select a color");
      return;
    }
    let newGroup = [
      ...chatGroups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: chatGroups.length,
      },
    ];
    setChatGroups(newGroup);
    localStorage.setItem("chatGroups", JSON.stringify(newGroup));
    closeModal(false);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <>
          <div className={"modalBackgroundMobile"}>
            <div className={"modalContainerMobile"}>
              <span>
                <button
                  className={"closeButtonMobile"}
                  onClick={() => closeModal(false)}
                >
                  X
                </button>
              </span>
              <h2 className={"modalHeading"}>Create New Group</h2>
              <label className={"modalGrp"}>Group Name</label>
              <input
                type="text"
                className={"modalTextMobile"}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
              <br />
              <label className={"modalColor"}>Choose Colour</label>
              {color.map((color, index) => (
                <button
                  className={`colorButton ${
                    formData.color === color ? "selected" : ""
                  }`}
                  name="color"
                  color={color}
                  key={index}
                  id={color}
                  style={{
                    height: "40px",
                    width: "40px",
                    background: color,
                    borderRadius: "25px",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={handleChangeColor}
                ></button>
              ))}
              <button className={"modalCreateMobile"} onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={"modalBackground"}>
          <div className={"modalContainer"}>
            <span>
              <button
                className={"closeButton"}
                onClick={() => closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={"modalHeading"}>Create New Group</h2>
            <label className={"modalGrp"}>Group Name</label>
            <input
              type="text"
              className={"modalText"}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={"modalColor"}>Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`colorButton  ${
                  formData.color === color ? "selected" : ""
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: "40px",
                  width: "40px",
                  background: color,
                  borderRadius: "25px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className={"modalCreate"} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupModal;
