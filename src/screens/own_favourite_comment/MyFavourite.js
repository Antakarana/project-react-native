import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styles from './styles/MyFavouriteStyle';
import { SearchListItem, ListItemSeparator, TouchBtn, Indicator } from '../../screens/common/common_components/index';
import { ServiceConnection_FavouriteCompanies } from '../../config/api/ApiFunctions';
import lang from '../../lang/Language';
import _ from 'lodash';
import images from '../../assets/img_paths/images';

const MyFavourite = ({ navigation }) => {
    const { navigate } = useNavigation();
    let [favouriteCompanies, setFavouriteCompanies] = useState([]);
    const [showIndicator, setShowIndicator] = useState(true);

    useEffect(() => {
        _getFavouriteCompanies();
    }, []);

    _getFavouriteCompanies = async () => {
        const responseFavouriteCompanies = await ServiceConnection_FavouriteCompanies();
        if (responseFavouriteCompanies.success) await setFavouriteCompanies(responseFavouriteCompanies.result.companies);
        else if (responseFavouriteCompanies == "unauthorization") {
            AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
            navigate("Login");
        }
        
        setShowIndicator(false);
    };
    return (
        <SafeAreaView style={styles.field_my_favourite}>
            <ScrollView>
                {showIndicator && <Indicator />}
                <View style={styles.field_list}>
                    {
                        _.size(favouriteCompanies) > 0 ?
                            <View style={styles.shadow_flatlist}>
                                <FlatList
                                    data={favouriteCompanies}
                                    scrollEnabled={false}
                                    ItemSeparatorComponent={ListItemSeparator}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <SearchListItem
                                            item={item}
                                            index={index}
                                            lang={lang.reviews}
                                            isList={true} />
                                    )} />
                            </View>
                            :
                            <View style={{ marginTop: 176 }}>
                                <Image style={styles.icon_empty_fav} resizeMode='contain'
                                    source={images.icon_empty_favourites} />
                                <Text style={styles.txt_empty_fav_desc} >{lang.empty_fav_desc}</Text>
                                <TouchBtn
                                    lang={lang.btn_touch}
                                    func={() => navigate('Companies')}
                                    styleBtn={styles.btn_touch}
                                    txtStyle={styles.txt_touch_btn}
                                />
                            </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export { MyFavourite };