type Props = {
  title: string;
  children: React.ReactNode;
};

const ControlGroup = ({ title, children }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-slate-900">{title}</h3>

      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default ControlGroup;
