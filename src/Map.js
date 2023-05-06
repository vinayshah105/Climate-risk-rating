import React, { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { green, yellow, orange, red } from '@mui/material/colors';

const Map = () => {
  const [latitude, setLatitude] = useState(43.65107);
  const [longitude, setLongitude] = useState(-79.347015);
  const [data, setData] = useState([]);

  useEffect(() => {
    const doc = new GoogleSpreadsheet(
      '18vk3k1eaR98d9pWUl8QkGTlovoV7Y93sF0qj-LcbZCw'
    );

    const getDataFromSheet = async () => {
      try {
        await doc.useServiceAccountAuth(
          '4fc3dba187ea3e57e85ccbd954684ede549dbf86'
        );
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const formattedData = rows.map((row) => ({
          latitude: parseFloat(row.Lat),
          longitude: parseFloat(row.Long),
          riskLevel: parseInt(row.RiskLevel),
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error retrieving data from Google Sheets:', error);
      }
    };

    getDataFromSheet();
  }, []);

  const renderMarkers = () => {
    return data.map((location, index) => {
      let markerColor = green[500];
      if (location.riskLevel === 2) markerColor = yellow[500];
      else if (location.riskLevel === 3) markerColor = orange[500];
      else if (location.riskLevel === 4) markerColor = red[500];

      return (
        <LocationOnIcon
          key={index}
          style={{ color: markerColor }}
          lat={location.latitude}
          lng={location.longitude}
        />
      );
    });
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA6kU3sADO3doBDW_Fy9JMnVtPFxrn4hIo' }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={14}
      >
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

/* import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Slider } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GoogleMapReact from 'google-map-react';
import useGoogleSheets from 'use-google-sheets';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 43.65107,
      longitude: -79.347015,
      data: [],
    };
  }

  REACT_APP_GOOGLE_SHEETS_ID = '18vk3k1eaR98d9pWUl8QkGTlovoV7Y93sF0qj-LcbZCw';
  REACT_APP_GOOGLE_API_KEY = 'AIzaSyA6kU3sADO3doBDW_Fy9JMnVtPFxrn4hIo';

  GetData = () => {
    const { data, loading, error } = useGoogleSheets({
      apiKey: this.REACT_APP_GOOGLE_API_KEY,
      sheetId: this.REACT_APP_GOOGLE_SHEETS_ID,
    });
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error!</div>;
    }
    let a = data[0];
    return a.data;
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          data: [],
        });
      },
      (error) => {
        console.log('Error Getting Location: ' + error.message);
      }
    );
  };

  header = () => {
    return (
      <div>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          CLIMATE RISK DATASET
        </Typography>
        <TextField
          label="Enter Decade Year to Get Climate Risk Dataset ... "
          variant="outlined"
          style={{ width: '100%' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Distance:</Typography>
          <Slider style={{ width: '75%' }} />
        </div>
        <Button variant="outlined" style={{ width: '50%' }}>
          <RestartAltIcon /> Reset
        </Button>

        <Button variant="contained" style={{ width: '50%' }}>
          <SearchIcon /> Search
        </Button>
      </div>
    );
  };

  map = () => {
    const { latitude, longitude, data } = this.state;
    return (
      <div style={{ height: '80vh', width: '100%', backgroundColor: 'cyan' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDqKhLiTRdQpgAML7fSIyHYoK1SqeiF4tw' }}
          defaultCenter={{
            lat: 43.65107,
            lng: -79.347015,
          }}
          defaultZoom={14}
          center={{ lat: latitude, lng: longitude }}
        >
          <LocationOnIcon
            color={'dark'}
            lat={this.state.lat}
            lng={this.state.lng}
          />
          {data.map((x) => {
            return (
              <LocationOnIcon
                key={x.id}
                color={'dark'}
                lat={x.Lat}
                lng={x.Long}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  };

  render() {
    return (
      <div style={{ backgroundColor: 'floralWhite' }}>
        {this.header()}
        {this.map()}
      </div>
    );
  }
} */
