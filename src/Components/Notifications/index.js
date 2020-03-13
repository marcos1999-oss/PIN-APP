import React from 'react';
import firebase from 'react-native-firebase';

const createNotificationListeners = async (props) => {
  firebase.notifications().onNotification((notification) => {
    console.log('notification------->', notification)
    const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
    })
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification._subtitle)
      .setBody(notification._body)
      .setData(notification._data)
      .android.setChannelId('sd.update.id')
      .android.setSmallIcon('@mipmap/ic_notification')
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase.notifications()
      .displayNotification(localNotification)
      .catch(err => console.error(err));
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  firebase.notifications().onNotificationOpened((notificationOpen) => {
    const { title, _body, _data } = notificationOpen.notification;
    const customData = JSON.parse(`${_data.custom_data}`);

    if (customData.achievable_type === "Post" && customData.achievable_id !== null) {
      props.navigation.navigate('BusinessActivity', { openPost: customData.achievable_id });
    }
    if (customData.achievable_type === "Pin" && customData.achievable_id !== null) {
      props.navigation.navigate("PurchasePins", { from: 'BusinessHome' });
    }
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();

  if (notificationOpen) {
    const { title, _body, _data } = notificationOpen.notification;
    const customData = JSON.parse(`${_data.custom_data}`);

    if (customData.achievable_type === "Post" && customData.achievable_id !== null) {
      props.navigation.navigate('BusinessActivity', { openPost: customData.achievable_id });
    }
    if (customData.achievable_type === "Pin" && customData.achievable_id !== null) {
      props.navigation.navigate("PurchasePins", { from: 'BusinessHome' });
    }
  }
  /*
  * Triggered for data only payload in foreground
  * */
  firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

export default createNotificationListeners;
