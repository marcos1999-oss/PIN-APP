import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from "formik";
import { get, isEmpty, join, slice, map } from 'lodash';
import validationSchema from "../validationSchema";
import { TextInput } from "../../../Components/Common";
import { FormContainer } from "../Common";

/*Style*/
import style from "../style.js";
import { Button, Item, Input } from "native-base";
import CustomIcon from "../../../CustomIcon";
import { verticalScale, moderateScale, scale } from "../../../Utils/scaling";

const Tag = ({ ...props }) => {
  return (
    <TouchableOpacity
      style={[style.tagContainer, props.active && { backgroundColor: "white" }]}
      onPress={props.onPress}
    >
      <Text style={[style.tagText, props.active && { color: "black" }]}>
        #{props.text}
      </Text>
      {props.active && (
        <View style={style.tagRemoveContainer}>
          <Button
            transparent
            style={style.tagRemoveButton}
            onPress={props.onRemove}
          >
            <CustomIcon name="close" size={verticalScale(4)} />
          </Button>
        </View>
      )}
    </TouchableOpacity>
  );
};

const form = {
  keyWords: null,
};

export default class TypeOfBusiness extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      currentTag: null,
      showPlaceholder: true,
      tagList: this.props.navigation.getParam('me').company_tag_list,
      tempTag: '',
    };
  }

  form = {
    companyId: this.props.navigation.getParam('me').company_id,
    companyBusinessType: this.props.navigation.getParam('me').company_business_type,
  };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  onChangeTagText = (text) => {
    const lastChar = text[text.length - 1];

    if (lastChar === ' ' || lastChar === ',' || lastChar === '.') {
      this.submitTag();
    } else {
      this.setState({ tempTag: text });
    }
  };

  submitTag = () => {
    if (!isEmpty(this.state.tempTag)) {
      this.setState({
        tagList: [...this.state.tagList, this.state.tempTag],
        tempTag: '',
      });
    }
  };

  removeTag = (index) => {

    this.setState({
      tagList: [
        ...slice(this.state.tagList, 0, index),
        ...slice(this.state.tagList, index + 1),
      ]
    });
  };

  updateSavingStatus({ isSubmitting }) {
    this.setState({ isSubmitting });
    this.props.navigation.setParams({ isSubmitting });
  }

  submit = () => {
    if (this.formRef) {
      this.formRef.handleSubmit();
    }
  };

  onSubmit = (values, actions) => {
    if (this.state.isSubmitting) return;

    this.updateSavingStatus({ isSubmitting: true });

    const params = {
      owned_firm_attributes: {
        id: this.form.companyId,
        business_type: values['companyBusinessType'],
        tag_list: join(this.state.tagList),
      }
    };

    this.props.navigation.getParam('authActions').updateAccount({
      userType: 'business',
      params,
      onSuccess: () => {
        this.updateSavingStatus({ isSubmitting: false });
        this.props.navigation.goBack();
      },
      onFail: (error) => {
        actions.setFieldError('companyBusinessType', get(error, 'response.data.errors.full_messages.0'));
        this.updateSavingStatus({ isSubmitting: false });
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <KeyboardAwareScrollView>
          <Formik onSubmit={this.onSubmit} initialValues={this.form} ref={(ref) => this.formRef = ref}>
            {(props) => (
              <React.Fragment>
                <FormContainer>
                  <Text style={style.formTitle}>Type of Business</Text>
                  <View
                    style={{
                      marginLeft: scale(-5),
                      marginTop: verticalScale(10),
                    }}
                  >
                    <Item style={{ borderBottomWidth: 0, margin: 0 }}>
                      <TextInput
                        form={props}
                        formKey="companyBusinessType"
                        value={props.values.companyBusinessType}
                        placeholder="What category is your business?"
                        placeholderTextColor="#AFAFAF"
                        containerStyle={{ borderColor: "#fff", margin: 0 }}
                        style={{ fontSize: moderateScale(16) }}
                        autoCorrect={false}
                        maxLength={40}
                        setRef={() => { }}
                        autoCapitalize="words"
                      />
                      <Text style={style.error}>
                        {props.errors && props.errors.companyBusinessType}
                      </Text>
                    </Item>
                  </View>

                  <View style={{ height: verticalScale(100) }} />

                  <Text style={style.formSubTitle}>
                    Example: Mini golf, Italian Restaurant (40 chars)
                </Text>
                </FormContainer>

                <View
                  style={{
                    paddingHorizontal: scale(20),
                    paddingVertical: verticalScale(20),
                  }}
                >
                  <View
                    style={{
                      paddingVertical: verticalScale(10),
                      paddingHorizontal: scale(30),
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: moderateScale(10) }}>
                      Enter 5 keywords below that mainly describe your business so
                      customers can find you
                  </Text>
                  </View>

                  <View style={[style.keyWordContainer, this.state.tagList.length >= 1 && { flexDirection: 'row', flexWrap: 'wrap', height: 'auto', paddingRight: 5 }]}>
                    {map(this.state.tagList, (tag, idx) => (
                      <Tag
                        key={idx}
                        text={tag}
                        onPress={() => this.setState({ currentTag: idx })}
                        active={this.state.currentTag === idx}
                        onRemove={() => this.removeTag(idx)}
                      />
                    ))}

                    {(
                      this.state.tagList.length <= 4 && <Item style={style.keyWordInputContainer}>
                        <Input

                          value={this.state.tempTag}
                          placeholder={"Enter Keywords"}
                          placeholderTextColor="#eee"
                          onFocus={() =>
                            this.setState({
                              currentTag: null,
                              showPlaceholder: false,
                            })
                          }
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType="next"
                          onBlur={() => {
                            this.submitTag();
                            this.setState({ showPlaceholder: true });
                          }}
                          onSubmitEditing={this.submitTag}
                          onChangeText={this.onChangeTagText}
                        />
                      </Item>
                    )}
                  </View>

                  <View
                    style={{
                      paddingVertical: verticalScale(10),
                      paddingLeft: scale(30),
                      paddingRight: scale(10),
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: moderateScale(10) }}>
                      Example: #italian #restaurant #dining #breakfast #lunch
                      #kids
                  </Text>
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
