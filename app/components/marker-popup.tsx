import { memo } from "react";
import { Popup } from 'react-map-gl';
import type { Church } from "./mapbox";

type Props = Church & {
  onClose: () => void
}

const MarkupPopup: React.FC<Props> = ({ 
  name, 
  website, 
  address_line1, 
  address_line2, 
  city, 
  state, 
  zip, 
  phone, 
  longitude, 
  latitude,
  onClose
}) => {
  return (
    <Popup
      anchor="top"
      longitude={Number(longitude)}
      latitude={Number(latitude)}
      onClose={onClose}
      className='max-w-sm rounded overflow-hidden shadow-lg'
    >
      <div className="grid gap-2 m-2">
        <div className="font-bold text-[14px] mb-2 pb-2 border-b border-violet-700">{name}</div>
        <a
          className="w-fit bg-transparent hover:bg-violet-900 text-slate-900 font-semibold hover:text-white py-1 px-3 border border-slate-500 hover:border-transparent rounded"
          target="_new"
          href={website}
        >
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#b0b0b0"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/></svg>
            Website
          </div>
        </a>
      
        <p className="text-gray-700 text-sm mt-4 mb-1">{phone}</p>
        <div>
          <p className="text-gray-700 text-sm">{address_line1}</p>
          {address_line2 && <p className="text-gray-700 text-sm">{address_line2}</p>}
          <p className="text-gray-700 text-sm">{city}, {state}, {zip}</p>
        </div>
      </div>
    </Popup>
  );
}

export default memo(MarkupPopup);