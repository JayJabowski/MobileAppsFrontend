import React, {useState} from "react";
import useActiveTheme from "../hooks/useActiveTheme";

import eyeDark from "../icons/eye_dark.svg";
import eyeLight from "../icons/eye_light.svg";
import eyeCrossedDark from "../icons/eye_crossed_dark.svg";
import eyeCrossedLight from "../icons/eye_crossed_light.svg";

function SignUpPassword({
  placeholder,
  callback
}) {
  const { isLight } = useActiveTheme();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="inputWrapper">
      <div className="defaultInput">
        <input
          placeholder={placeholder}
          type={passwordShown ? "text" : "password"}
          onChange={callback}
        ></input>
        <button className="inlineButton" onClick={togglePasswordShown}>
          <img
            alt="Show Password"
            src={
              isLight
                ? passwordShown
                  ? eyeCrossedDark
                  : eyeDark
                : passwordShown
                ? eyeCrossedLight
                : eyeLight
            }
          />
        </button>
      </div>
    </div>
  );
}

export default SignUpPassword;
