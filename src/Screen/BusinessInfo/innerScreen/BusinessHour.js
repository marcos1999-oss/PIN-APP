import React from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { NavigationEvents } from 'react-navigation';
import { includes, get, map, without, concat, findIndex, slice, reduce, join } from 'lodash';
import DatePicker from 'react-native-datepicker';

import { Formik } from "formik";
import { TextInput, DateInput } from "../../../Components/Common";
import { FormContainer } from "../Common";

/*Style*/
import style from "../style.js";
import { verticalScale, scale } from "../../../Utils/scaling";

/*Time Input Style*/
const timeInputStyle = {
  placeholderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#959595",
    textAlign: "center",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#959595",
    textAlign: "center",
    width: "100%",
  },
  dateInput: {
    borderColor: "#A7A7A7",
    borderWidth: 0.2,
    alignItems: "flex-start",
    padding: 10,
    paddingLeft: 40,
  },
};

const WEEK_DAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const Checkbox = ({ isActive, label, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[style.checkbox, isActive && style.checkbox_active]}>
      <Text style={[style.checkbox_label, isActive && { color: "#fff" }]}>
        {label}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

class BusinessHour extends React.Component {
  state = {
    isSubmitting: false,
    companyId: this.props.navigation.getParam('me').company_id,
    companySchedules: this.props.navigation.getParam('me').company_schedules,
  };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  updateSavingStatus({ isSubmitting }) {
    this.setState({ isSubmitting });
    this.props.navigation.setParams({ isSubmitting });
  }

  submit = () => {
    if (this.state.isSubmitting) return;

    this.updateSavingStatus({ isSubmitting: true });

    const schedules_attributes = map(this.state.companySchedules, (schedule, id) => {
      return { ...schedule, week_days: `{${join(schedule.week_days)}}` };
    });

    const params = {
      owned_firm_attributes: {
        id: this.state.companyId,
        schedules_attributes,
      }
    };

    this.props.navigation.getParam('authActions').updateAccount({
      userType: 'business',
      params,
      onSuccess: () => {
        this.updateSavingStatus({ isSubmitting: false });
        this.props.navigation.goBack();
      },
      onFail: () => this.updateSavingStatus({ isSubmitting: false }),
    });
  };

  updateWeekDay = (schedule, weekDay) => {
    let newSchedule;
    if (includes(schedule.week_days, weekDay)) {
      newSchedule = { ...schedule, week_days: without(schedule.week_days, weekDay) };
    } else {
      newSchedule = { ...schedule, week_days: concat(schedule.week_days, weekDay) };
    }

    const index = findIndex(this.state.companySchedules, { id: schedule.id });
    const companySchedules = [
      ...slice(this.state.companySchedules, 0, index),
      newSchedule,
      ...slice(this.state.companySchedules, index + 1),
    ];

    this.setState({ companySchedules });
  };

  updateDate = (schedule, startEnd, date) => {
    let newSchedule;
    if (startEnd === 'starts') {
      newSchedule = { ...schedule, starts: date };
    } else {
      newSchedule = { ...schedule, ends: date };
    }

    const index = findIndex(this.state.companySchedules, { id: schedule.id });
    const companySchedules = [
      ...slice(this.state.companySchedules, 0, index),
      newSchedule,
      ...slice(this.state.companySchedules, index + 1),
    ];

    this.setState({ companySchedules });
  };

  renderSchedule = (schedule, idx) => {
    return (
      <View key={idx}>
        {idx > 0 &&
          <View style={style.l_divider}>
            <View style={style.l_divider_line}/>
            <Text style={style.l_divider_label}>and</Text>
            <View style={style.l_divider_line}/>
          </View>
        }

        <View
          style={{
            marginLeft: scale(-15),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
        {map(WEEK_DAYS, (dayName, day) => (
          <Checkbox
            isActive={includes(schedule.week_days, day)}
            key={day}
            label={dayName[0]}
            onPress={() => this.updateWeekDay(schedule, day) }
          />
        ))}
        </View>

        <Text
          style={{ ...style.formTitle2, marginVertical: verticalScale(15) }}
        >
          Hours
        </Text>

        <View style={style.l_dateFormContainer}>
          <Text style={style.dateLabel}>Open</Text>
          <View style={style.dateInputContainer}>
            <DatePicker
              mode="time"
              date={schedule.starts}
              format="HH:mm"
              showIcon={false}
              inlineValidation={true}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={timeInputStyle}
              style={{ borderWidth: 0, width: scale(110) }}
              onDateChange={(date) => this.updateDate(schedule, 'starts', date) }
            />
          </View>

          <Text style={style.dateLabel}>Close</Text>

          <View style={style.dateInputContainer}>
            <DatePicker
              mode="time"
              date={schedule.ends}
              format="HH:mm"
              showIcon={false}
              inlineValidation={true}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={timeInputStyle}
              style={{ borderWidth: 0, width: scale(110) }}
              onDateChange={(date) => this.updateDate(schedule, 'ends', date) }
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <React.Fragment>
          <FormContainer>
            <Text style={style.formTitle}>Company’s Business Hours</Text>
            <View style={{ height: verticalScale(10) }} />
            <Text style={style.formTitle2}>Days</Text>
            <View style={{ height: verticalScale(10) }} />

            {this.state.companySchedules.map((schedule, idx) => {
              return this.renderSchedule(schedule, idx);
            })}

            <View style={{ height: verticalScale(20) }} />
            <Text style={style.formSubTitle}>
              Let customers know your business hours
            </Text>
          </FormContainer>
        </React.Fragment>
      </SafeAreaView>
    );
  }
}

export default BusinessHour;
