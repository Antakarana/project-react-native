import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/DashboardStyle';
import { Badge } from 'native-base';

const StatisticsTableItem = (props) => {
    return (
        <View style={props.style}>
            <Text style={styles.title_dashboard_table}>{props.langDesc}</Text>
            <Text style={styles.txt_number}>{props.data}</Text>
            <Text style={styles.txt_unit}>{props.langUnitDesc}</Text>
            <Badge style={[styles.img_bg_table, props.iconBgColor]}>
                <Image source={props.img} style={styles.img_table} resizeMode='contain' />
            </Badge>
        </View>
    )
}
export { StatisticsTableItem };