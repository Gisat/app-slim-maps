import React, { useState, useEffect } from 'react';
import { LandPlot, Waves, Flame } from 'lucide-react';

// --- HEADER COMPONENT ---
// This is the navigation bar that appears on every page.
const Header = ({ currentPage, setPage }) => {
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
              <img className="h-10 w-auto text-xl font-bold text-gray-800" src="SLIM_logo.png" alt="SLIM" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x40/ccc/000?text=Logo'; }} />
              <span className="ml-3 text-xl font-bold text-gray-800">Maps</span>
            </button>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setPage(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === link.id
                      ? 'text-white bg-blue-600'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  } transition-colors duration-200`}
                >
                  {link.title}
                </button>
              ))}
            </div>
          </nav>
           {/* Mobile Menu as a select dropdown */}
           <div className="md:hidden">
              <select 
                aria-label="Navigation"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={currentPage}
                onChange={(e) => setPage(e.target.value)}
              >
                {navLinks.map(link => <option key={`mobile-${link.id}`} value={link.id}>{link.title}</option>)}
              </select>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- HOME PAGE COMPONENT (REVISED) ---
const HomePage = ({ setPage }) => {
  return (
    <div 
      className="bg-cover bg-center" 
      style={{ backgroundImage: "url('slim_portal_banner.png')" }}
    >
      {/* Hero Section Content */}
      <div className="pt-20 pb-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}
          >
            SLIM Project Online Maps
          </h2>
          <p 
            className="mt-6 max-w-3xl mx-auto text-xl text-gray-200"
            style={{textShadow: '1px 1px 3px rgba(0,0,0,0.9)'}}
          >
            The SLIM (Sustainable Landscape through Integrated Management) project aims to build institutional capacity in Zambia for effective landscape management and natural disaster preparedness through the use of geospatial data.
          </p>
          <p 
            className="mt-4 max-w-3xl mx-auto text-lg text-gray-300"
            style={{textShadow: '1px 1px 3px rgba(0,0,0,0.9)'}}
            >
            Explore maps in three thematic areas: Landscape Change, Floods, and Wildfires
          </p>
        </div>
      </div>

      {/* Activity Tiles Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Landscape Change Tile */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => setPage('landscapechange')}
          >
            <LandPlot className="w-16 h-16 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Landscape Change</h3>
            <p className="mt-2 text-gray-600">Explore land cover and land cover flows in detail</p>
          </div>

          {/* Floods Tile */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => setPage('floods')}
          >
            <Waves className="w-16 h-16 mb-4 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Floods</h3>
            <p className="mt-2 text-gray-600">View maps of flood-prone areas and historical inundation events.</p>
          </div>

          {/* Wildfires Tile */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => setPage('wildfires')}
          >
            <Flame className="w-16 h-16 mb-4 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-900">Wildfires</h3>
            <p className="mt-2 text-gray-600">Explore wildfire risk, historical burn scars and active fire data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ACTIVITY PAGE COMPONENT (REVISED) ---
// This component now features a full-screen map with a collapsible info panel.
// It also handles tabbed content for the Wildfires page.
const ActivityPage = (props) => {
  const { title, icon: Icon, iconColor } = props;
  const isWildfirePage = title === "Wildfires";
  
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(isWildfirePage ? props.tabs[0].id : null);

  // This effect synchronizes the activeTab state when navigating between pages.
  useEffect(() => {
    if (isWildfirePage) {
      setActiveTab(props.tabs[0].id);
    } else {
      setActiveTab(null);
    }
  }, [isWildfirePage, props.tabs]);


  let currentContent;
  if (isWildfirePage) {
    // Defensively select the active tab's content.
    const currentTabId = activeTab || (props.tabs && props.tabs[0].id);
    if (currentTabId) {
        currentContent = props.maps[currentTabId];
    }
  } else {
    currentContent = props;
  }
  
  // Prevent rendering if content is not yet available, avoiding the crash.
  if (!currentContent) {
    return null; 
  }

  const { intro, mapUrl, dataDescription, dataInterpretation } = currentContent;

  // Chevron Icon for the collapse/expand button
  const ChevronIcon = ({ isOpen }) => (
    <svg className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
  );

  return (
    <div className="relative w-full h-full">
      <iframe
        key={mapUrl} // Use key to force iframe to re-render on URL change
        className="absolute top-0 left-0 w-full h-full border-0"
        src={mapUrl}
        title={`${title} Map`}
        allowFullScreen
      ></iframe>

      <div className={`absolute top-4 left-4 z-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl transition-all duration-300 ease-in-out max-w-md w-5/6 sm:w-11/12`}>
        <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsPanelOpen(!isPanelOpen)}>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              {Icon && <Icon className={`w-6 h-6 mr-3 ${iconColor}`} />}
              {title}
            </h2>
            <button
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-expanded={isPanelOpen}
                aria-controls="info-panel-content"
                aria-label="Toggle information panel"
            >
                <ChevronIcon isOpen={isPanelOpen} />
            </button>
        </div>
        
        <div id="info-panel-content" className={`transition-all duration-300 ease-in-out overflow-hidden ${isPanelOpen ? 'max-h-[calc(100vh-10rem)]' : 'max-h-0'}`}>
            <div className="px-4 pb-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 12rem)'}}>
                {/* Tab UI for Wildfire Page */}
                {isWildfirePage && (
                    <div className="border-b border-gray-300 mb-4">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                            {props.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                        activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
                
                <p className="text-gray-700">{intro}</p>
                <hr className="my-4 border-gray-300" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Data Description</h3>
                    <div className="mt-2 prose text-gray-600 max-w-none">{dataDescription}</div>
                </div>
                <hr className="my-4 border-gray-300" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Data Interpretation</h3>
                    <div className="mt-2 prose text-gray-600 max-w-none">{dataInterpretation}</div>
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
        <footer className="bg-gray-800 text-gray-400 text-sm">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                {currentPage === 'home' && (
                  <div className="mb-4">
                    <p className="mb-2">Funded by:</p>
                    <img className="h-10 inline-block" src="CzechAid_basic_frame_sanitized.png" alt="Czech Aid Logo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x40/ccc/000?text=Logo'; }}/>
                  </div>
                )}
                <p>
                    &copy; 2025 SLIM Project. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}


// --- MAIN APP ---
// This component controls which page is currently displayed.
export default function App() {
  const [currentPage, setPage] = useState('home');

  const pageData = {
    landscapechange: {
      title: "Landscape Change",
      icon: LandPlot,
      iconColor: "text-green-600",
      intro: "This map captures the status of Zambia’s landscape and historical changes to it since 2000. Building on previous landscape monitoring, it serves as a multi-purpose product to support environmental protection, good governance, climate change adaptation, and risk reduction.",
      mapUrl: "https://gisat.github.io/slim-112-lulc-map/#11/-15.4607/27.9242",
      dataDescription: (
        <>
          <p>The data presented here is derived from high resolution satellite imagery and processed using advanced machine learning algorithms. It delivers a detailed portrait of the landscape and its changes, capturing natural features, vegetation, and patterns of human activity with precision.</p>
          <p className="mt-4">Land cover types were selected and validated with the active participation of Zambian public sector stakeholders to reflect their specific needs and use cases.</p>
          <p className="mt-4"><strong>Primary data:</strong> Monthly Landsat and Sentinel-2 composites from 2000–2024.</p>
          <p className="mt-2"><strong>Ancillary data:</strong> Digital Elevation Model (DEM-SRTM), EO data derivatives like VIs</p>
          <p className="mt-2"><strong>Training data:</strong> Existing Land Cover maps (SLIM Baseline 2023, WorldCover2020, WorldCover2021) and ancillary datasets including GlobalForestWatch, OpenStreetMap, WorldCereal, ZambiaWSF, GHSL, WorldWater, Hydro Zambia, and Global Wetlands.</p>
          <p className="mt-4">The data was interpreted using a proprietary, state-of-the-art Machine Learning classification processing chain.</p>
        </>
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
        <>
          <p>The HAND (Height Above Nearest Drainage) model is based on the following data sources:</p>
          <p className="mt-2"><strong>DEM (Digital Elevation Model):</strong> SRTM (Shuttle Radar Topography Mission) data, approximately 30m resolution, was used.</p>
          <p className="mt-2"><strong>Rivers:</strong> HydroATLAS Zambia data was used for river networks.</p>
          <p className="mt-4">Flood analysis was prepared using the following inputs:</p>
          <p className="mt-2"><strong>GLOFAS (Global Flood Awareness System):</strong> Long time series data (1980-2018, daily values) for approximating discharges in coarse resolution.</p>
          <p className="mt-2"><strong>JRC Flood Map (Joint Research Centre):</strong> A map for a 100-year return period, valuable for estimating and validating expected flood extent.</p>
          <p className="mt-2"><strong>ESA WorldCover 2021:</strong> Used for hydrological characteristics of watersheds based on land cover.</p>
        </>
      ),
      dataInterpretation: (
         <>
          <p>Obstacles to using this data include:</p>
          <p className="mt-2"><strong>River geometry limitation:</strong> Precise definition of channel geometries (longitudinal river profile vs. cross-section) is a challenge and is derived from DEM only</p>
          <p className="mt-2"><strong>Calibration & validation:</strong> A lack of observed flood extent data in Zambia makes robust model verification difficult.</p>
          <p className="mt-2"><strong>Data quality vs. availability:</strong> There's a trade-off between the coarse resolution of GLOFAS data and the availability of precise in-situ measurements.</p>
          <p className="mt-2"><strong>HAND limitations:</strong> HAND is a conceptual model, not a full hydrodynamic model, and does not consider factors like geological characteristics.</p>
         </>
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
              mapUrl: "https://gisat.github.io/slim-122-wildfires-map/zambia_fire_map_corrected.html",
              intro: "The Wildfire Risk Assessment map service provides up-to-date information on wildfire risk based on vegetation and weather conditions.",
              dataDescription: <p>The risk assessment model considers factors like vegetation type, fuel load, slope, and current drought conditions. This tool is intended for use by fire management agencies and the public to promote awareness and safety.</p>,
              dataInterpretation: <p>Interpret the wildfire risk map as a guide for strategic planning. Areas marked as high-risk may warrant proactive measures like creating firebreaks or conducting controlled burns.</p>
          },
          detected: {
              mapUrl: "https://gisat.github.io/slim-122-wildfires-map/zambia_fire_S3_map_full.html",
              intro: "This map analyzes fire assessment and hazard estimation within the Green Nexus area of Zambia using data from global fire monitoring services. It visualizes the spatial patterns and intensity of fires in 2024, contrasted with near real-time fire hotspots and the Fire Weather Index (FWI). A time-series chart compares daily fire event frequency between 2024 and 2023.",
              dataDescription: (
                <>
                  <p>The data is sourced from and compared across three global fire services:</p>
                  <p className="mt-2"><strong>FIRMS (Fire Information for Resource Management System):</strong> Provides near real-time active fire data from MODIS and VIIRS satellite instruments for immediate awareness.</p>
                  <p className="mt-2"><strong>GWIS (Global Wildfire Information System):</strong> Offers a comprehensive view of fire regimes, including fire danger forecasts and historical analysis.</p>
                  <p className="mt-2"><strong>S3 World Fire Atlas:</strong> An ESA project providing long-term global dataset of nighttime fire detections from Sentinel-3A for analyzing trends.</p>
                </>
              ),
              dataInterpretation: <p>Use this map for situational awareness of ongoing fire events. Note that cloud cover can obscure satellite detections.</p>
          },
          annual: {
              mapUrl: "https://gisat.github.io/slim-122-wildfires-map/zambia_fire_S3_chart_with_legend_and_trendlines.html",
              intro: "This map provides an overview of total burned areas for a selected year.",
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
    <div className="bg-gray-100 h-screen flex flex-col font-sans">
      <Header currentPage={currentPage} setPage={setPage} />
      <main className="flex-grow relative">
        {renderPage()}
      </main>
      {/* Footer is now only displayed on the home page */}
      {currentPage === 'home' && <Footer currentPage={currentPage} />}
    </div>
  );
}

