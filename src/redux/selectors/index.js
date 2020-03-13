import { createSelector } from 'reselect'
import { map, get, filter, isNull, isEmpty, pick, reject, cloneDeep, concat } from 'lodash'
import Immutable from 'seamless-immutable'


const parsePostsData = (posts, offers, firms, features, schedules) => {
  return map(posts, (postData, id) => {
    return parsePostData(postData, id, offers, firms, features, schedules);
  });
};

const parsePostData = (postData, id, offers, firms, features, schedules) => {
  let data = Immutable.asMutable(postData.attributes, { deep: true });

  data['offers'] = get(postData, ['relationships', 'offers', 'data'], []).map((offer) => {
    let offerData = Immutable.asMutable(get(offers, [offer.id, 'attributes'], {}), { deep: true });
    offerData['id'] = offer.id;

    return offerData;
  });

  const firmId = get(postData, 'relationships.firm.data.id');
  let firmData = Immutable.asMutable(get(firms, [firmId, 'attributes'], {}), { deep: true });

  if (!isEmpty(firmData)) {
    firmData['features'] = get(firms, [firmId, 'relationships', 'features', 'data'], []).map((feature) => {
      let featureData = Immutable.asMutable(get(features, [feature.id, 'attributes'], {}), { deep: true });
      featureData['id'] = feature.id;

      return featureData;
    });

    firmData['schedules'] = get(firms, [firmId, 'relationships', 'schedules', 'data'], []).map((schedule) => {
      let schedulesData = Immutable.asMutable(get(schedules, [schedule.id, 'attributes'], {}), { deep: true });
      schedulesData['id'] = schedule.id;

      return schedulesData;
    });

    firmData['id'] = firmId;
  }

  data['firm'] = firmData;
  data['id'] = postData.id;
  return data;
};

const parsePinsData = (pins, firms, features, schedules) => {
  return map(pins, (pinData, id) => {
    let data = Immutable.asMutable(pinData.attributes, { deep: true });

    const firmId = get(pinData, 'relationships.firm.data.id');
    let firmData = Immutable.asMutable(get(firms, [firmId, 'attributes'], {}), { deep: true });

    if (!isEmpty(firmData)) {
      firmData['features'] = get(firms, [firmId, 'relationships', 'features', 'data'], []).map((feature) => {
        let featureData = Immutable.asMutable(get(features, [feature.id, 'attributes'], {}), { deep: true });
        featureData['id'] = feature.id;

        return featureData;
      });

      firmData['schedules'] = get(firms, [firmId, 'relationships', 'schedules', 'data'], []).map((schedule) => {
        let schedulesData = Immutable.asMutable(get(schedules, [schedule.id, 'attributes'], {}), { deep: true });
        schedulesData['id'] = schedule.id;

        return schedulesData;
      });

      firmData['id'] = firmId;
    }

    data['firm'] = firmData;
    data['id'] = id;

    return data;
  });
};

export const getPinCatalogPagination = (state) => state.pinCatalogs.pagination;

const parsePinCatalogsData = (pinCatalogs) => {
  return map(pinCatalogs, (pinCatalogData, id) => {
    let data = Immutable.asMutable(pinCatalogData.attributes, { deep: true });

    data['id'] = id;
    data['type'] = "pinCatalog";
    return data;
  });
};

const parseHolidaysData = (holidays) => {
  return map(holidays, (holidayData, id) => {
    let data = Immutable.asMutable(holidayData.attributes, { deep: true });

    data['id'] = id;

    return data;
  });
};

const parseFeaturesData = (features) => {
  return map(features, (featureData, id) => {
    let data = Immutable.asMutable(featureData.attributes, { deep: true });

    data['id'] = id;

    return data;
  });
};

const parseFirmReportsData = (firmReports, firms) => {
  return map(firmReports, (firmReportData, id) => {
    return parseFirmReportData(firmReportData, id, firms);
  });
};

const parseFirmReportData = (firmReportData, id, firms) => {
  let data = Immutable.asMutable(firmReportData.attributes, { deep: true });

  const firmId = get(firmReportData, 'relationships.firm.data.id');
  let firmData = Immutable.asMutable(get(firms, [firmId, 'attributes'], {}), { deep: true });

  if (!isEmpty(firmData)) {
    firmData['id'] = firmId;
  }

  data['firm'] = firmData;
  data['id'] = id;

  return data;
};


export const allFeatures = (state) => state.features.data;
export const allFirms = (state) => state.firms.data;
export const allHolidays = (state) => state.holidays.data;
export const allLegal = (state) => state.legal.data;
export const allOffers = (state) => state.offers.data;
export const allPinCatalogs = (state) => state.pinCatalogs.data;
export const allMyPins = (state) => state.pins.mine;
export const allNearestPins = (state) => state.pins.near;
export const allPosts = (state) => state.posts.data;
export const allMyPosts = (state) => state.posts.mine;
export const allSearchedPosts = (state) => state.posts.searched;
export const allLikedPosts = (state) => state.posts.liked;
export const allSchedules = (state) => state.schedules.data;
export const allFirmReports = (state) => state.firmReports.data;


// Auth
export const getMe = (state) => state.auth.me;
export const getHomeConnectedUsers = (state) => state.auth.home_connected_users;
export const getPinsConnectedUsers = (state) => state.auth.pins_connected_users;
export const getUserCoordinates = (state) => pick(state.auth, ['latitude', 'longitude']);
export const getIsProfileComplete = (state) => get(state.auth, 'me.profile_percentage', 0) >= 100;
export const getHasCardOnFile = (state) => get(state.auth, 'me.card_on_file', false);
export const getHasHomePin = (state) => !isNull(get(state.auth, 'me.home_pin', null));
export const getHomePin = (state) => get(state.auth, 'me.home_pin', {});


