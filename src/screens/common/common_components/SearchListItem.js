import React, { useState, useCallback, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../../category_company/styles/CompaniesStyle';
import images from '../../../assets/img_paths/images';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector, useDispatch } from 'react-redux';
import setCompanyInfo from '../../../redux/actions/companyInfo';
import setFavouriteCompany from '../../../redux/actions/favouriteCompany';
import { ServiceConnection_CompaniesAddFavourite, ServiceConnection_CallHistoryByCompany } from '../../../config/api/ApiFunctions';
import _ from 'lodash';

const SearchListItem = (props) => {
    const { item, index, isCompanyItem } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [companyItemData, setCompanyItemData] = useState([]);
    const [isAddedFav, setIsAddedFav] = useState({});
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const favComp = useSelector(fav => fav.favouriteCompany);

    const _onToggle = useCallback(
        () => {
            setIsOpen(isOpen => !isOpen);
        },
        [isOpen],
    );
    _setCompanyInfoDataAndNavigate = async (item, directedScreen) => {
        const companyInfoData = {
            companyId: item.company_id,
            companyName: item.name,
            companyImg: item.img_path
        }
        dispatch(setCompanyInfo(companyInfoData));
        if (directedScreen == 'IVRNode') _checkAndNavigate(item);
        else navigate(directedScreen);
    }
    _checkAndNavigate = async (item) => {
        const responseCallHistoryByCompany = await ServiceConnection_CallHistoryByCompany(item.company_id);
        if (responseCallHistoryByCompany.result.call_history && _.size(responseCallHistoryByCompany.result.call_history.services) > 0) {
            navigate('CallHistoryByCompany', { callHistoryByCompanyData: responseCallHistoryByCompany.result.call_history });
        }
        else navigate('IVRNode');
    }
    _addFavourites = async (item, favStatus) => {
        let data = { "companyId": item.company_id };
        if (favStatus != false) {
            const responseAddFavourite = await ServiceConnection_CompaniesAddFavourite(data);
            if (responseAddFavourite.success) {
                item.is_added_favourites = true;
                let companyAddedFavouriteStatus = item.is_added_favourites;
                dispatch(setFavouriteCompany(companyAddedFavouriteStatus));
            }
        }
        else {
            item.is_added_favourites = false;
            let companyAddedFavouriteStatus = item.is_added_favourites;
            dispatch(setFavouriteCompany(companyAddedFavouriteStatus));
        }
    }
    return (
        <TouchableOpacity onPress={() => _setCompanyInfoDataAndNavigate(item, 'CompanyInfo')} style={styles.field_trending_companies}>
            <View key={index} style={styles.subfield_trending_companies}>
                <View style={styles.trending_companies}>
                    <Image source={{ uri: item.img_path }} style={styles.img_trending_brand} resizeMode='contain' />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.txt_brand}>{item.name}</Text>
                        <View style={styles.field_rating_review}>
                            <Text style={styles.txt_rating}>{item.rating}</Text>
                            <Text style={styles.txt_reviews}>{item.review_count}{item.call_duration_time_unit} {props.lang}</Text>
                        </View>
                    </View>
                    <View style={styles.field_icons_on_trending_companies}>
                        {!isOpen &&
                            <TouchableOpacity onPress={() => _addFavourites(item, !item.is_added_favourites)}>
                                <Image source={item.is_added_favourites ? images.icon_filled_fav : images.icon_empty_favourite} style={styles.icon_favourite} resizeMode='contain' />
                            </TouchableOpacity>}
                        {
                            !isOpen ?
                                <View style={styles.field_closed_toggle}>
                                    <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={_onToggle} style={props.isList ? styles.field_btn_table_toggle : { marginHorizontal: 10 }}>
                                        <Image source={images.icon_table_toggle} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={isCompanyItem ? [styles.field_open_toggle, { marginRight: 30 }] : styles.field_open_toggle}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => _setCompanyInfoDataAndNavigate(item, 'IVRNode')}>
                                            <Image source={images.icon_phone} style={styles.icon_toggle_phone} resizeMode='contain' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => _setCompanyInfoDataAndNavigate(item, 'CompanyInfo')} style={styles.btn_clickable_field}>
                                            <Image source={images.icon_about_tegsoft_touch} style={styles.icon_toggle_mark} resizeMode='contain' />
                                        </TouchableOpacity>
                                        <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={_onToggle}>
                                            <Image source={images.icon_toggle_close} style={styles.icon_toggle_close} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export { SearchListItem };