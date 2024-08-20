import {
  WiBarometer,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
} from "weather-icons-react";

export const todayInfoValues = [
  { id: 1, label: "humidity", value: "-", img: <WiHumidity size={35} /> },
  {
    id: 2,
    label: "air pressure",
    value: "-",
    img: <WiBarometer size={35} />,
  },
  {
    id: 3,
    label: "rainfall",
    value: "-",
    img: <WiRaindrop size={35} />,
  },
  { id: 4, label: "wind speed", value: "-", img: <WiStrongWind size={35} /> },
];
