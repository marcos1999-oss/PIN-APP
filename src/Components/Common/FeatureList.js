import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'native-base'
import { isUndefined, find } from 'lodash'

import {
  alcohol,
  baby,
  driveThrough,
  heart,
  music,
  parking,
  party,
  pet,
  reservation,
  wifi,
  valetParking,
} from '../../Assets'


const features = [
  { name: 'Alcohol', iconName: 'alcohol', icon: alcohol },
  { name: 'Baby Friendly', iconName: 'baby', icon: baby },
  { name: 'Drive Thru', iconName: 'driveThrough', icon: driveThrough },
  { name: 'Romantic', iconName: 'heart', icon: heart },
  { name: 'Music', iconName: 'music', icon: music },
  { name: 'Parking', iconName: 'parking', icon: parking },
  { name: 'Parties & Group', iconName: 'party', icon: party },
  { name: 'Pet Friendly', iconName: 'pet', icon: pet },
  { name: 'Reservations', iconName: 'reservation', icon: reservation },
  { name: 'Wifi', iconName: 'wifi', icon: wifi },
  { name: 'Valet Parking', iconName: 'valetParking', icon: valetParking },
];

const getFeature = (feature) => {
  return find(features, { iconName: feature.icon });
};

const renderFeatures = (features, style, imageStyle) => {
  return features.map((feature) => {
    const validFeature = getFeature(feature);

    if (isUndefined(validFeature)) {
      return (<View key={`renderFeatures-${feature.id}`}></View>);
    } else {
      return (
        <View key={ feature.id } style={ style }>
          <Image source={ validFeature.icon } style={ imageStyle } />
        </View>
      );
    }
  });
};

const renderDetailedFeatures = (features, containerStyle, imageContainerStyle, imageStyle, textContainerStyle, textStyle) => {
  return features.map((feature) => {
    const validFeature = getFeature(feature);

    if (isUndefined(validFeature)) {
      return (<View key={`renderDetailedFeatures-${feature.id}`}></View>);
    } else {
      return (
        <View style={ containerStyle } key={ feature.id }>
          <View style={ imageContainerStyle }>
            <Image source={ validFeature.icon } style={ imageStyle } />
          </View>

          <View style={ textContainerStyle }>
            <Text style={ textStyle }>{ feature.name }</Text>
          </View>
        </View>
      );
    }
  });
};

export const FeatureList = ({ features, containerStyle, style, imageStyle }) => (
  <View style={ containerStyle }>
    { renderFeatures(features, style, imageStyle) }
  </View>
);

export const DetailedFeatureList = ({ features, outerContainerStyle, containerStyle, imageContainerStyle, imageStyle, textContainerStyle, textStyle }) => (
  <View style={ outerContainerStyle }>
    { renderDetailedFeatures(features, containerStyle, imageContainerStyle, imageStyle, textContainerStyle, textStyle) }
  </View>
);
