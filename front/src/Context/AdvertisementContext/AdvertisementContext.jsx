import { createContext, useState } from 'react';

const AdvertisementContext = createContext();

export const AdvertisementProvider = ({ children }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [update, setUpdate] = useState(0);

  return (
    <AdvertisementContext.Provider value={{ advertisements, setAdvertisements, filteredAds, setFilteredAds, update, setUpdate }}>
      {children}
    </AdvertisementContext.Provider>
  );
};

AdvertisementContext.displayName = 'AdvertisementContext';

export default AdvertisementContext;