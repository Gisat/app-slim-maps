import React, { useState, useEffect } from 'react';
import { LandPlot, Waves, Flame, Menu, X } from 'lucide-react';

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
    { id: 'home', title: 'Home' },
    { id: 'landscapechange', title: 'Landscape Change' },
    { id: 'floods', title: 'Floods' },
    { id: 'wildfires', title: 'Wildfires' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* Logo and Title */}
            <button
              onClick={() => setPage('home')}
              className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
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
                      ? 'text-white bg-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } transition-colors duration-200`}
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
                    ? 'text-white bg-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
    <div className="flex flex-col min-h-full">
      <div 
        className="bg-cover bg-center flex-grow flex flex-col justify-center relative" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('slim_portal_banner.png')",
          minHeight: "60vh"
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

        {/* Hero Section Content */}
        <div className="pt-16 pb-16 text-center relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg"
            >
              SLIM Project Online Maps
            </h2>
            <p 
              className="mt-6 max-w-3xl mx-auto text-xl text-gray-100 drop-shadow-md leading-relaxed"
            >
              The SLIM (Sustainable Landscape through Integrated Management) project aims to build institutional capacity in Zambia for effective landscape management and natural disaster preparedness through the use of geospatial data.
            </p>
            <p 
              className="mt-8 max-w-3xl mx-auto text-lg text-blue-100 font-medium drop-shadow-md"
            >
              Explore maps in three thematic areas: Landscape Change, Floods, and Wildfires
            </p>
          </div>
        </div>
      </div>

      {/* Activity Tiles Section */}
      <div className="bg-gray-50 py-16 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Landscape Change Tile */}
            <div 
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              onClick={() => setPage('landscapechange')}
            >
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <LandPlot className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Landscape Change</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">Explore land cover and land cover flows in detail to understand environmental shifts.</p>
              <span className="mt-6 text-green-600 font-semibold hover:underline">View Map &rarr;</span>
            </div>

            {/* Floods Tile */}
            <div 
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              onClick={() => setPage('floods')}
            >
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <Waves className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Floods</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">View maps of flood-prone areas and historical inundation events for better preparedness.</p>
              <span className="mt-6 text-blue-600 font-semibold hover:underline">View Map &rarr;</span>
            </div>

            {/* Wildfires Tile */}
            <div 
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              onClick={() => setPage('wildfires')}
            >
              <div className="bg-red-100 p-4 rounded-full mb-6">
                <Flame className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Wildfires</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">Explore wildfire risk, historical burn scars and active fire data for effective response.</p>
              <span className="mt-6 text-red-600 font-semibold hover:underline">View Map &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ACTIVITY PAGE COMPONENT ---
const ActivityPage = (props) => {
  const { title, icon: Icon, iconColor } = props;
  const isWildfirePage = title === "Wildfires";
  
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(isWildfirePage && props.tabs ? props.tabs[0].id : null);

  // Synchronize activeTab state when props change
  useEffect(() => {
    if (isWildfirePage && props.tabs) {
      setActiveTab(props.tabs[0].id);
    } else {
      setActiveTab(null);
    }
  }, [isWildfirePage, props.tabs]); 

  let currentContent = props;
  if (isWildfirePage) {
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
        ${isPanelOpen ? 'max-h-[85vh] w-[90vw] sm:w-[28rem]' : 'max-h-[4.5rem] w-[14rem]'}`}
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
                {/* Tabs for Wildfire Page */}
                {isWildfirePage && props.tabs && (
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

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setPage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
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
            <li><strong>River geometry limitation:</strong> Precise definition of channel geometries (longitudinal river profile vs. cross-section) is a challenge and is derived from DEM only</li>
            <li><strong>Calibration & validation:</strong> A lack of observed flood extent data in Zambia makes robust model verification difficult.</li>
            <li><strong>Data quality vs. availability:</strong> There's a trade-off between the coarse resolution of GLOFAS data and the availability of precise in-situ measurements.</li>
            <li><strong>HAND limitations:</strong> HAND is a conceptual model, not a full hydrodynamic model, and does not consider factors like geological characteristics.</li>
          </ul>
         </div>
      )
    },
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
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landscapechange':
        return <ActivityPage {...pageData.landscapechange} />;
      case 'floods':
        return <ActivityPage {...pageData.floods} />;
      case 'wildfires':
        return <ActivityPage {...pageData.wildfires} />;
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