// Payment
export const getCardDetails = (state) => state.payments.card;


// Feature
export const getFeaturesMeta = (state) => state.features.meta;

export const getFeatures = createSelector(
  allFeatures,
  (features) => {
    return parseFeaturesData(features);
  }
);


// FirmReport
export const getFirmReportsMeta = (state) => state.firmReports.meta;

export const getFirmReports = createSelector(
  allFirmReports,
  allFirms,
  (firmReports, firms) => {
    return parseFirmReportsData(firmReports, firms);
  }
);

export const getCurrentFirmReport = createSelector(
  (state) => state.firmReports.current,
  allFirms,
  (firmReportData, firms) => {
    if (!isEmpty(firmReportData)) {
      return parseFirmReportData(firmReportData, firmReportData.id, firms);
    } else {
      return {};
    }
  }
);


// Holiday
export const getHolidaysMeta = (state) => state.holidays.meta;

export const getHolidays = createSelector(
  allHolidays,
  (holidays) => {
    return parseHolidaysData(holidays);
  }
);

// Pin
export const getViewingPin = (state) => state.pins.viewing;
export const getPinsMeta = (state) => state.pins.meta;

export const getMyPins = createSelector(
  allMyPins,
  allFirms,
  allFeatures,
  allSchedules,
  (pins, firms, features, schedules) => {
    return parsePinsData(pins, firms, features, schedules);
  }
);

export const getMyActivatedPins = createSelector(
  getMyPins,
  pins => filter(pins, (pin) => !isNull(pin.activatedOn))
);

export const getMyAvailablePins = createSelector(
  getMyPins,
  pins => filter(pins, (pin) => isNull(pin.activatedOn) && !pin.isHome)
);

export const getNearestPins = createSelector(
  allNearestPins,
  (pins) => {
    return parsePinsData(pins, [], [], []);
  }
);


// PinCatalog
export const getViewingPinCatalog = (state) => state.pinCatalogs.viewing;
export const getPinCatalogsMeta = (state) => state.pinCatalogs.meta;

export const getPinCatalogs = createSelector(
  allPinCatalogs,
  (pinCatalogs) => {
    return filter(parsePinCatalogsData(pinCatalogs), { private: false });
  }
);

export const getHomePinCatalog = createSelector(
  allPinCatalogs,
  (pinCatalogs) => {
    return filter(parsePinCatalogsData(pinCatalogs), { isHome: true })[0];
  }
);


// Post
export const getViewingPost = (state) => state.posts.viewing;
export const getEditingPost = (state) => {
  const post = state.posts.editing;

  let offers = reject(post.offers, { vip: true });
  let vipOffers = filter(post.offers, { vip: true });
  const offersLength = offers.length;
  const vipOffersLength = vipOffers.length;

  const offerTemplate = {
    title: '',
    price: '',
    percent: '',
    open: [
      { id: 'Sun', value: false },
      { id: 'Mon', value: false },
      { id: 'Tue', value: false },
      { id: 'Wed', value: false },
      { id: 'Thu', value: false },
      { id: 'Fri', value: false },
      { id: 'Sat', value: false },
    ],
    startTime: '',
    endTime: '',
    vip: false,
  };

  if (offersLength < 4) {
    for (let i = offersLength; i < 4; i++) {
      offers = [...offers, cloneDeep(offerTemplate)];
    }
  }

  if (vipOffersLength < 1) {
    for (let i = vipOffersLength; i < 1; i++) {
      vipOffers = [...vipOffers, cloneDeep({ ...offerTemplate, vip: true })];
    }
  }

  return Immutable({ ...post, offers: concat(offers, vipOffers) });
};
export const getPostsMeta = (state) => state.posts.meta;
export const getPostsPagination = (state) => state.posts.pagination;
export const getPostCoordinates = (state) => {
  return { latitude: state.posts.viewing.firm.lat, longitude: state.posts.viewing.firm.lng }
};

export const getPreviewPost = createSelector(
  (state) => state.posts.preview,
  allOffers,
  allFirms,
  allFeatures,
  allSchedules,
  (postData, offers, firms, features, schedules) => {
    if (!isEmpty(postData)) {
      return parsePostData(postData, postData.id, offers, firms, features, schedules);
    } else {
      return {};
    }
  }
);

export const getPosts = createSelector(
  allPosts,
  allOffers,
  allFirms,
  allFeatures,
  allSchedules,
  (posts, offers, firms, features, schedules) => {
    return parsePostsData(posts, offers, firms, features, schedules);
  }
);

export const getSearchedPosts = createSelector(
  allSearchedPosts,
  allOffers,
  allFirms,
  allFeatures,
  allSchedules,
  (posts, offers, firms, features, schedules) => {
    return parsePostsData(posts, offers, firms, features, schedules);
  }
);

export const getMyPosts = createSelector(
  allMyPosts,
  allOffers,
  allFirms,
  allFeatures,
  allSchedules,
  (posts, offers, firms, features, schedules) => {
    return parsePostsData(posts, offers, firms, features, schedules);
  }
);

export const getMyActivePosts = createSelector(
  getMyPosts,
  (posts) => filter(posts, { active: true }),
);

export const getMyDisabledPosts = createSelector(
  getMyPosts,
  (posts) => filter(posts, { active: false }),
);

export const getLikedPosts = createSelector(
  allLikedPosts,
  allOffers,
  allFirms,
  allFeatures,
  allSchedules,
  (posts, offers, firms, features, schedules) => {
    return parsePostsData(posts, offers, firms, features, schedules);
  }
);

export const getLikedPostsPagination = (state) => state.posts.pagination;

// Report
export const getReport = (state) => state.reports;
