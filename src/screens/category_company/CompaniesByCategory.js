import React, { useState, useEffect } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import lang from '../../lang/Language';
import styles from './styles/CompaniesStyle';
import { SearchListItem, ListItemSeparator } from '../common/common_components/index';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

const CompaniesByCategory = ({ navigation }) => {
    const companiesByCategory = useNavigationParam('companiesByCategory');
    const selectedCategory = useNavigationParam('selectedCategory');
    useEffect(() => {
        navigation.setParams({
            title: selectedCategory
        });
    }, []);
    return (
        <View style={styles.shadow_flatlist}>
            <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
            <FlatList
                data={companiesByCategory}
                scrollEnabled={false}
                ItemSeparatorComponent={ListItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <SearchListItem
                        item={item}
                        index={index}
                        lang={lang.reviews}
                        isList={true} />
                )}
            />
        </View>
    )
}
export { CompaniesByCategory };