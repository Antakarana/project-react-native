import React, { useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import lang from '../../../lang/Language';
import styles from '../styles/CompaniesStyle';
import Carousel from 'react-native-snap-carousel';
import images from '../../../assets/img_paths/images';
import { SearchListItem } from '../../common/common_components/index';

const screenWidth = Math.round(Dimensions.get('window').width);

const CompanyItem = (props) => {
    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.flex_direction_row}>
                    <SearchListItem item={item} index={index} lang={lang.reviews} isCompanyItem={true} />
                </View>
            </View>
        );
    }
    return (
        <View style={styles.field_companies}>
            <View style={styles.field_subtitle}>
                <Text style={styles.title_on_companies}>{props.lang}</Text>
            </View>
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth * 0.9}
                data={props.data}
                renderItem={_renderItem}
                slideStyle={styles.field_border}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                contentContainerCustomStyle={styles.horizontal_scrollabled_table} />
        </View>
    )
}

export { CompanyItem };