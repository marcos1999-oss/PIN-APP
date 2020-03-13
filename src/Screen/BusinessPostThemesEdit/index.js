import React from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation'
import { Formik, FieldArray } from "formik";
import { Content, Text, Button, View, Form, Item, Input } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles, { timeInputStyle } from "./style";
import CustomIcon from "../../CustomIcon";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";
import DatePicker from "react-native-datepicker";
import { CachedImage } from 'react-native-cached-images';
import { cloneDeep, isNull, isUndefined, isEmpty, get } from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { Btn, CardContainer } from "../../Components/Common";

import { errorMessage } from '../../Utils/alerts'
import { getPostsMeta, getEditingPost, getPreviewPost, getMyPosts, getMe } from '../../redux/selectors/index'
import * as postActions from '../../redux/actions/postActions'
import * as authActions from '../../redux/actions/authActions'
import postReducers from '../../redux/reducers/postReducers';


const ActiveOfferIcon = () => (
  <CustomIcon
    name="edit"
    style={styles.activeOfferIcon}
    size={verticalScale(17)}
  />
);

const OfferIcon = () => (
  <CustomIcon
    name="editFill"
    style={styles.offerIcon}
    size={verticalScale(20)}
  />
);

const types = [
  { icon: "radar", name: "Regular", color: "black", paramValue: 'regular' },
  { icon: "celebrate", name: "Holiday", color: "#02BAFF", paramValue: 'holiday' },
  { icon: "birthday", name: "Birthday", color: "#AD378C", paramValue: 'birthday' },
];

const Checkbox = ({ isActive, label, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.checkbox, isActive && styles.checkbox_active]}>
      <Text style={[styles.checkbox_label, isActive && { color: "#fff" }]}>
        {label}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

class OfferContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { offer, isNewPost } = nextProps;
    if ((cloneDeep(prevState) !== cloneDeep(offer)) && !isNewPost) {
      return {
        id: offer.id,
        title: offer.title,
        price: offer.price ? offer.price.toString() : '',
        percent: offer.percent ? offer.percent.toString() : '',
        open: offer.open,
        startTime: offer.startTime,
        endTime: offer.endTime,
        vip: offer.vip,
      };
    }

    return null;
  }

  onFormChange = (offer) => {
    this.props.formChange(offer);
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={cloneDeep(this.state)}
          enableReinitialize={true}
          validate={this.onFormChange}
        >
          {(props) => (
            <Form>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Offer Title"
                  placeholderTextColor="#959595"
                  name='title'
                  value={props.values.title}
                  onChangeText={props.handleChange('title')}
                  maxLength={40}
                />
                <View style={styles.wordCountContainer}>
                  <Text style={styles.wordCount}>
                    {props.values.title.length.toString()}/40
                  </Text>
                </View>
              </View>

              <View style={styles.availabilityContainer}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Availability</Text>
                </View>

                <View style={styles.dayPickerContainer}>
                  <Text style={styles.formTitle}>
                    Choose the days this offer will be shown
                  </Text>

                  <FieldArray
                    name="open"
                    render={(arrayHelper) => (
                      <View style={styles.ckBoxContainer}>
                        {props.values.open.map((d, idx) => {
                          return (
                            <Checkbox
                              isActive={d.value}
                              value={d.id}
                              key={d.id}
                              label={d.id[0]}
                              onPress={() => {
                                arrayHelper.replace(idx, {
                                  id: d.id,
                                  value: !d.value,
                                });
                              }}
                            />
                          );
                        })}
                      </View>
                    )}
                  />

                  <Text style={styles.formTitle}>
                    Hours you want to show this offer
                  </Text>

                  <View style={styles.hoursFormContainer}>
                    <Text style={styles.hourLabel}>starts</Text>
                    <Item style={styles.dateInputContainer}>
                      <DatePicker
                        mode="time"
                        date={props.values.startTime}
                        format="HH:mm"
                        showIcon={false}
                        inlineValidation={true}
                        style={styles.dateInput}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={timeInputStyle}
                        onDateChange={props.handleChange("startTime")}
                      />
                      <Text style={styles.m_error_msg}>
                        {props.errors.startTime}
                      </Text>
                    </Item>

                    <Text style={styles.hourLabel}>ends</Text>
                    <Item style={styles.dateInputContainer}>
                      <DatePicker
                        mode="time"
                        date={props.values.endTime}
                        format="HH:mm"
                        showIcon={false}
                        inlineValidation={true}
                        style={styles.dateInput}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={timeInputStyle}
                        onDateChange={props.handleChange("endTime")}
                      />
                      <Text style={styles.m_error_msg}>
                        {props.errors.endTime}
                      </Text>
                    </Item>
                  </View>
                </View>
              </View>

              <View style={styles.offerPriceContainer}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Offer price</Text>
                </View>

                <View style={styles.priceContainer}>
                  <View style={styles.leftPriceContainer}>
                    <Text style={styles.hourLabel}>Price</Text>
                    <CustomIcon name="dollar" style={styles.dollarSymbol} />
                    <Input
                      onFocus={() => props.setFieldValue("percent", null)}
                      keyboardType="numeric"
                      placeholder="0.00"
                      placeholderTextColor="#5F92F3"
                      style={styles.priceText}
                      onChangeText={props.handleChange("price")}
                      value={props.values.price}
                    />
                  </View>

                  <View style={styles.middleDivider} />
                  <View style={styles.middleTextContainer}>
                    <Text style={styles.middleText}>or</Text>
                  </View>

                  <View style={styles.rightPriceContainer}>
                    <Input
                      onFocus={() => props.setFieldValue("price", null)}
                      keyboardType="numeric"
                      placeholder="%"
                      placeholderTextColor="#9EA3A5"
                      style={styles.priceText}
                      onChangeText={props.handleChange("percent")}
                      value={props.values.percent}
                    />
                  </View>
                </View>
              </View>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

class BusinessPostThemesEdit extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerRight: (
        <Button
          transparent
          style={styles.submitButton}
          onPress={() => params.submit()}
        >
          <Text style={styles.submitText}>{navigation.getParam('headerText', 'Post')}</Text>
        </Button>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      postTitle: "",
      currentEditing: 0,
      activeType: this.props.navigation.getParam("postingType", 0),
      modalLimitPostsShow: false,
      postKindType: this.props.post.kinds,
      postButtonDisabled: false,
      regularMessage: false,
      holidayMessage: false,
      birthdayMessage: false

    };
  }

  componentDidMount() {
    console.debug('BusinessPostThemesEdit#componentDidMount');

    this.props.navigation.setParams({ submit: this.createPost, headerText: (this.props.post.id ? 'Update' : 'Post') });
  }

  updateOffer = (offer) => {
    this.props.postActions.setEditingPostField({
      fieldName: 'offers',
      fieldValue: this.props.post.offers.set(this.state.currentEditing, offer),
    });
  };

  renderOffer = () => {
    const offer = this.props.post.offers[this.state.currentEditing];
    let isNewPost = true;
    if (this.props.navigation.state.params !== undefined) {
      if (this.props.navigation.state.params.isNewPost !== undefined) isNewPost = this.props.navigation.state.params.isNewPost
    };
    if (isUndefined(offer)) {
      return (<View></View>);
    } else {
      return (
        <OfferContent
          offer={offer}
          index={this.state.currentEditing}
          formChange={this.updateOffer}
          isNewPost={isNewPost}
        />
      );
    }
  };

  setPostParams = (payload) => {
    console.log(payload);

    const themeColor = this.props.navigation.getParam("themeColor", null);
    const description = this.props.navigation.getParam("description", null);

    if (!isNull(themeColor) && !isNull(description)) {
      this.props.postActions.setEditingPostField({ fieldName: 'colorCode', fieldValue: themeColor });
      this.props.postActions.setEditingPostField({ fieldName: 'description', fieldValue: description });
    }
  };

  createPost = () => {
    const { post } = this.props;
    this.setState({ postButtonDisabled: true });

    let isNewPost = true;
    if (this.props.navigation.state.params !== undefined) {
      if (this.props.navigation.state.params.isNewPost !== undefined) {
        isNewPost = this.props.navigation.state.params.isNewPost;
      }
    }

    if ((isNull(post.id) || isUndefined(post.id) || isEmpty(post.id)) && isNewPost) {

      if (this.props.me.regular_disabled || this.props.me.holiday_disabled || this.props.me.birthday_disabled) {
        this.setState({ modalLimitPostsShow: true, postButtonDisabled: false }, () => {
          this.setState({
            regularMessage: this.props.me.regular_disabled ? "2 Regular posts " : "",
            holidayMessage: this.props.me.holiday_disabled ? "1 holiday post " : "",
            birthdayMessage: this.props.me.birthday_disabled ? "1 birthday post " : ""
          }, () => {
            this.setState({
              holidayMessage: this.state.regularMessage ? " and " + this.state.holidayMessage : this.state.holidayMessage,
              birthdayMessage: (this.state.regularMessage || this.state.holidayMessage) ? " and " + this.state.birthdayMessage : this.state.birthdayMessage,
            })
          });
        });

      } else {
        this.props.postActions.createPost({
          post,
          onSuccess: () => {
            this.props.authActions.fetchMe({ userType: 'business' });
            this.setState({ postButtonDisabled: false });
            this.props.navigation.navigate({ routeName: 'BusinessActivity' });
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'BusinessActivity' }),
              ]
            }));
          },
          onFail: error => {
            this.setState({ postButtonDisabled: true });
            errorMessage({ message: 'Could not create the post', description: error.message });
          }
        });
      }
    } else {
      if (this.state.postKindType !== this.props.post.kinds && (this.props.me.regular_disabled || this.props.me.holiday_disabled || this.props.me.birthday_disabled)) {
        this.setState({ modalLimitPostsShow: true, postButtonDisabled: false }, () => {
          this.setState({
            regularMessage: this.props.me.regular_disabled ? "2 Regular posts " : "",
            holidayMessage: this.props.me.holiday_disabled ? "1 holiday post " : "",
            birthdayMessage: this.props.me.birthday_disabled ? "1 birthday post " : ""
          }, () => {
            this.setState({
              holidayMessage: this.state.regularMessage ? " and " + this.state.holidayMessage : this.state.holidayMessage,
              birthdayMessage: (this.state.regularMessage || this.state.holidayMessage) ? " and " + this.state.birthdayMessage : this.state.birthdayMessage,
            })
          });
        });
      } else {
        this.props.postActions.editPost({
          post: { ...post, status: 'active' },
          onSuccess: () => {
            this.props.authActions.fetchMe({ userType: 'business' });
            this.setState({ postButtonDisabled: true });
            this.props.navigation.navigate({ routeName: 'BusinessActivity' });
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'BusinessActivity' }),
              ]
            }));
          },
          onFail: error => {
            this.setState({ postButtonDisabled: true });
            errorMessage({ message: 'Could not edit the post', description: error.message });
          }
        });
      }
    }
  };

  previewPost = () => {
    const { post } = this.props;

    this.props.postActions.previewPost({
      post,
      onSuccess: () => {
        this.props.postActions.viewPost({
          post: this.props.preview,
          callback: () => { this.props.navigation.push('BusinessActivityPostView', { status: 0 }) },
        });
      },
      onFail: error => {
        errorMessage({ message: 'Could not preview this post', description: error.message });
      }
    });
  };

  editImage = () => {
    if (this.props.post.id) {
      if (this.props.post.uploadMethod === 'photo') {
        this.props.navigation.navigate('BusinessPostCamera');
      } else {
        this.props.navigation.navigate("BusinessPostThemes")
      }
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { currentEditing } = this.state;
    const image = this.props.post.photo;
    const imageUri = get(image, 'url', null);
    const themeColor = this.props.post.colorCode;
    const photoMethod = this.props.post.uploadMethod === 'photo';

    return (
      <KeyboardAwareScrollView style={styles.container} behavior="padding">
        <NavigationEvents onDidFocus={this.setPostParams.bind(this)} />

        <TouchableWithoutFeedback>
          <View>
            <View style={styles.bgSelection}>
              {photoMethod ? (
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={this.editImage}
                >
                  <CachedImage source={{ uri: imageUri }} style={styles.image} />
                </TouchableOpacity>
              ) : (
                  <Button
                    transparent
                    style={{ paddingBottom: 0 }}
                    onPress={this.editImage}
                  >
                    <CustomIcon
                      name="circleSelect"
                      size={verticalScale(36)}
                      style={{ color: themeColor }}
                    />
                  </Button>
                )}
            </View>

            <Item style={styles.inputContainer}>
              <Input
                placeholder="Post Title"
                placeholderTextColor="#959595"
                value={this.props.post.title}
                onChangeText={(text) => this.props.postActions.setEditingPostField({ fieldName: 'title', fieldValue: text })}
                maxLength={48}
              />
              <View style={styles.wordCountContainer}>
                <Text style={styles.wordCount}>
                  {this.props.post.title.length.toString()}/48
                </Text>
              </View>
            </Item>

            <View style={styles.offerContainer}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Offers</Text>
                <Text style={styles.sectionSubText}>
                  You can create more than one offer
                </Text>
              </View>

              <View style={styles.offerIconContainer}>
                {this.props.post.offers.map((offer, idx) => {
                  const active = currentEditing === idx;

                  if (offer.vip) {
                    return (
                      <Button
                        key={idx}
                        style={{
                          ...styles.offerButton,
                          backgroundColor: "#A338FF",
                        }}
                        onPress={() => this.setState({ currentEditing: idx })}
                      >
                        {active ? (
                          <ActiveOfferIcon />
                        ) : (
                            <Text style={styles.vipText}>VIP</Text>
                          )}
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        key={idx}
                        style={[
                          styles.offerButton,
                          { backgroundColor: active ? "#5F92F3" : "#9EA3A5" },
                        ]}
                        onPress={() => this.setState({ currentEditing: idx })}
                      >
                        {active ? <ActiveOfferIcon /> : <OfferIcon />}
                      </Button>
                    );
                  }
                })}
              </View>

              {this.renderOffer()}
            </View>

            <View style={styles.postingTypeContainer}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Type of Posting</Text>
              </View>
              <View style={styles.typeContainer}>
                {types.map((type, idx) => (
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      this.props.post.kinds === type.paramValue && styles.activeTypeButton,
                    ]}
                    key={idx}
                    onPress={() => this.props.postActions.setEditingPostField({ fieldName: 'kinds', fieldValue: type.paramValue })}
                  >
                    <CustomIcon
                      name={type.icon}
                      style={{ ...styles.typeIcon, color: type.color }}
                    />
                    <Text style={styles.typeText}>{type.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={{ ...styles.sectionSubText, alignSelf: "center" }}>
                Halloween Horror Night
              </Text>
            </View>
            <View style={styles.buttonGroup}>
              <Button
                disabled={this.state.postButtonDisabled}
                block
                style={{ ...styles.buttonBlock, backgroundColor: "#5F92F3" }}
                onPress={this.createPost}
              >{this.state.postButtonDisabled ? (<ActivityIndicator size={'small'} color='white' />)
                : (<Text style={styles.btnMainText}>{this.props.post.id ? 'Update' : 'Post'}</Text>)}
              </Button>
              <Button
                block
                disabled={this.props.postsMeta.loadingPreview}
                style={{ ...styles.buttonBlock, backgroundColor: "#848484" }}
                onPress={this.previewPost}
              >
                {this.props.postsMeta.loadingPreview ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                    <React.Fragment>
                      <Text style={styles.btnMainText}>Preview</Text>
                      <Text style={styles.btnSubText}>
                        View your posting before you publish it
                    </Text>
                    </React.Fragment>
                  )}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal isVisible={this.state.modalLimitPostsShow} onBackButtonPress={() => { this.setState({ modalLimitPostsShow: false }); }}>
          <CardContainer style={styles.cardContainer}>
            <View style={styles.cardWrapper}>
              <CustomIcon
                name="camera"
                size={verticalScale(32)}
                color={"#5F92F3"}
              />

              <Text
                style={{
                  ...styles.cardTitle, marginTop: verticalScale(10),
                  marginBottom: verticalScale(5)
                }}
              >
                Reached your post limit.
                </Text>
              <Text style={{
                fontWeight: 'normal', color: '#d3d3d3', fontSize: moderateScale(13),
                textAlign: 'center'
              }}>
                Limits of {this.state.regularMessage + this.state.holidayMessage + this.state.birthdayMessage} .
              </Text>

              <View style={styles.actionBtnContainer}>
                <Btn
                  rounded
                  title="Done"
                  style={{
                    backgroundColor: "#5F92F3",
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(16),
                  }}
                  onPress={() => {
                    this.setState({ modalLimitPostsShow: false });
                  }}
                />
              </View>
            </View>
          </CardContainer>
        </Modal>

      </KeyboardAwareScrollView >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postsMeta: getPostsMeta(state),
    post: getEditingPost(state),
    preview: getPreviewPost(state),
    posts: getMyPosts(state),
    me: getMe(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPostThemesEdit);
