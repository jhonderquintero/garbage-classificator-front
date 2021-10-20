export const ProcessCard = ({ content, spanSize, title }: any) => {
  return (
    <div
      className={`flex flex-col col-span-${spanSize} bg-white shadow-lg rounded-sm border border-gray-200`}
    >
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </header>

      {content}
    </div>
  );
};
