import ToggleSwitchWidget from "../widgets/ToggleSwitchWidget";
import LightControlWidget from "../widgets/LightControlWidget";
import FanSpeedSliderWidget from "../widgets/FanSpeedSliderWidget";

import ControlGroup from "./ControlGroup";
import QuickActions from "./QuickActions";

type Props = {
  enabled: boolean;
  brightness: number;
  fanSpeed: number;
  onToggle: () => void;
  onBrightnessChange: (value: number) => void;
  onFanSpeedChange: (value: number) => void;
};

const DeviceControlPanel = ({
  enabled,
  brightness,
  fanSpeed,
  onToggle,
  onBrightnessChange,
  onFanSpeedChange,
}: Props) => {
  return (
    <div className="space-y-6">
      <ControlGroup title="Quick Actions">
        <QuickActions
          onAllOn={() => console.log("All ON")}
          onAllOff={() => console.log("All OFF")}
          onEmergency={() => console.log("Emergency")}
        />
      </ControlGroup>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ToggleSwitchWidget enabled={enabled} onToggle={onToggle} />

        <LightControlWidget
          brightness={brightness}
          onChange={onBrightnessChange}
        />

        <FanSpeedSliderWidget speed={fanSpeed} onChange={onFanSpeedChange} />
      </div>
    </div>
  );
};

export default DeviceControlPanel;
