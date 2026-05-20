import { useState } from "react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import OverviewCards from "@/features/dashboard/components/OverviewCards";
import DeviceStatusTable from "@/features/dashboard/components/DeviceStatusTable";
import LineChart from "@/shared/charts/LineChart";

// Widgets

import ToggleSwitchWidget from "@/features/controls/components/widgets/ToggleSwitchWidget";
import LightControlWidget from "@/features/controls/components/widgets/LightControlWidget";
import FanSpeedSliderWidget from "@/features/controls/components/widgets/FanSpeedSliderWidget";
import RGBLightWidget from "@/features/controls/components/widgets/RGBLightWidget";
import ThermostatWidget from "@/features/controls/components/widgets/ThermostatWidget";
import DoorLockWidget from "@/features/controls/components/widgets/DoorLockWidget";
import PowerButtonWidget from "@/features/controls/components/widgets/PowerButtonWidget";
import CameraControlWidget from "@/features/controls/components/widgets/CameraControlWidget";
import MotionControlWidget from "@/features/controls/components/widgets/MotionControlWidget";
import SmartPlugWidget from "@/features/controls/components/widgets/SmartPlugWidget";
import SceneSelectorWidget from "@/features/controls/components/widgets/SceneSelectorWidget";
import MapWidget from "@/features/controls/components/widgets/MapWidget";
import AirQualityWidget from "@/features/controls/components/widgets/AirQualityWidget";
import AlarmKeypadWidget from "@/features/controls/components/widgets/AlarmKeypadWidget";
import AudioPlayerWidget from "@/features/controls/components/widgets/AudioPlayerWidget";
import WeatherWidget from "@/features/controls/components/widgets/WeatherWidget";
import GarageDoorWidget from "@/features/controls/components/widgets/GarageDoorWidget";
import NetworkHealthWidget from "@/features/controls/components/widgets/NetworkHealthWidget";

import useDeviceActions from "@/features/controls/hooks/useDeviceActions";

const DashboardPage = () => {
  const [enabled, setEnabled] = useState(true);

  const [brightness, setBrightness] = useState(60);

  const [fanSpeed, setFanSpeed] = useState(3);

  const [color, setColor] = useState("#3b82f6");

  const [temperature, setTemperature] = useState(24);

  const [locked, setLocked] = useState(true);

  const [power, setPower] = useState(true);

  const { turnOn, turnOff, loading } = useDeviceActions("DEV-001");

  const [plugEnabled, setPlugEnabled] = useState(true);

  const [scene, setScene] = useState("Home");

  const data = [
    {
      name: "Temperature",
      data: [22, 24, 25, 21, 28, 30],
    },
  ];
  return (
    <>
      <DashboardHeader />
      <div className="mt-6">
        <OverviewCards />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LineChart
            title="Temperature Analytics"
            series={data}
            categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          />
        </div>
        <div>
          <DeviceStatusTable />
        </div>
      </div>
      {/* Widgets Section */}
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">Device Controls</h2>

          <p className="mt-1 text-sm text-slate-500">
            Interactive IoT control widgets
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ToggleSwitchWidget
            enabled={enabled}
            onToggle={() => setEnabled(!enabled)}
          />
          <LightControlWidget
            brightness={brightness}
            onChange={setBrightness}
          />
          <FanSpeedSliderWidget speed={fanSpeed} onChange={setFanSpeed} />
          <RGBLightWidget color={color} onChange={setColor} />
          <ThermostatWidget
            temperature={temperature}
            onChange={setTemperature}
          />
          <DoorLockWidget locked={locked} onToggle={() => setLocked(!locked)} />
          <PowerButtonWidget
            active={power}
            loading={loading}
            onToggle={() => {
              if (power) {
                turnOff();
              } else {
                turnOn();
              }
              setPower(!power);
            }}
          />
          <CameraControlWidget />
          <MotionControlWidget detected={true} />
          <SmartPlugWidget
            enabled={plugEnabled}
            powerUsage={124}
            onToggle={() => setPlugEnabled(!plugEnabled)}
          />
          <SceneSelectorWidget
            scenes={["Home", "Sleep", "Party", "Away", "Read", "Relax"]}
            selected={scene}
            onSelect={setScene}
          />
          <MapWidget />
          <AirQualityWidget aqi={120} />
          <AlarmKeypadWidget
            currentState={"ARMED_AWAY"}
            onStateChange={() => true}
          />
          <AudioPlayerWidget
            isPlaying={true}
            songTitle={" "}
            artist={"K.K."}
            volume={30}
            onTogglePlay={() => 100}
            onVolumeChange={() => 100}
          />
          <WeatherWidget
            temperature={40}
            condition={"Sunny"}
            humidity={70}
            windSpeed={50}
          />
          <GarageDoorWidget doorState="OPEN" onToggle={() => "CLOSED"} />
          <NetworkHealthWidget
            ping={2}
            download={23}
            upload={35}
            online={false}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
