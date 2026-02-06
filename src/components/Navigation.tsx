export function Navigation() {
  return (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-[#1E1F29] border-t border-gray-100 dark:border-gray-800 px-8 py-4 flex justify-between items-center z-30 pb-6 rounded-t-3xl">
      <button className="flex flex-col items-center gap-1 text-[#B2DAFF]">
        <span className="material-icons">home</span>
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#B2DAFF] transition-colors">
        <span className="material-icons">map</span>
        <span className="text-[10px] font-medium">Map</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#B2DAFF] transition-colors">
        <span className="material-icons">calendar_today</span>
        <span className="text-[10px] font-medium">Forecast</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#B2DAFF] transition-colors">
        <span className="material-icons">settings</span>
        <span className="text-[10px] font-medium">Settings</span>
      </button>
    </nav>
  );
}
