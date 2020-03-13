import { all } from 'redux-saga/effects'

import {
  watchFetchMe,
  watchSignIn,
  watchSignUp,
  watchSignOut,
  watchDeleteAccount,
  watchUpdateAccount,
  watchResetPassword,
  watchResetPasswordVerify,
  watchResetPasswordSave,
  watchSetCompanyFeatures,
} from './authSagas'
import {
  watchFetchFeatures,
} from './featureSagas'
import {
  watchFetchFirmReports,
  watchFetchCurrentFirmReport,
} from './firmReportSagas'
import {
  watchFetchHolidays,
} from './holidaySagas'
import {
  watchFetchPayments,
  watchSendPayments,
  watchFetchCardDetails,
  watchSendStripeToken,
} from './paymentSagas'
import {
  watchFetchMyPins,
  watchViewPin,
  watchDeletePin,
  watchActivatePin,
  watchBuyPin,
  watchFetchNearestPins,
  watchVisitPin,
} from './pinSagas'
import {
  watchFetchPinCatalogs,
  watchViewPinCatalog,
} from './pinCatalogSagas'
import {
  watchFetchPosts,
  watchFetchMyPosts,
  watchSearchPosts,
  watchCreatePost,
  watchEditPost,
  watchViewPost,
  watchPreviewPost,
  watchSwipePost,
  watchLikePost,
  watchDislikePost,
  watchUnfavoritePost,
  watchDeletePost,
  watchFetchLikedPosts,
} from './postSagas'
import {
  watchCreateReport,
} from './reportSagas'
import {
  watchCreateSupportTicket,
} from './supportTicketSagas'
import {
  watchFetchUserTermsLegal,
  watchFetchBusinessPrivacyLegal,
  watchFetchBusinessTermsLegal,
  watchFetchUserPrivacyLegal,
} from './legalSaga'


export default function* rootSaga() {
  yield all([
    watchFetchMe(),
    watchSignIn(),
    watchSignUp(),
    watchSignOut(),
    watchDeleteAccount(),
    watchUpdateAccount(),
    watchResetPassword(),
    watchResetPasswordVerify(),
    watchResetPasswordSave(),
    watchSetCompanyFeatures(),

    watchFetchFeatures(),

    watchFetchFirmReports(),
    watchFetchCurrentFirmReport(),

    watchFetchHolidays(),

    watchFetchPayments(),
    watchSendPayments(),
    watchFetchCardDetails(),
    watchSendStripeToken(),
    watchFetchMyPins(),
    watchViewPin(),
    watchDeletePin(),
    watchActivatePin(),
    watchBuyPin(),
    watchFetchNearestPins(),
    watchVisitPin(),

    watchFetchPinCatalogs(),
    watchViewPinCatalog(),

    watchFetchPosts(),
    watchFetchMyPosts(),
    watchSearchPosts(),
    watchCreatePost(),
    watchEditPost(),
    watchViewPost(),
    watchPreviewPost(),
    watchSwipePost(),
    watchLikePost(),
    watchDislikePost(),
    watchUnfavoritePost(),
    watchDeletePost(),
    watchFetchLikedPosts(),

    watchCreateReport(),

    watchCreateSupportTicket(),

    watchFetchUserTermsLegal(),
    watchFetchBusinessPrivacyLegal(),
    watchFetchBusinessTermsLegal(),
    watchFetchUserPrivacyLegal(),
  ])
}
