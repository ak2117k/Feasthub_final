import React, { useState } from "react";

const TimePicker = ({ value, onChange, SetMenuData, menuData, val }) => {
  const [time, setTime] = useState(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (val == "lunch") {
      SetMenuData({
        ...menuData,
        lunch_timing: value,
      });
    } else {
      SetMenuData({
        ...menuData,
        dinner_timing: value,
      });
    }

    setTime(value);
    onChange(name, value);
  };

  return (
    <input
      className="bg-neutral-300"
      type="time"
      name="time"
      value={time}
      onChange={handleChange}
    />
  );
};

export default TimePicker;
