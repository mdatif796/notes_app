import React, { useState, useEffect } from "react";
import Send from "../assets/send-icon.png";
import Back from "../assets/back-icon.png";
import "../styles/notes.css";

const Notes = ({ groupSelect, chatGroups, setChatGroups }) => {
  const [note, setNote] = useState("");

  let notes = groupSelect.notes;

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
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    if (note.length < 2) {
      return;
    }
    let newGroup = [...chatGroups];

    let Cgroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

    Cgroup["notes"].push({ date, time, note });
    localStorage.setItem("chatGroups", JSON.stringify(newGroup));
    setChatGroups(newGroup);
    setNote("");
  };

  const keypress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
      setNote("");
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className={"notesContainer"}>
          <div className={"notesHeader"}>
            <img
              src={Back}
              alt="back-icon"
              onClick={() => {
                window.location.reload();
              }}
            />
            <div
              className={"notesGroup"}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={"groupName"}>
              {groupSelect.groupName[0].toUpperCase() +
                groupSelect.groupName.slice(1)}
            </h2>
          </div>
          <div className={"NotesAndDateMobile"}>
            {notes.map((note) => (
              <div className={"DateAndText"}>
                <div className={"DateAndTime"}>
                  <p className={"TimeMobile"}>{note.time}</p>
                  <p className={"DateMobile"}>{note.date}</p>
                </div>
                <p className={"TextMobile"}>{note.note}</p>
              </div>
            ))}
          </div>
          <div className={"TextareaMobile"}>
            <textarea
              className={"TextInputMobile"}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={Send}
              className={"SendImgMobile"}
              alt="send-icon"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className={"notesContainer"}>
          <div className={"notesHeader"}>
            <div
              className={"notesGroup"}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={"groupName"}>
              {groupSelect.groupName[0].toUpperCase() +
                groupSelect.groupName.slice(1)}
            </h2>
          </div>
          <div className={"NotesAndDate"}>
            {notes?.map((note) => (
              <div key={note.id} className={"DateAndText"}>
                <div className={"DateAndTime"}>
                  <p className={"Time"}>{note.time}</p>
                  <p className={"Date"}>{note.date}</p>
                </div>
                <p className={"Text"}>{note.note}</p>
              </div>
            ))}
          </div>
          <div className={"Textarea"}>
            <textarea
              className={"TextInput"}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={Send}
              className={"SendImg"}
              alt="send-icon"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
