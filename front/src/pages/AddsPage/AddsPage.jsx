import { useContext, useEffect } from 'react';
import './AddsPage.css';
import AdvertisementContext from '../../Context/AdvertisementContext/AdvertisementContext';
import { toast } from 'react-toastify';
import { getAdvertisements } from '../../services/get';

function AddsPage() {
    const { advertisements, setAdvertisements, filteredAds, setFilteredAds } = useContext(AdvertisementContext);

    useEffect(() => {
        const getData = async () => {
           try{
             const ads = await getAdvertisements();
             console.log(ads);
             setAdvertisements(ads);
           }catch(error){
             toast.error(error.message);
           }
        };
        getData();
    }, []);

    return (<><h1>Advertisements</h1>
    <div>
        {filteredAds.map((ad) => {
            return <div>{ad.title}: {ad.description} , {ad.price} EUR, {ad.city}</div>
        })}
    </div>
    </>);
}

export default AddsPage;