import React, { useState } from 'react';

// --- ICONS ---
// Simple SVG icons for the activity tiles.
const LandscapeChangeIcon = () => (
  <svg className="w-16 h-16 mb-4 text-green-600" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Pattern: Thin, dense horizontal lines */}
      <pattern id="pattern-horizontal-dense" width="4" height="2" patternUnits="userSpaceOnUse">
        <line x1="0" y1="1" x2="4" y2="1" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    
    {/* Left half, filled with the pattern */}
    <path
      d="M12 2 A10 10 0 0 0 12 22 L12 2 Z"
      fill="url(#pattern-horizontal-dense)"
      stroke="none"
    />
    
    {/* Right half, left empty */}
    <path
      d="M12 2 A10 10 0 0 1 12 22 L12 2 Z"
      fill="none"
      stroke="none"
    />
    
    {/* Full circle outline on top */}
    <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const FloodsIcon = () => (
    <svg className="w-16 h-16 mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* House outline */}
        <path
            d="M4 10 L12 3 L20 10 V21 H4 Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Four dense, straight horizontal lines inside the house */}
        <path strokeWidth="0.5" strokeLinecap="round" d="M5 14 H 19" />
        <path strokeWidth="0.5" strokeLinecap="round" d="M5 16 H 19" />
        <path strokeWidth="0.5" strokeLinecap="round" d="M5 18 H 19" />
        <path strokeWidth="0.5" strokeLinecap="round" d="M5 20 H 19" />
    </svg>
);


const WildfiresIcon = () => (
  <svg className="w-16 h-16 mb-4 text-red-600" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Pattern: Vertical lines with spacing matched to Landscape Change icon */}
      <pattern id="pattern-vertical-wildfire-fixed" width="2" height="4" patternUnits="userSpaceOnUse">
        <line x1="1" y1="0" x2="1" y2="4" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
      {/* Clip path to only show the left half, extended by one line */}
      <clipPath id="clip-left-half">
        <rect x="0" y="0" width="14" height="24" />
      </clipPath>
    </defs>

    {/* The full fire shape, but with the pattern only applied to the left half via clip-path */}
    <path
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14.5 5 16.5 8 16.5 10c0-1.995.189-4.418 2.48-6.082A8.001 8.001 0 0117.657 18.657z"
      fill="url(#pattern-vertical-wildfire-fixed)"
      clipPath="url(#clip-left-half)"
      stroke="none"
    />

    {/* The fire outline on top, with no fill, covering the whole shape */}
    <path
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14.5 5 16.5 8 16.5 10c0-1.995.189-4.418 2.48-6.082A8.001 8.001 0 0117.657 18.657z"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


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

// --- HOME PAGE COMPONENT ---
const HomePage = ({ setPage }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          SLIM Project Online Maps
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          The SLIM (Sustainable Landscape through Integrated Management) project aims to build institutional capacity in Zambia for effective landscape management and natural disaster preparedness through the use of geospatial data.
        </p>
        <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-600">
          Explore maps in three thematic areas: Landscape Change, Floods, and Wildfires
        </p>
      </div>

      {/* Activity Tiles */}
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {/* Landscape Change Tile */}
        <div 
          className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          onClick={() => setPage('landscapechange')}
        >
          <LandscapeChangeIcon />
          <h3 className="text-2xl font-bold text-gray-900">Landscape Change</h3>
          <p className="mt-2 text-gray-600">Explore land cover and land cover flows in detail</p>
        </div>

        {/* Floods Tile */}
        <div 
          className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          onClick={() => setPage('floods')}
        >
          <FloodsIcon />
          <h3 className="text-2xl font-bold text-gray-900">Floods</h3>
          <p className="mt-2 text-gray-600">View maps of flood-prone areas and historical inundation events.</p>
        </div>

        {/* Wildfires Tile */}
        <div 
          className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          onClick={() => setPage('wildfires')}
        >
          <WildfiresIcon />
          <h3 className="text-2xl font-bold text-gray-900">Wildfires</h3>
          <p className="mt-2 text-gray-600">Explore wildfire risk, historical burn scars and active fire data</p>
        </div>
      </div>
    </div>
  );
};

