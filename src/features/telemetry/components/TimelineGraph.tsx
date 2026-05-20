type Props = {
  events: {
    time: string;
    label: string;
  }[];
};

const TimelineGraph = ({ events }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Event Timeline
      </h2>

      <div className="space-y-5">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-black" />

            <div>
              <p className="font-medium text-slate-900">{event.label}</p>

              <p className="text-sm text-slate-500">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineGraph;
