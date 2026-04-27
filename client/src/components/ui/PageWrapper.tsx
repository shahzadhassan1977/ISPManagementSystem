export default function PageWrapper({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-gray-500 text-sm">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      {/* CONTENT CARD */}
      <div className="bg-white rounded-xl shadow p-4">
        {children}
      </div>

    </div>
  );
}