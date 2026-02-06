import Link from "next/link";

export function LocalMapCard() {
  return (
    <Link href="/map" className="block mb-8 relative rounded-[2rem] overflow-hidden h-48 group cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
      <img
        alt="Local Weather Map"
        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 transition-opacity group-hover:opacity-50 transition-transform duration-700 group-hover:scale-110"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrtYdfsFPAEId7fWf1BY6soeIZA1VXSAUh4PyGDSwPHRUbVuxR0qZLg2VTOnAD_czX57kIFOeZQ3CcXM4APSwjdM1tz1owLfqKPA1bppIrQrfUxddt29QW_hZnmdFR8v7ze7SWDO5JIGZtwxfnZzDD3Q-Tr7CSBLkafy8-EPHB4ofzXY4i1BPSwB8PY2nI60hA885vXV4VmY0ekF7Me324sMPuJEYiRlMULKDXVT1dkghcr70FQdpSch374I-1jTUbdDhg3VIsTuFG"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-bold text-white text-lg">Local Weather Map</h3>
            <p className="text-gray-300 text-xs mt-1">Explore wind, weather and ocean conditions.</p>
          </div>
          <div className="w-10 h-10 bg-[#B2DAFF] rounded-full flex items-center justify-center text-gray-900 shadow-lg transform group-hover:scale-110 transition-transform">
            <span className="material-icons">near_me</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
