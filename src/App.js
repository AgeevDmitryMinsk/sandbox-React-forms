import React, { useEffect, useState } from "react";
import "./index.css";
import { api } from "./api";

function Profile(props) {
  console.log("rerernder");

  return (
      <div className="profile">
        <p>
          <b>Name:</b>
          {props.name}
        </p>
        <p>
          <b>Description: </b>
          {props.descr}
        </p>
      </div>
  );
}

function PopupWithForm(props) {
  return (
      <div style={{ outline: "1px solid red" }}>
        <h1>{props.title}</h1>
        {props.children}
        <button disabled={props.disabled} onClick={props.onSubmit}>
          Submit
        </button>
      </div>
  );
}

function EditProfileForm(props) {
  const [profileInfo, setProfileInfo] = useState(props.initialData);

  function handleChangeName(e) {
    setProfileInfo({ ...profileInfo, name: e.target.value });
  }

  function handleChangeDescr(e) {
    setProfileInfo({ ...profileInfo, descr: e.target.value });
  }

  function isValid() {
    return profileInfo.name.length >= 2 && profileInfo.descr.length >= 2;
  }

  useEffect(() => {
    props.onChange(isValid() ? profileInfo : null);
  }, [profileInfo]);

  return (
      <>
        <label>
          name: <input onChange={handleChangeName} value={profileInfo.name} />
        </label>
        <label>
          descr: <input onChange={handleChangeDescr} value={profileInfo.descr} />
        </label>
      </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setProfileInfo(data);
      setLoading(false);
    });
  }, []);

  const [newProfileInfo, setNewProfileInfo] = useState({});

  function handleChangeProfileForm(newProfileInfo) {
    console.log(newProfileInfo);
    setNewProfileInfo(newProfileInfo);
  }

  return loading ? (
      "LOADING"
  ) : (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2 className="foobar">Edit to see some magic happen!</h2>
        <Profile {...profileInfo} />

        <PopupWithForm
            title="Edit profile"
            onSubmit={() => {
              api.setProfileInfo(newProfileInfo).then((newData) => {
                setProfileInfo(newData);
              });
            }}
            disabled={!newProfileInfo}
        >
          <EditProfileForm
              onChange={handleChangeProfileForm}
              initialData={profileInfo}
          />
        </PopupWithForm>
      </div>
  );
}
