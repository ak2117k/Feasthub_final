import React, { useRef, useState } from "react";
import EditableTable from "./EditableTable";
import TimePicker from "./TimePicker";
import axios from "axios";
const Menu = () => {
  const [file, setFile] = useState();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const vegcheckbox = useRef(null);
  const nonVegCheckbox = useRef(null);
  const [menuData, SetMenuData] = useState({
    type: "",
    email: userDetails.email,
    tiffin_price: "",
    lunch_timing: "",
    dinner_timing: "",
    monday: {
      lunch: "",
      dinner: "",
    },
    tuesday: {
      lunch: "",
      dinner: "",
    },
    wednesday: {
      lunch: "",
      dinner: "",
    },
    thursday: {
      lunch: "",
      dinner: "",
    },
    friday: {
      lunch: "",
      dinner: "",
    },
    saturday: {
      lunch: "",
      dinner: "",
    },
    sunday: {
      lunch: "",
      dinner: "",
    },
  });

  // console.log(vegcheckbox.current);

  const handleCheck=()=>{
    if(vegcheckbox.current.checked){
      SetMenuData({
        ...menuData,
        type:"veg"
      })
    }else{
      SetMenuData({
        ...menuData,
        type:"nonveg"
      })
    }
  }
  
  function handleSubmit() {
    // console.log("tableData:- ", menuData);
   

    console.log("menuData",menuData)
    axios.post("http://localhost:8080/menu/menu",menuData).then((res)=>{
      console.log("we are getting the res",res.data)
    }).catch((err)=>{
      console.log("err",err)
    })
  }

  return (
    <div class="ps-7 ... font-serif">
      <h1 class="py-7 ... text-3xl">Menu Management</h1>
      <div class="border-solid border-2 border-slate-300 ... p-7">
        <h3 class="py-1 ... text-xl">Menu Information</h3>
        <p class="text-gray-600">Select the type of menu provided</p>
        <div class="py-1">
          <input type="checkbox" ref={vegcheckbox} onClick={handleCheck}/> Veg
          <span class="pr-3.5"></span>
          <input type="checkbox" ref={nonVegCheckbox} onClick={handleCheck}/> Veg & Non- Veg
        </div>
        <hr class="h-px my-8 bg-gray-300 border-0 light:bg-gray-700 w-full ..." />
        <h3 class="pt-3 text-xl">Menu Plan</h3>
        <p class="text-gray-600">Create weekly based meal plans</p>

        <EditableTable
          SetMenuData={SetMenuData}
          menuData={menuData}
        ></EditableTable>
        <hr class="h-px my-8 bg-gray-300 border-0 light:bg-gray-700 w-full ..." />

        <h3 class="pt-3 text-xl">Upload Menu Photos</h3>
        <p class="text-gray-600">
          Upload Menu Photos for Customers to Explore and Subscribe to Your Meal
          Plans
        </p>
        <input type="file" class="pt-3" />
        <img src={file} />
        <hr class="h-px my-8 bg-gray-300 border-0 light:bg-gray-700 w-full ..." />
        <h3 class="pt-3 text-xl">Delivery Timings</h3>
        <p class="text-gray-600">Set Timing for Tiffin Delivery</p>

        <p class="pt-3">
          Lunch{" "}
          <TimePicker
            SetMenuData={SetMenuData}
            menuData={menuData}
            val={"lunch"}
          ></TimePicker>{" "}
          Dinner{" "}
          <TimePicker
            SetMenuData={SetMenuData}
            menuData={menuData}
            val={"dinner"}
          ></TimePicker>
        </p>
        <hr class="h-px my-8 bg-gray-300 border-0 light:bg-gray-700 w-full ..." />

        <h3 class="pt-3 text-xl">Set Price</h3>
        <p class="text-gray-600">
          Set your tiffin services price on monthly basis
        </p>
        <input
          type="text"
          onChange={(e) =>
            SetMenuData({ ...menuData, tiffin_price: e.target.value })
          }
          className="input input-bordered w-full max-w-xs"
        />
        <hr class="h-px my-8 bg-gray-300 border-0 light:bg-gray-700 w-full ..." />

        <button
          type="submit"
          onClick={handleSubmit}
          class="w-1/2 bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 place-content-center"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Menu;
