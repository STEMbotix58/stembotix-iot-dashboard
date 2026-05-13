const cards = [
  {
    title: "Total Devices",
    value: "128",
  },
  {
    title: "Online Devices",
    value: "104",
  },
  {
    title: "Offline Devices",
    value: "24",
  },
  {
    title: "Alerts",
    value: "7",
  },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">{card.title}</p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
