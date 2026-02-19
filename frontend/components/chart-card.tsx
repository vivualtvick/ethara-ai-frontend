

export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full min-h-48 bg-black border border-gray-700 rounded-md flex flex-col items-start justify-start p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
      <div className="flex w-full h-full justify-center items-center">
        {children}
      </div>
    </div>
  );
}