// --- ACTIVITY PAGE COMPONENT (REVISED) ---
// This component now features a full-screen map with a collapsible info panel.
const ActivityPage = ({ title, intro, mapUrl, dataDescription, dataInterpretation }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Chevron Icon for the collapse/expand button
  const ChevronIcon = ({ isOpen }) => (
    <svg className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
  );

  return (
    // This container will fill the <main> tag. It's the positioning context for the map and panel.
    <div className="relative w-full h-full">
      {/* Embedded Map - positioned to fill this container */}
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0"
        src={mapUrl}
        title={`${title} Map`}
        allowFullScreen
      ></iframe>

      {/* Collapsible Info Panel */}
      <div
        className={`absolute top-4 left-4 z-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl transition-all duration-300 ease-in-out max-w-md w-11/12`}
      >
        {/* Panel Header - Click to toggle */}
        <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsPanelOpen(!isPanelOpen)}>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-expanded={isPanelOpen}
                aria-controls="info-panel-content"
                aria-label="Toggle information panel"
            >
                <ChevronIcon isOpen={isPanelOpen} />
            </button>
        </div>
        
        {/* Panel Content - Expands and collapses */}
        <div
          id="info-panel-content"
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isPanelOpen ? 'max-h-[calc(100vh-10rem)]' : 'max-h-0'}`}
        >
            <div className="px-4 pb-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 12rem)'}}>
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
                    {/* NOTE: Filename updated */}
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
      intro: "This map captures the status of Zambia’s landscape and historical changes to it since 2000. Building on previous landscape monitoring, it serves as a multi-purpose product to support environmental protection, good governance, climate change adaptation, and risk reduction.",
      mapUrl: "https://gisat.github.io/slim-112-landcover-map/#6/-13.499/28.478",
      dataDescription: (
        <>
          <p>
            The data presented here is derived from high resolution satellite imagery and processed using advanced machine learning algorithms. It delivers a detailed portrait of the landscape and its changes, capturing natural features, vegetation, and patterns of human activity with precision.
          </p>
          <p className="mt-4">
            Land cover types were selected and validated with the active participation of Zambian public sector stakeholders to reflect their specific needs and use cases.
          </p>
          <p className="mt-4">
            <strong>Primary data:</strong> Monthly Landsat and Sentinel-2 composites from 2000–2024.
          </p>
          <p className="mt-2">
            <strong>Ancillary data:</strong> Digital Elevation Model (DEM-SRTM).
          </p>
          <p className="mt-2">
            <strong>Training data:</strong> Existing Land Cover maps (SLIM Baseline 2023, WorldCover2020, WorldCover2021) and ancillary datasets including GlobalForestWatch, OpenStreetMap, WorldCereal, ZambiaWSF, GHSL, WorldWater, Hydro Zambia, and Global Wetlands.
          </p>
           <p className="mt-4">The data was interpreted using a proprietary, state-of-the-art Machine Learning classification processing chain.</p>
        </>
      ),
      dataInterpretation: (
         <p>The concept of LC flows represents changes identified by initial and current LC classes. Grouped change combinations represent defined flows, differentiating key and secondary flows, and excluding unlikely types.</p>
      )
    },
    floods: {
      title: "Floods",
      intro: "Flood mapping aims to improve preparedness and response by identifying communities and infrastructure at risk, supporting mitigation efforts and emergency planning. These risk assessments are primarily based on topographical models, such as the HAND model, and include historical flood data.",
      mapUrl: "https://gisat.github.io/slim-121-floods-map/",
      dataDescription: (
        <>
            <p className="mt-2">The HAND (Height Above Nearest Drainage) model is based on the following data sources:</p>
            <p className="mt-2"><strong>DEM (Digital Elevation Model):</strong> SRTM (Shuttle Radar Topography Mission) data, approximately 30m resolution, was used.</p>
            <p className="mt-2"><strong>Rivers:</strong> HydroATLAS Zambia data was used for river networks.</p>
            
            <p className="mt-4">Other relevant inputs for flood analysis include:</p>
            <p className="mt-2"><strong>GLOFAS (Global Flood Awareness System):</strong> Long time series data (1980-2018, daily values) for approximating discharges in coarse resolution.</p>
            <p className="mt-2"><strong>JRC Flood Map (Joint Research Centre):</strong> A map for a 100-year return period, valuable for estimating and validating expected flood extent.</p>
            <p className="mt-2"><strong>ESA WorldCover 2021:</strong> Used for hydrological characteristics of watersheds based on land cover.</p>
        </>
      ),
      dataInterpretation: (
         <>
         <p>Obstacles to using the data include:</p>
         <p className="mt-2"><strong>River geometry limitation:</strong> Precise definition of channel geometries (longitudinal river profile vs. cross-section) is a challenge and is derived from DEM only.</p>
         <p className="mt-2"><strong>Calibration & validation:</strong> A lack of observed flood extent data in Zambia makes robust model verification difficult.</p>
         <p className="mt-2"><strong>Data quality vs. availability:</strong> There's a trade-off between the coarse resolution of GLOFAS data and the availability of precise in-situ measurements.</p>
         <p className="mt-2"><strong>HAND limitations:</strong> HAND is a conceptual model, not a full hydrodynamic model, and does not consider factors like geological characteristics.</p>
        </>
      )
    },
    wildfires: {
      title: "Wildfires",
      intro: "This map service provides up-to-date information on wildfire activity, including current fire perimeters, burn scar analysis, and assessments of a fire risk based on vegetation and weather conditions.",
      mapUrl: "https://gisat.github.io/slim-131-wildfires-map/",
      dataDescription: (
        <p>The wildfire data integrates multiple sources, including satellite thermal hotspot detections and weather forecasts. The risk assessment model considers factors like vegetation type, fuel load, slope, and current drought conditions. This tool is intended for use by fire management agencies and the public to promote awareness and safety.</p>
      ),
      dataInterpretation: (
        <p>Interpret the wildfire risk map as a guide for strategic planning. Areas marked as high-risk may warrant proactive measures like creating firebreaks or conducting controlled burns. The historical burn scar data can help in understanding fire frequency and ecosystem response.</p>
      )
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
