const { Client } = require("@googlemaps/google-maps-services-js");
const googleMapsClient = new Client();

const DirectionPointHelper = require('../helpers/coordinate_milestone.helper');
const PolylinesService = require('../services/polylines.service');
const googleMapApiKey = process.env.GOOGLE_MAP_API_KEY;

class GoogleMapApiRequestService {
    static getDirections = async (arrSelectives) => {
        const arrResponse = [];
        for (let element of arrSelectives) {
            try {
                const response = await directionsRequest(element.origin, element.destination);
                const data = response.data;
                if(data.status === 'OK'){
                    const legsPathInOrderSelective = DirectionPointHelper.legsPathInOrderSelective(data);
                    arrResponse.push(legsPathInOrderSelective);
                }else{
                    arrResponse.push(data.status);
                }
            } catch (error) {
                const response = error.response;
                if(response){
                    const status = response.data.status;
                    arrResponse.push(status);
                }else{
                    arrResponse.push(error.message);
                }
            }
        }

        const data = {
            polylines: arrResponse
        }

        const polylines = await PolylinesService.create(data);
        return polylines;
    }
}

directionsRequest = (start, end) => {
    const origin = {
        lat: start.lat || NaN,
        lng: start.lng || NaN
    }
    const destination = {
        lat: end.lat || NaN,
        lng: end.lng || NaN
    }
    const request= {
        params: {
            key: googleMapApiKey,
            origin, //Điểm Start
            destination, // Điểm Đích
            mode: 'driving', // Phương tiện giao thông,
        }
    }
    return googleMapsClient.directions(request)
}

module.exports = GoogleMapApiRequestService