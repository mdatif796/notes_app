import React, { useState, useEffect } from "react";
import GroupModal from "./GroupModal";
import Notes from "./Notes";
import NotesImg from "../assets/notes-img.png";
import Lock from "../assets/lock-icon.png";
import "../styles/message.css";

const Message = () => {
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [chatGroups, setChatGroups] = useState([]);

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

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem("chatGroups");
      if (storedGroups) {
        let chatGroups = await JSON.parse(storedGroups);
        setChatGroups(chatGroups);
      }
    };
    fetchGroup();
  }, []);

  const handleClick = (group) => {
    setGroupSelect(group);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className="sidebarContainerMobile">
          {groupSelect ? (
            <Notes
              groupSelect={groupSelect}
              chatGroups={chatGroups}
              setChatGroups={setChatGroups}
            />
          ) : (
            <>
              <h1 className="headingMobile">Pocket Notes</h1>
              <button
                className="CreateButtonMobile"
                onClick={() => setOpenCreateGroupModal(true)}
              >
                + Create Notes group
              </button>
              <div className="GroupList">
                {chatGroups.map((group) => (
                  <div
                    key={group.id}
                    className={`groupItem ${
                      groupSelect === group ? "selected" : ""
                    }`}
                    onClick={() => handleClick(group)}
                  >
                    <div
                      className="groupIcon"
                      style={{ background: group.color }}
                    >
                      {group.groupName?.slice(0, 2)?.toUpperCase()}
                    </div>
                    <h2 className="groupName">
                      {group.groupName[0].toUpperCase() +
                        group.groupName.slice(1)}
                    </h2>
                  </div>
                ))}
              </div>
            </>
          )}

          {openCreateGroupModal && (
            <GroupModal
              closeModal={setOpenCreateGroupModal}
              setChatGroups={setChatGroups}
              chatGroups={chatGroups}
            />
          )}
        </div>
      ) : (
        <>
          <div className="sidebarContainer">
            <h1 className="heading">Pocket Notes</h1>
            <button
              className="CreateButton"
              onClick={() => setOpenCreateGroupModal(true)}
            >
              + Create Notes group
            </button>
            <div className="GroupList">
              {chatGroups.map((group) => (
                <div
                  key={group.id}
                  className={`groupItem ${
                    groupSelect === group ? "selected" : ""
                  }`}
                  onClick={() => handleClick(group)}
                >
                  <div
                    className="groupIcon"
                    style={{ background: group.color }}
                  >
                    {group.groupName?.slice(0, 2)?.toUpperCase()}
                  </div>
                  <h2 className="groupName">
                    {group.groupName[0].toUpperCase() +
                      group.groupName.slice(1)}
                  </h2>
                </div>
              ))}
            </div>
          </div>
          {openCreateGroupModal && (
            <GroupModal
              closeModal={setOpenCreateGroupModal}
              setChatGroups={setChatGroups}
              chatGroups={chatGroups}
            />
          )}
          <div className="MessageAreaContainer">
            {groupSelect ? (
              <Notes
                groupSelect={groupSelect}
                chatGroups={chatGroups}
                setChatGroups={setChatGroups}
              />
            ) : (
              <>
                <div className="MessageAreaText">
                  <img src={NotesImg} alt="notes-img"></img>
                  <h2 className="MessageAreaHeading">PocketNotes</h2>
                  <p className="MessageAreaDescription">
                    Send and receive messages without keeping your phone online.
                    <br /> Use Pocket Notes on up to 4 linked devices and 1
                    mobile phone
                  </p>
                </div>
                <footer className="MessageAreaFooter">
                  <img src={Lock} alt="lock-icon"></img>
                  end-to-end encrypted
                </footer>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Message;
