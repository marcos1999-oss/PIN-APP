import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  Container,
  Header,
  Left,
  Body,
  Text,
  Right,
  Content,
  List,
  ListItem,
  Radio,
  Button,
} from "native-base";
import AutoHeightImage from "react-native-auto-height-image";
import styles, { green } from "./style";
import { city3 } from "../../Assets";
import CustomIcon from "../../CustomIcon";

import { getReport } from '../../redux/selectors/index'
import * as reportActions from '../../redux/actions/reportActions'


export const ReasonItem = (props) => {
  // const [checked, setValue] = useState(0);

  return(
    <ListItem onPress={props.onPress} style={[styles.reasonContainer]}>
      <Left>
        <Text style={styles.reasonText}>{ props.reason }</Text>
      </Left>

      <Right>
        <Radio selected={props.value} selectedColor={green} />
      </Right>
    </ListItem>
  )
}

class ReportListing extends React.Component {
  constructor(props) {
    super(props);
  }

  setReportField = (name, value) => {
    this.props.reportActions.setReportField({ name, value });
  };

  render() {
    return (
      <Container>
        <AutoHeightImage
          source={city3}
          width={styles.bgImage.width}
          style={styles.bgImage}
        />
        {/* <Header style={styles.headerContainer}>
                    <Left>
                        <HeaderBackButton
                            tintColor={'black'}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Left>
                    <Body>
                        <Text style={styles.headerTitle}>Report This Listing</Text>
                    </Body>
                    <Right />
                </Header> */}
        <Content style={styles.container}>
          <List>
            <ReasonItem
              id="wrongLocation"
              value={this.props.report.wrongLocation}
              reason="Is the location wrong?"
              onPress={ () => this.setReportField('wrongLocation', !this.props.report.wrongLocation) }
            />
            <ReasonItem
              id="falseOffers"
              value={this.props.report.falseOffers}
              reason="Listing has false offers"
              onPress={ () => this.setReportField('falseOffers', !this.props.report.falseOffers) }
            />
            <ReasonItem
              id="notWorkingPhone"
              value={this.props.report.notWorkingPhone}
              reason="Listing phone number did not work"
              onPress={ () => this.setReportField('notWorkingPhone', !this.props.report.notWorkingPhone) }
            />
            <ReasonItem
              id="incorrectOpenedHour"
              value={this.props.report.incorrectOpenedHour}
              reason="Listing has incorrect open hours"
              onPress={ () => this.setReportField('incorrectOpenedHour', !this.props.report.incorrectOpenedHour) }
            />
            <ReasonItem
              id="differentBusinessName"
              value={this.props.report.differentBusinessName}
              reason="Location has a different business name"
              onPress={ () => this.setReportField('differentBusinessName', !this.props.report.differentBusinessName) }
            />
            <ReasonItem
              id="other"
              value={this.props.report.other}
              reason="Other"
              onPress={ () => this.setReportField('other', !this.props.report.other) }
            />
          </List>

          <Button
            rounded
            style={styles.button}
            onPress={() => this.props.navigation.navigate("ReportListingInput")}
          >
            <Text style={styles.continue}>Continue</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    report: getReport(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reportActions: bindActionCreators(reportActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportListing);
