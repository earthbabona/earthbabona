import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import dayjs from "dayjs";

const UID = "u67banatus";
const UKEY = "c934c1565bd51fc047ae8cd5a00b6160";

const convertDegreesToArrow = (degrees) => {
  if (degrees >= 337.5 || degrees < 22.5) return "↑"; // North
  else if (degrees >= 22.5 && degrees < 67.5) return "↗"; // Northeast
  else if (degrees >= 67.5 && degrees < 112.5) return "→"; // East
  else if (degrees >= 112.5 && degrees < 157.5) return "↘"; // Southeast
  else if (degrees >= 157.5 && degrees < 202.5) return "↓"; // South
  else if (degrees >= 202.5 && degrees < 247.5) return "↙"; // Southwest
  else if (degrees >= 247.5 && degrees < 292.5) return "←"; // West
  else if (degrees >= 292.5 && degrees < 337.5) return "↖"; // Northwest
};

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedProvince, setSelectedProvince] = useState("");
  const [data, setData] = useState({
    OverallForecast: {
      Date: "ระหว่างวันที่ 7 – 13 พฤษภาคม พ.ศ. 2567",
      OverallDescriptionThai:
        "ในช่วงวันที่ 8 – 13 พ.ค. 67 แนวพัดสอบของลมตะวันออกเฉียงใต้และลมใต้ยังคงพัดปกคลุมประเทศไทยตอนบน ในขณะที่ประเทศไทยตอนบนยังคงมีอากาศร้อน ทำให้บริเวณดังกล่าวยังคงมีฝนฟ้าคะนอง กับมีลมกระโชกแรงบางแห่ง รวมทั้งมีฝนตกหนักบางพื้นที่\n                                สำหรับภาคใต้ ในช่วงวันที่ 7 - 13 พ.ค. 67 ลมตะวันออกเฉียงใต้พัดปกคลุมอ่าวไทย ภาคใต้ และทะเลอันดามัน ทำให้ภาคใต้มีฝนฟ้าคะนองและมีฝนตกหนักบางแห่ง \nประกอบกับในช่วง 9 – 11 พ.ค. 67 ลมตะวันออกเฉียงใต้ที่พัดปกคลุมอ่าวไทย ภาคใต้ และทะเลอันดามันมีกำลังแรงขึ้น ทำให้ภาคใต้มีฝนเพิ่มขึ้น",
      OverallDescriptionEnglish:
        "During 8 – 13 May, the confluence of southeasterly and southerly winds prevails over the upper Thailand with thundershower, gusty winds and isolated heavy rain in the upper Thailand.   \n              During 7 – 13 May, the southeasterly winds prevail over the Gulf, the South and Andaman Sea with thundershower and heavy rain. Meanwhile, During 9 – 11 May, the southeasterly winds prevailing over the South is strengthening with more rain in the areas.",
      RegionForecast: [
        {
          RegionNameThai: "ภาคเหนือ",
          DescriptionThai:
            "ในช่วงวันที่ 8 – 13 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ กับมีลมกระโชกแรงบางแห่ง รวมทั้งมีฝนตกหนักบางพื้นที่อุณหภูมิต่ำสุด 21 – 28 องศาเซลเซียส อุณหภูมิสูงสุด 36 – 39 องศาเซลเซียสลมตะวันออกเฉียงใต้ ความเร็ว 10 – 20 กม./ชม. ",
          RegionNameEnglish: "North",
          DescriptionEnglish:
            "During 8 – 13 May, scattered thundershower with gust and isolated heavy rains.Minimum temperature 21 – 28 °C. Maximum temperature 36 – 39 °C. Southeasterly winds 10 – 20 km/hr.",
        },
        {
          RegionNameThai: "ภาคตะวันออกเฉียงเหนือ",
          DescriptionThai:
            "ในช่วงวันที่ 8 – 13 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ กับมีลมกระโชกแรงบางแห่ง รวมทั้งมีฝนตกหนักบางพื้นที่อุณหภูมิต่ำสุด 22 – 27 องศาเซลเซียส อุณหภูมิสูงสุด 35 – 38 องศาเซลเซียส ลมตะวันออกเฉียงใต้ ความเร็ว 10 – 20 กม./ชม.",
          RegionNameEnglish: "North East",
          DescriptionEnglish:
            "During 8 – 13 May, scattered thundershower with gust and isolated heavy rainsMinimum temperature 22 – 27 °C. Maximum temperature 35 – 38 °C.Southeasterly winds 10 – 20 km/hr.",
        },
        {
          RegionNameThai: "ภาคกลาง",
          DescriptionThai:
            "ในช่วงวันที่ 8 – 13 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ กับมีลมกระโชกแรงบางแห่ง รวมทั้งมีฝนตกหนักบางพื้นที่อุณหภูมิต่ำสุด 24 – 29 องศาเซลเซียส อุณหภูมิสูงสุด 32 – 38 องศาเซลเซียส ลมใต้ ความเร็ว 10 – 20 กม./ชม.",
          RegionNameEnglish: "Central",
          DescriptionEnglish:
            "During 8 – 13 May, scattered thundershower with gust and isolated heavy rainsMinimum temperature 24 – 29 °C. Maximum temperature 32 – 38 °C.Southerly winds 10 – 20 km/hr.",
        },
        {
          RegionNameThai: "ภาคตะวันออก",
          DescriptionThai:
            "ในช่วงวันที่ 8 – 13 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ กับมีลมกระโชกแรงบางแห่ง รวมทั้งมีฝนตกหนักบางพื้นที่อุณหภูมิต่ำสุด 25 – 30 องศาเซลเซียส อุณหภูมิสูงสุด 33 – 37 องศาเซลเซียส ลมตะวันออกเฉียงใต้ ความเร็ว 10 – 30 กม./ชม. ทะเลมีคลื่นต่ำกว่า 1 เมตร บริเวณที่มีฝนฟ้าคะนองคลื่นสูงมากกว่า 1 เมตร",
          RegionNameEnglish: "East",
          DescriptionEnglish:
            "During 8 – 13 May, scattered thundershower with gust and isolated heavy rainsMinimum temperature 25 – 30 °C. Maximum temperature 33 – 37 °C.Southeasterly winds 10 – 30 km/hr. Wave below 1 meter and above 1 meter in thundershowers.",
        },
        {
          RegionNameThai: "ภาคใต้ฝั่งตะวันออก",
          DescriptionThai:
            "ในช่วงวันที่ 7 – 8 พ.ค. และวันที่ 12 – 13 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ และมีฝนตกหนักบางแห่ง ลมตะวันออกเฉียงใต้ ความเร็ว 10 – 30 กม./ชม. ทะเลมีคลื่นต่ำกว่า 1 เมตร บริเวณที่มีฝนฟ้าคะนองคลื่นสูงมากกว่า 1 เมตรในช่วงวันที่ 9 – 11 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 60 - 70 ของพื้นที่ และมีฝนตกหนักบางแห่งลมตะวันออกเฉียงใต้ ความเร็ว 15 – 30 กม./ชม. ทะเลมีคลื่นประมาณ 1 เมตร บริเวณที่มีฝนฟ้าคะนองคลื่นสูงมากกว่า 1 เมตรอุณหภูมิต่ำสุด 23 – 28 องศาเซลเซียสอุณหภูมิสูงสุด 33 – 36 องศาเซลเซียส",
          RegionNameEnglish: "South East Coast",
          DescriptionEnglish:
            "During 7 – 8 May and 12 – 13 May, scattered thundershowers and isolated heavy rains.Southeasterly winds 10 – 30 km/hr. Wave height below 1 meter and above 1 meter in thundershowers.During 9 – 11 May, scattered to fairly widespread thundershowers and isolated heavy rains.Southeasterly winds 15 – 30 km/hr. Wave height about 1 meter and above 1 meter in thundershowers.Minimum temperature 23 – 28 °C. Maximum temperature 33 – 36 °C. ",
        },
        {
          RegionNameThai: "ภาคใต้ฝั่งตะวันตก",
          DescriptionThai:
            "ในช่วงวันที่ 7 – 8 พ.ค. และวันที่ 12 – 13 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ และมีฝนตกหนักบางแห่ง ในช่วงวันที่ 9 – 11 พ.ค. 67 มีฝนฟ้าคะนองร้อยละ 60 - 70 ของพื้นที่ และมีฝนตกหนักบางแห่งอุณหภูมิต่ำสุด 26 – 28 องศาเซลเซียส อุณหภูมิสูงสุด 34 – 37 องศาเซลเซียสลมตะวันออกเฉียงใต้ ความเร็ว 10 – 30 กม./ชม. ทะเลมีคลื่นสูงต่ำกว่า 1 เมตร บริเวณที่มีฝนฟ้าคะนองคลื่นสูงมากกว่า 1 เมตร",
          RegionNameEnglish: "South West Coast",
          DescriptionEnglish:
            "During 7 – 8 May and 12 – 13 May, scattered thundershowers and isolated heavy rains.During 9 – 11 May, scattered to fairly widespread thundershowers and isolated heavy rains.Minimum temperature 26 – 28 °C. Maximum temperature 34 – 37 °C.Southeasterly winds 10 – 30 km/hr. Wave height below 1 meter and above 1 meter in thundershowers.",
        },
        {
          RegionNameThai: "กรุงเทพและปริมณฑล",
          DescriptionThai:
            "ในช่วงวันที่ 8 – 13 พ.ค. 67  มีฝนฟ้าคะนองร้อยละ 40 - 60 ของพื้นที่ กับมีลมกระโชกแรงบางแห่งและมีฝนตกหนักบางพื้นที่อุณหภูมิต่ำสุด 22 – 29 องศาเซลเซียส อุณหภูมิสูงสุด 33 – 37 องศาเซลเซียส ลมตะวันออกเฉียงใต้ ความเร็ว 10 – 25 กม./ชม. ",
          RegionNameEnglish: "Bangkok and Perimeters",
          DescriptionEnglish:
            "During 8 – 13 May, scattered thundershower with gust and isolated heavy rainsMinimum temperature 22 – 29 °C. Maximum temperature 33 – 37 °C.Southeasterly winds 10 – 25 km/hr.  ",
        },
      ],
    },
  });

  const formatWeatherData = (rawData) => {
    const formattedData = {};
    rawData.Provinces.Province.forEach((province) => {
      const forecastData = province.SevenDaysForecast.ForecastDate.map(
        (date, index) => ({
          date,
          maxTemp: province.SevenDaysForecast.MaximumTemperature[index],
          minTemp: province.SevenDaysForecast.MinimumTemperature[index],
          windSpeed: province.SevenDaysForecast.WindSpeed[index],
          rainCover: province.SevenDaysForecast.PercentRainCover[index],
          description: province.SevenDaysForecast.DescriptionThai[index],
          windDirection: province.SevenDaysForecast.WindDirection[index],
          temperatureThai: province.SevenDaysForecast.TemperatureThai[index],
          temperatureEnglish:
            province.SevenDaysForecast.TemperatureEnglish[index],
        })
      );
      // forecastData.sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log("forecastData", forecastData);
      formattedData[province.ProvinceNameThai] = forecastData.reverse();
    });
    return formattedData;
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const renderForecastTable = () => {
    const data = weatherData[selectedProvince] || [];
    return data.map((entry) => (
      <tr key={entry.ProvinceNameEnglish}>
        <td>{entry.date}</td>
        <td>{`${entry.rainCover} %`}</td>
        <td>{entry.description}</td>
        <td>{`${entry.maxTemp} °C`}</td>
        <td>{`${entry.minTemp} °C`}</td>
        <td>{`${convertDegreesToArrow(entry.windDirection)} ${
          entry.windSpeed
        } กม./ชม. `}</td>
        {/* <td>{convertDegreesToArrow(entry.windDirection)}</td> */}
      </tr>
    ));
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      axios.get("data.json").then((response) => {
        const formattedData = formatWeatherData(response.data);
        setWeatherData(formattedData);
        const firstProvince = Object.keys(formattedData)[0];
        if (firstProvince) {
          setSelectedProvince(firstProvince);
        }
      });
    };

    fetchWeatherData();
  }, []);

  // const fetchData = async () => {
  //   const response = await axios.get(
  //     `https://data.tmd.go.th/api/WeatherForecast7DaysByRegion/v2/?uid=${UID}&ukey=${UKEY}&format=json`
  //   );
  //   console.log(response.data);
  //   return response.data;
  // };

  // useEffect(() => {
  //   fetchData().then((data) => {
  //     setData(data);
  //   });
  // });

  return (
    <>
      <h2>ลักษณะอากาศรายภาค {data.OverallForecast.Date}</h2>
      <p>{data.OverallForecast.OverallDescriptionThai}</p>
      <div className="card">
        <p>
          <table>
            <tr>
              <th>ภาค</th>
              <th>ลักษณะอากาศ</th>
            </tr>
            {data.OverallForecast.RegionForecast.map((region) => (
              <tr key={region.RegionNameThai}>
                <td>{region.RegionNameThai}</td>
                <td>{region.DescriptionThai}</td>
              </tr>
            ))}
          </table>
        </p>
      </div>
      <div>
        <select onChange={handleProvinceChange} value={selectedProvince}>
          {Object.keys(weatherData).map((province) => (
            <option key={province.ProvinceNameThai} value={province}>
              {province}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>วันที่</th>
              <th>ฝนปกคลุม</th>
              <th>คำอธิบาย</th>
              <th>อุณหภูมิสูงสุด (°C)</th>
              <th>อุณหภูมิต่ำสุด (°C)</th>
              {/* <th>ความเร็วลม (กม./ชม.)</th> */}
              <th>ทิศทางลม</th>
            </tr>
          </thead>
          <tbody>{renderForecastTable()}</tbody>
        </table>
      </div>
      <iframe
        src="https://www.rainviewer.com/map.html?loc=13.7563,100.5018,8&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=0&c=3&o=83&lm=1&layer=radar&sm=1&sn=1&hu=false"
        width="100%"
        frameBorder="0"
        // style="border:0;height:50vh;"
        style={{ border: 0, height: "50vh" }}
        allowfullscreen
      ></iframe>

      <iframe
        width="100%"
        height="450"
        src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=9&overlay=temp&product=ecmwf&level=surface&lat=13.645&lon=100.646"
        frameBorder="0"
        allowfullscreen
      ></iframe>
    </>
  );
}

export default App;
