/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/24
 *
 */

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";
import { LargeList } from "../src";
import { contacts } from "./DataSource";

export class RefreshAndLoadingExample extends React.Component {
  _largeList;
  _index = 0;

  constructor(props) {
    super(props);
    this.state = { data: [contacts[0]] };
  }

  render() {
    return (
      <LargeList
        ref={ref => (this._largeList = ref)}
        style={styles.container}
        data={this.state.data}
        heightForSection={() => 40}
        renderSection={this._renderSection}
        heightForIndexPath={() => 60}
        renderIndexPath={this._renderItem}
        refreshHeaderHeight={60}
        refreshHeader={NormalHeader}
        onRefresh={this._onRefresh}
        loadingFooterHeight={60}
        loadingFooter={NormalFooter}
        onLoading={this._onLoading}
      />
    );
  }

  _onRefresh = () => {
    this._largeList.beginRefresh();
    setTimeout(() => {
      this._largeList.endRefresh();
      this._index = 0;
      this.setState({ data: [contacts[this._index]] });
    }, 2000);
  };

  _onLoading = () => {
    this._largeList.beginLoading();
    setTimeout(() => {
      this._largeList.endLoading();
      this.setState(p => ({ data: p.data.concat(contacts[++this._index]) }));
    }, 2000);
  };

  _renderSection = (section: number) => {
    const contact = this.state.data[section];
    return (
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionText}>
          {contact.header}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderItem = ({ section: section, row: row }) => {
    const contact = this.state.data[section].items[row];
    return (
      <TouchableOpacity style={styles.row}>
        <Image source={contact.icon} style={styles.image} />
        <View style={styles.rContainer}>
          <Text style={styles.title}>
            {contact.name}
          </Text>
          <Text style={styles.subtitle}>
            {contact.phone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    marginTop: 20,
    fontSize: 18
  },
  section: {
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center"
  },
  sectionText: {
    fontSize: 20,
    marginLeft: 10
  },
  row: { flex: 1, flexDirection: "row", alignItems: "center" },
  image: { marginLeft: 16, width: 44, height: 44 },
  rContainer: { marginLeft: 20 },
  title: { fontSize: 18 },
  subtitle: { fontSize: 14, marginTop: 8 }
});
