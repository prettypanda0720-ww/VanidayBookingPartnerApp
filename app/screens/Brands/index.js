import React, {Component} from 'react';
import {
  FlatList,
  View,
  Animated,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDescription,
} from '@components';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      ourTeam: [
        {
          image: '',
          subName: 'Products assigned 0',
          name: 'Vaniday',
          screen: 'EditBrand',
          description: '',
        },
        {
          image: '',
          subName: 'Products assigned 0',
          name: 'FiderbyCOVO',
          screen: 'EditBrand',
          description: '',
        },
      ],
    };
    this.growAnimated = new Animated.Value(0);
  }

  render() {
    const {navigation} = this.props;
    const {search, screen} = this.state;
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 40],
    });

    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
        forceInset={{top: 'always'}}>
        <Header
          title="Brands"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{padding: 20}}>
          <View style={styles.searchWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  search: '',
                });
              }}
              style={styles.btnSearch}>
              <Icon name="search" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>

            <TextInput
              style={[BaseStyle.textInput, {paddingLeft: 30}]}
              onChangeText={(text) => this.setState({search: text})}
              autoCorrect={false}
              placeholder="Search..."
              placeholderTextColor={BaseColor.grayColor}
              value={search}
              selectionColor={BaseColor.primaryColor}
              onSubmitEditing={() => {
                this.onSearch(search);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  search: '',
                });
              }}
              style={styles.btnClearSearch}>
              <Icon name="times" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.ourTeam.map((item, index) => {
          return (
            <ProfileDescription
              style={{marginTop: 10}}
              key={'service' + index}
              image={item.image}
              description={item.description}
              name={item.name}
              subName={item.subName}
              onPress={() => navigation.navigate(item.screen)}
            />
          );
        })}
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateBrand')}
            style={styles.button}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Brands;
