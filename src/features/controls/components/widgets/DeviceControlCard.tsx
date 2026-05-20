type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const DeviceControlCard = ({ title, description, children }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {children}
    </div>
  );
};

export default DeviceControlCard;
