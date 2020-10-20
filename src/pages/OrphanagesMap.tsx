import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';
import Orphanage from './Orphanage';

// Cria-se esta interface para poder usar as propriedades do objeto retornado,
// implementado nos componentes ... 
// Mas para cria-la, necessita-se conhecer o backend ... 
//e no caso criamos a interface com apenas as propriedades que iremos usar ...
interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}


function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  console.log(orphanages);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);


  return (
    <div id="page-map">

      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Garça</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-22.2249554, -49.6605246]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {/* com o map() eu percorro uma lista e retorno algo; Com o forEach() só percorre a lista ... */}
        {orphanages.map(orphanage => {
          return (
            <Marker
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
            key={orphanage.id} 
            //devemos colocar um id na prop. key, ou alguma prop. do obj. que não é duplicado
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`orphanages/${orphanage.id}`}>
                <FiArrowRight size={32} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
          )
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF"></FiPlus>
      </Link>

    </div>
  )
}

export default OrphanagesMap;