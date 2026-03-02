import React, { useState, useEffect } from 'react';
// import { LandPlot, Waves, Flame, Menu, X, Sun } from 'lucide-react'; // Flame temporarily hidden
import { LandPlot, Waves, Menu, X, Sun } from 'lucide-react';

// --- HELPER COMPONENTS ---

const ChevronIcon = ({ isOpen }) => (
  <svg 
    className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);

// --- HEADER COMPONENT ---
const Header = ({ currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', title: 'Home', activeColor: 'text-orange-600', hoverColor: 'hover:text-orange-600' },
    { id: 'landscapechange', title: 'Landscape Change', activeColor: 'text-green-600', hoverColor: 'hover:text-green-600' },
    { id: 'floods', title: 'Floods', activeColor: 'text-blue-600', hoverColor: 'hover:text-blue-600' },
    // { id: 'wildfires', title: 'Wildfires', activeColor: 'text-red-600', hoverColor: 'hover:text-red-600' }, // TEMPORARILY HIDDEN
    { id: 'drought', title: 'Drought', activeColor: 'text-orange-600', hoverColor: 'hover:text-orange-600' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* Logo and Title */}
            <button
              onClick={() => setPage('home')}
              className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md"
            >
              <img 
                className="h-10 w-auto" 
                src="SLIM_logo.png" 
                alt="SLIM Logo" 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x40/f3f4f6/374151?text=SLIM+Logo'; }} 
              />
              <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">Maps</span>
            </button>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setPage(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === link.id
                      ? `${link.activeColor} bg-gray-50 border border-gray-200 shadow-sm`
                      : `text-gray-600 ${link.hoverColor} hover:bg-gray-50`
                  } transition-all duration-200`}
                >
                  {link.title}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.id
                    ? `${link.activeColor} bg-gray-50`
                    : `text-gray-600 ${link.hoverColor} hover:bg-gray-50`
                }`}
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// --- HOME PAGE COMPONENT ---
const HomePage = ({ setPage }) => {
  return (
    <div className="flex flex-col lg:flex-row flex-grow min-h-[calc(100vh-8rem)]">
      {/* Left Column: Hero Section */}
      <div 
        className="lg:w-5/12 bg-cover bg-center flex flex-col justify-center relative p-8 lg:p-12 text-white"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('slim_portal_banner.png')",
        }}
      >
        {/* Fallback for bg image if local file fails - Added alt tag to fix build error */}
        <img 
            src="slim_portal_banner.png" 
            className="hidden" 
            alt="Banner Background"
            onError={(e) => { 
                e.target.parentElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2074')";
            }} 
        />

        <div className="relative z-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight drop-shadow-lg mb-4 2xl:mb-6">
            SLIM Project<br/>Online Maps
          </h2>
          <div className="w-20 h-1 bg-orange-500 mb-4 2xl:mb-6 mx-auto lg:mx-0"></div>
          <p className="text-base lg:text-lg 2xl:text-xl text-gray-100 drop-shadow-md leading-relaxed mb-4 2xl:mb-6">
            The SLIM (Sustainable Landscape through Integrated Management) project aims to build institutional capacity in Zambia for effective landscape management and natural disaster preparedness through the use of geospatial data.
          </p>
          
          {/* TEMPORARILY HIDDEN WILDFIRES FROM INTRO TEXT */}
          {/* <p className="text-sm lg:text-base 2xl:text-lg text-blue-200 font-medium drop-shadow-md">
            Explore maps in four thematic areas: Landscape Change, Floods, Wildfires, and Drought.
          </p> */}
          <p className="text-sm lg:text-base 2xl:text-lg text-blue-200 font-medium drop-shadow-md">
            Explore maps in three thematic areas: Landscape Change, Floods, and Drought.
          </p>

        </div>
      </div>

      {/* Right Column: Maps Grid */}
      <div className="lg:w-7/12 bg-gray-50 p-4 lg:p-8 2xl:p-10 flex flex-col justify-center">
        {/* Adjusted breakpoints for spacing and max-width to better fit smaller laptops */}
        <div className="grid gap-4 xl:gap-6 2xl:gap-8 sm:grid-cols-2 max-w-4xl 2xl:max-w-5xl mx-auto w-full h-full">
            {/* Landscape Change Tile */}
            <div 
              className="group bg-white rounded-xl shadow-md p-4 lg:p-5 2xl:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full justify-between"
              onClick={() => setPage('landscapechange')}
            >
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="bg-green-50 p-3 lg:p-4 2xl:p-6 rounded-full mb-3 lg:mb-4 2xl:mb-6 group-hover:bg-green-100 transition-colors">
                  <LandPlot className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-16 2xl:h-16 text-green-600" />
                </div>
                <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-gray-900 mb-2 2xl:mb-3">Landscape Change</h3>
                <p className="text-xs lg:text-sm 2xl:text-base text-gray-600 leading-relaxed">Explore land cover and land cover flows in detail to understand environmental shifts.</p>
              </div>
              <span className="mt-3 lg:mt-4 2xl:mt-6 text-sm 2xl:text-base font-semibold text-green-600 group-hover:text-green-700 flex items-center">View Map <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></span>
            </div>

            {/* Floods Tile */}
            <div 
              className="group bg-white rounded-xl shadow-md p-4 lg:p-5 2xl:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full justify-between"
              onClick={() => setPage('floods')}
            >
               <div className="flex-1 flex flex-col items-center justify-center">
                <div className="bg-blue-50 p-3 lg:p-4 2xl:p-6 rounded-full mb-3 lg:mb-4 2xl:mb-6 group-hover:bg-blue-100 transition-colors">
                  <Waves className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-16 2xl:h-16 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-gray-900 mb-2 2xl:mb-3">Floods</h3>
                <p className="text-xs lg:text-sm 2xl:text-base text-gray-600 leading-relaxed">View maps of flood-prone areas and historical inundation events for better preparedness.</p>
              </div>
              <span className="mt-3 lg:mt-4 2xl:mt-6 text-sm 2xl:text-base font-semibold text-blue-600 group-hover:text-blue-700 flex items-center">View Map <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></span>
            </div>

            {/* TEMPORARILY HIDDEN WILDFIRES TILE */}
            {/* <div 
              className="group bg-white rounded-xl shadow-md p-4 lg:p-5 2xl:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full justify-between"
              onClick={() => setPage('wildfires')}
            >
               <div className="flex-1 flex flex-col items-center justify-center">
                <div className="bg-red-50 p-3 lg:p-4 2xl:p-6 rounded-full mb-3 lg:mb-4 2xl:mb-6 group-hover:bg-red-100 transition-colors">
                  <Flame className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-16 2xl:h-16 text-red-600" />
                </div>
                <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-gray-900 mb-2 2xl:mb-3">Wildfires</h3>
                <p className="text-xs lg:text-sm 2xl:text-base text-gray-600 leading-relaxed">Explore wildfire risk, historical burn scars and active fire data for effective response.</p>
              </div>
              <span className="mt-3 lg:mt-4 2xl:mt-6 text-sm 2xl:text-base font-semibold text-red-600 group-hover:text-red-700 flex items-center">View Map <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></span>
            </div>
            */}

            {/* Drought Tile */}
            <div 
              className="group bg-white rounded-xl shadow-md p-4 lg:p-5 2xl:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full justify-between"
              onClick={() => setPage('drought')}
            >
               <div className="flex-1 flex flex-col items-center justify-center">
                <div className="bg-orange-50 p-3 lg:p-4 2xl:p-6 rounded-full mb-3 lg:mb-4 2xl:mb-6 group-hover:bg-orange-100 transition-colors">
                  <Sun className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-16 2xl:h-16 text-orange-600" />
                </div>
                <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-gray-900 mb-2 2xl:mb-3">Drought</h3>
                <p className="text-xs lg:text-sm 2xl:text-base text-gray-600 leading-relaxed">Monitor drought conditions and anomaly frequency to support agricultural planning.</p>
              </div>
              <span className="mt-3 lg:mt-4 2xl:mt-6 text-sm 2xl:text-base font-semibold text-orange-600 group-hover:text-orange-700 flex items-center">View Map <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></span>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- ACTIVITY PAGE COMPONENT ---
const ActivityPage = (props) => {
  const { title, icon: Icon, iconColor } = props;
  const hasTabs = !!(props.tabs && props.tabs.length > 0);
  
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(hasTabs ? props.tabs[0].id : null);

  // Synchronize activeTab state when props change
  useEffect(() => {
    if (hasTabs) {
      setActiveTab(props.tabs[0].id);
    } else {
      setActiveTab(null);
    }
  }, [hasTabs, props.tabs]); 

  let currentContent = props;
  if (hasTabs) {
    const currentTabId = activeTab || (props.tabs && props.tabs[0].id);
    if (currentTabId && props.maps) {
        currentContent = props.maps[currentTabId];
    }
  }
  
  if (!currentContent) {
    return (
        <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading map data...</p>
            </div>
        </div>
    ); 
  }

  const { intro, mapUrl, dataDescription, dataInterpretation } = currentContent;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-200 overflow-hidden">
      <iframe
        key={mapUrl}
        className="absolute top-0 left-0 w-full h-full border-0"
        src={mapUrl}
        title={`${title} Map`}
        allowFullScreen
        loading="lazy"
      ></iframe>

      {/* Info Panel */}
      <div 
        className={`absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl transition-all duration-500 ease-in-out border border-gray-200 flex flex-col
        ${isPanelOpen ? 'max-h-[85vh] w-[90vw] sm:w-[32rem]' : 'max-h-[4.5rem] w-[14rem]'}`}
      >
        {/* Panel Header */}
        <div 
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 rounded-t-lg transition-colors" 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center truncate">
              {Icon && <Icon className={`w-6 h-6 mr-2 flex-shrink-0 ${iconColor}`} />}
              <span className="truncate">{title}</span>
            </h2>
            <button
                className="p-1.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 ml-2"
                aria-label={isPanelOpen ? "Close info panel" : "Open info panel"}
            >
                <ChevronIcon isOpen={isPanelOpen} />
            </button>
        </div>
        
        {/* Panel Content */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-col ${isPanelOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="px-5 pb-6 overflow-y-auto custom-scrollbar">
                {/* Tabs */}
                {hasTabs && (
                    <div className="border-b border-gray-200 mb-5 sticky top-0 bg-white/95 backdrop-blur-sm pt-1 z-10">
                        <nav className="-mb-px flex space-x-1" aria-label="Tabs">
                            {props.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                        activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                    } whitespace-nowrap py-2 px-3 border-b-2 font-medium text-sm rounded-t-md transition-colors flex-1 text-center`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
                
                <div className="space-y-6">
                    <div>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{intro}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center mb-2">
                            <span className="w-1 h-5 bg-blue-500 mr-2 rounded-full"></span>
                            Data Description
                        </h3>
                        <div className="prose prose-sm text-gray-600 max-w-none">
                            {dataDescription}
                        </div>
                    </div>
                    
                    {dataInterpretation && (
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center mb-2">
                                <span className="w-1 h-5 bg-indigo-500 mr-2 rounded-full"></span>
                                Data Interpretation
                            </h3>
                            <div className="prose prose-sm text-gray-600 max-w-none">
                                {dataInterpretation}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- FOOTER COMPONENT ---
const Footer = ({ currentPage }) => {
  return (
      <footer className="bg-gray-900 text-gray-400 text-sm border-t border-gray-800">
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
              {currentPage === 'home' && (
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-8">
                  {/* Funded by Section */}
                  <div className="flex flex-col items-center">
                    <p className="mb-3 font-semibold text-gray-300 uppercase tracking-wider text-xs">Funded by</p>
                    <div className="flex items-center justify-center gap-4 bg-white p-3 rounded-lg shadow-sm">
                       <img className="h-10 w-auto object-contain" src="EN Co-funded by the EU_POS.jpg" alt="EU" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x50/eee/333?text=EU+Logo'; }}/>
                       <div className="h-8 w-px bg-gray-200"></div>
                       <img className="h-8 w-auto rounded shadow-sm object-cover" src="https://flagcdn.com/cz.svg" alt="Czechia" />
                       <img className="h-8 w-auto rounded shadow-sm object-cover" src="https://flagcdn.com/se.svg" alt="Sweden" />
                    </div>
                  </div>

                  {/* Implemented by Section */}
                  <div className="flex flex-col items-center">
                    <p className="mb-3 font-semibold text-gray-300 uppercase tracking-wider text-xs">Implemented by</p>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <img className="h-10 object-contain" src="CzechAid_basic_frame_sanitized.png" alt="Czech Aid" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x40/eee/333?text=CzechAid'; }}/>
                    </div>
                  </div>
                </div>
              )}
              <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-center md:text-left">
                      &copy; {new Date().getFullYear()} SLIM Project. All Rights Reserved.
                  </p>
                  <p className="mt-2 md:mt-0 text-gray-600 text-xs">
                      Sustainable Landscape through Integrated Management
                  </p>
              </div>
          </div>
      </footer>
  );
}

// --- VALID PAGES DEFINITION FOR ROUTING ---
// const VALID_PAGES = ['home', 'landscapechange', 'floods', 'wildfires', 'drought']; // TEMPORARILY HIDDEN
const VALID_PAGES = ['home', 'landscapechange', 'floods', 'drought'];

// --- MAIN APP COMPONENT ---
export default function App() {
  
  // Initialize state based on the current URL hash
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return VALID_PAGES.includes(hash) ? hash : 'home';
  };

  const [currentPage, setPage] = useState(getPageFromHash());

  // Listen for browser navigation (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update the URL hash and scroll to top when the page changes
  useEffect(() => {
    if (currentPage === 'home') {
      // Clear the hash for the home page for a cleaner URL
      window.history.pushState(null, null, ' ');
    } else {
      window.location.hash = currentPage;
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  const pageData = {
    landscapechange: {
      title: "Landscape Change",
      icon: LandPlot,
      iconColor: "text-green-600",
      intro: "This map captures the status of Zambia’s landscape and historical changes to it since 2000. Building on previous landscape monitoring, it serves as a multi-purpose product to support environmental protection, good governance, climate change adaptation, and risk reduction.",
      mapUrl: "https://gisat.github.io/slim-112-lulc-map/#11/-15.4607/27.9242",
      dataDescription: (
        <div className="space-y-3">
          <p>The data presented here is derived from high resolution satellite imagery and processed using advanced machine learning algorithms. It delivers a detailed portrait of the landscape and its changes, capturing natural features, vegetation, and patterns of human activity with precision.</p>
          <p>Land cover types were selected and validated with the active participation of Zambian public sector stakeholders to reflect their specific needs and use cases.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Primary data:</strong> Monthly Landsat and Sentinel-2 composites from 2000–2024.</li>
            <li><strong>Ancillary data:</strong> Digital Elevation Model (DEM-SRTM), EO data derivatives like VIs</li>
            <li><strong>Training data:</strong> Existing Land Cover maps (SLIM Baseline 2023, WorldCover2020, WorldCover2021) and ancillary datasets including GlobalForestWatch, OpenStreetMap, WorldCereal, ZambiaWSF, GHSL, WorldWater, Hydro Zambia, and Global Wetlands.</li>
          </ul>
          <p>The data was interpreted using a proprietary, state-of-the-art Machine Learning classification processing chain.</p>
        </div>
      ),
      dataInterpretation: (
         <p>The concept of LC flows represents changes identified by initial and current LC classes. Grouped change combinations represent defined flows, differentiating key and secondary flows, and excluding unlikely types.</p>
      )
    },
    floods: {
      title: "Floods",
      icon: Waves,
      iconColor: "text-blue-600",
      tabs: [
          { id: 'hazard', name: 'Flood Hazard' },
          { id: 'risk', name: 'Flood Risk' },
      ],
      maps: {
          hazard: {
              intro: "Flood mapping aims to improve preparedness and response by identifying communities and infrastructure at risk, supporting mitigation efforts and emergency planning. These risk assessments are primarily based on topographical models, such as the HAND model, and include historical flood data.",
              mapUrl: "https://gisat.github.io/slim-121-floods-map/#10/-15.7302/27.2639",
              dataDescription: (
                <div className="space-y-3">
                  <p>The HAND (Height Above Nearest Drainage) model is based on the following data sources:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>DEM (Digital Elevation Model):</strong> SRTM (Shuttle Radar Topography Mission) data, approximately 30m resolution, was used.</li>
                    <li><strong>Rivers:</strong> HydroATLAS Zambia data was used for river networks.</li>
                  </ul>
                  <p>Flood analysis was prepared using the following inputs:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>GLOFAS (Global Flood Awareness System):</strong> Long time series data (1980-2018, daily values) for approximating discharges in coarse resolution.</li>
                    <li><strong>JRC Flood Map (Joint Research Centre):</strong> A map for a 100-year return period, valuable for estimating and validating expected flood extent.</li>
                    <li><strong>ESA WorldCover 2021:</strong> Used for hydrological characteristics of watersheds based on land cover.</li>
                  </ul>
                </div>
              ),
              dataInterpretation: (
                 <div className="space-y-3">
                  <p>Obstacles to using this data include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>River geometry limitation:</strong> Precise definition of channel geometries (longitudinal river profile vs. cross-section) is a challenge and is derived from DEM only.</li>
                    <li><strong>Calibration & validation:</strong> A lack of observed flood extent data in Zambia makes robust model verification difficult.</li>
                    <li><strong>Data quality vs. availability:</strong> There's a trade-off between the coarse resolution of GLOFAS data and the availability of precise in-situ measurements.</li>
                    <li><strong>HAND limitations:</strong> HAND is a conceptual model, not a full hydrodynamic model, and does not consider factors like geological characteristics.</li>
                  </ul>
                 </div>
              )
          },
          risk: {
              intro: "This map illustrates the spatial distribution of flood risk across districts in the Green Nexus area (Zambia) for a 100-year return period scenario (Q100).",
              mapUrl: "https://gisat.github.io/slim-121-floods-map/slim_121_flood_risk.html",
              dataDescription: (
                  <div className="space-y-3">
                      <p>The risk levels are defined by the Composite Risk Index (CRI), calculated as a function of:</p>
                      <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Hazard:</strong> Final Flood Hazard maps.</li>
                          <li><strong>Exposure:</strong> Population, built-up areas, transportation infrastructure, and agriculture.</li>
                          <li><strong>Socio-economic Vulnerability:</strong> Housing quality, demographics, and access to water.</li>
                      </ul>
                  </div>
              ),
              dataInterpretation: (
                  <div className="space-y-3">
                      <p>The map highlights priority hotspots where high physical exposure intersects with limited coping capacity. By classifying districts from Very Low to Very High risk, this tool supports strategic decision-making and resource allocation.</p>
                  </div>
              )
          }
      }
    },
    // --- TEMPORARILY HIDDEN WILDFIRES DATA ---
    /*
    wildfires: {
      title: "Wildfires",
      icon: Flame,
      iconColor: "text-red-600",
      tabs: [
          { id: 'assessment', name: 'Assessment' },
          { id: 'detected', name: 'Fire Hazard' },
          { id: 'annual', name: 'Annual Overview' },
      ],
      maps: {
          assessment: {
              intro: "The Wildfire Risk Assessment map service provides up-to-date information on wildfire risk based on vegetation and weather conditions.",
              mapUrl: "https://gisat.github.io/slim-122-wildfires-map/zambia_fire_map_corrected.html",
              dataDescription: <p>The risk assessment model considers factors like vegetation type, fuel load, slope, and current drought conditions. This tool is intended for use by fire management agencies and the public to promote awareness and safety.</p>,
              dataInterpretation: <p>Interpret the wildfire risk map as a guide for strategic planning. Areas marked as high-risk may warrant proactive measures like creating firebreaks or conducting controlled burns.</p>
          },
          detected: {
              intro: "This map analyzes fire assessment and hazard estimation within the Green Nexus area of Zambia using data from global fire monitoring services. It visualizes the spatial patterns and intensity of fires in 2024, contrasted with near real-time fire hotspots and the Fire Weather Index (FWI). A time-series chart compares daily fire event frequency between 2024 and 2023.",
              mapUrl: "https://gisat.github.io/slim-122-wildfires-map/zambia_fire_S3_map_full.html",
              dataDescription: (
                <div className="space-y-3">
                  <p>The data is sourced from and compared across three global fire services:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>FIRMS (Fire Information for Resource Management System):</strong> Provides near real-time active fire data from MODIS and VIIRS satellite instruments for immediate awareness.</li>
                    <li><strong>GWIS (Global Wildfire Information System):</strong> Offers a comprehensive view of fire regimes, including fire danger forecasts and historical analysis.</li>
                    <li><strong>S3 World Fire Atlas:</strong> An ESA project providing long-term global dataset of nighttime fire detections from Sentinel-3A for analyzing trends.</li>
                  </ul>
                </div>
              ),
              dataInterpretation: <p>Use this map for situational awareness of ongoing fire events. Note that cloud cover can obscure satellite detections.</p>
          },
          annual: {
              intro: "This map provides an overview of total burned areas for a selected year.",
              mapUrl: "https://gisat.github.io/slim-122-wildfires-map/zambia_fire_S3_chart_with_legend_and_trendlines.html",
              dataDescription: <p>The historical burn scar data is derived from analysis of Sentinel-2 satellite imagery, identifying areas that have been affected by fire over the selected annual period.</p>,
              dataInterpretation: <p>The historical burn scar data can help in understanding fire frequency, ecosystem response, and long-term fire regime patterns.</p>
          }
      }
    },
    */
    drought: {
      title: "Drought",
      icon: Sun,
      iconColor: "text-orange-600",
      tabs: [
          { id: 'anomaly', name: 'Anomaly Frequency' },
          { id: 'impact', name: 'Impact Warning' },
          { id: 'aggregated', name: 'Aggregated Maps' },
      ],
      maps: {
          anomaly: {
              intro: "This map shows the frequency of drought anomalies, indicating the proportion of time a specific location experienced anomalous drought conditions within a given year.",
              mapUrl: "https://gisat.github.io/slim-123-drought-map/index_Drought_AnomalyFreq.html#8/-15.290/27.804",
              dataDescription: (
                <div className="space-y-3">
                  <p>The maps are generated annually using four MODIS-derived variables:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>NDVI:</strong> Impact on green biomass density.</li>
                    <li><strong>LST:</strong> Land surface temperature conditions.</li>
                    <li><strong>ESI & WUE:</strong> Vegetation evapotranspiration and water use efficiency.</li>
                  </ul>
                </div>
              ),
              dataInterpretation: (
                 <p>The values are expressed as percentages representing the ratio of detected drought anomalies to all valid satellite observations. For example, a value of 50% means the given spot stayed in a drought anomaly for half of the available observations that year.</p>
              )
          },
          impact: {
              intro: "This map provides a mid-term prediction of drought impacts on biomass production in croplands and grasslands, helping to identify potential risks to food security.",
              mapUrl: "https://gisat.github.io/slim-123-drought-map/index_Drought_ImpactWarn.html",
              dataDescription: (
                  <div className="space-y-3">
                      <p>Using a time-series of vegetation and climate variables (NDVI, LST, ESI, GPP, WUE, and precipitation), the map offers four outputs:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Absolute Productivity:</strong> Estimated cumulative biomass production.</li>
                        <li><strong>Long-Term Average:</strong> Historical baseline calculated from 2000–2024.</li>
                        <li><strong>Relative to Average / Maximum:</strong> The ratio of current estimates against the historical mean or maximum.</li>
                      </ul>
                  </div>
              ),
              dataInterpretation: (
                  <div className="space-y-3">
                      <p>Rather than absolute units (like t/ha), this tool uses a unitless cumulative biomass index where higher values represent greater productivity. On the "Relative" layers, a value of 100% signifies average production. Values below 100% indicate expected biomass deficits, while values above indicate surpluses.</p>
                  </div>
              )
          },
          aggregated: {
              intro: "These maps provide an overview of drought hot-spots through spatio-temporal aggregation, allowing for a comprehensive assessment of drought persistence and seasonal variability.",
              mapUrl: "https://gisat.github.io/slim-123-drought-map/index_Drought_AggregMaps.html",
              dataDescription: (
                  <div className="space-y-3">
                      <p>Generated using the same four MODIS variables (NDVI, LST, ESI, WUE), the data is visualized across four specific timeframes:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>365 Days:</strong> Annual cycle (September to August).</li>
                        <li><strong>Hot-Dry Season:</strong> September to October.</li>
                        <li><strong>Wet Season:</strong> November to April.</li>
                        <li><strong>Cold-Dry Season:</strong> May to August.</li>
                      </ul>
                  </div>
              ),
              dataInterpretation: (
                  <div className="space-y-3">
                      <p>Current conditions are compared to a 2000–2024 reference period and aggregated into a 5-class severity scale:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Class 1:</strong> Very close to the worst drought conditions ever observed.</li>
                        <li><strong>Class 2:</strong> Worse than common conditions.</li>
                        <li><strong>Class 3:</strong> Close to common conditions.</li>
                        <li><strong>Class 4:</strong> Better than common conditions (wetter than usual).</li>
                        <li><strong>Class 5:</strong> Close to the wettest conditions ever observed.</li>
                      </ul>
                  </div>
              )
          }
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landscapechange':
        return <ActivityPage {...pageData.landscapechange} />;
      case 'floods':
        return <ActivityPage {...pageData.floods} />;
      // case 'wildfires':
      //   return <ActivityPage {...pageData.wildfires} />; // TEMPORARILY HIDDEN
      case 'drought':
        return <ActivityPage {...pageData.drought} />;
      case 'home':
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
      <Header currentPage={currentPage} setPage={setPage} />
      <main className="flex-grow relative">
        {renderPage()}
      </main>
      {currentPage === 'home' && <Footer currentPage={currentPage} />}
    </div>
  );
}