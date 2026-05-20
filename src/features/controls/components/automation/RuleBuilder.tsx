import { useState } from "react";

import TriggerSelector from "./TriggerSelector";
import ActionSelector from "./ActionSelector";

const RuleBuilder = () => {
  const [trigger, setTrigger] = useState("Temperature High");

  const [action, setAction] = useState("Turn ON Device");

  const handleSave = () => {
    console.log({
      trigger,
      action,
    });
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Automation Rule
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure smart automation
        </p>
      </div>

      <div className="space-y-5">
        <TriggerSelector value={trigger} onChange={setTrigger} />

        <ActionSelector value={action} onChange={setAction} />

        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
        >
          Save Rule
        </button>
      </div>
    </div>
  );
};

export default RuleBuilder;
