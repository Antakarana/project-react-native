import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import styles from './styles/EditProfileStyle';
import { TxtInput } from '../entry/common_components/index';
import { TouchBtn } from '../common/common_components/index';
import lang from '../../lang/Language';
import images from '../../assets/img_paths/images';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import RadioForm from 'react-native-simple-radio-button';

const radio_props = [
    { label: lang.male, value: 0 },
    { label: lang.female, value: 1 }
];

const EditProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState();
    const [selectedRadio, setSelectedRadio] = useState(false);
    //const gender = useNavigationParam('gender');

    const nameValidation = (name) => {
        return name && name.length > 2;
    };

    const emailValidation = (email) => {
        let reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
        return reg.test(email);
    };

    const phoneValidation = (phoneNumber) => {
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);
        if (parsedPhoneNumber) {
            return parsedPhoneNumber.isValid();
        } else if (phoneNumber) {
            return false;
        } else {
            return true;
        }
    };
    return (
        <SafeAreaView style={styles.field_profile}>
            <View style={styles.field_content}>
                <TxtInput
                    placeholder={lang.name}
                    onChangeText={(txt) => setName(txt)}
                    value={name}
                    iconPath={images.icon_avatar}
                    validation={() => nameValidation(name)}
                    errorText={lang.name_at_least_3_chars}
                />
                <View style={styles.height_between_inputs} />
                <TxtInput
                    placeholder={lang.surname}
                    onChangeText={(txt) => setSurname(txt)}
                    value={surname}
                    iconPath={images.icon_avatar}
                    validation={() => nameValidation(surname)}
                    errorText={lang.surname_at_least_3_chars}
                />
                <View style={styles.height_between_inputs} />
                <TxtInput
                    placeholder={lang.phone_with_validation}
                    onChangeText={(txt) => setPhoneNumber(txt)}
                    iconPath={images.icon_phone_entry_screen}
                    value={new AsYouType().input(phoneNumber)}
                    keyboardType={'phone-pad'}
                    validation={() => phoneValidation(phoneNumber)}
                    errorText={lang.enter_valid_phone}
                />
                <View style={styles.field_gender}>
                    <Text style={styles.txt_gender}>{lang.gender}</Text>
                    <RadioForm
                        radio_props={radio_props}
                        formHorizontal={true}
                        // initial={gender.isLowerCase=='male' ? 0 : 1 }
                        initial={0}
                        onPress={(value) => setSelectedRadio(value)}
                        buttonSize={11}
                        radioStyle={{
                            marginRight: 20
                        }}
                        buttonOuterSize={22}
                        selectedButtonColor='#FA8732'
                        style={{ marginLeft: 10 }}
                        buttonColor='#FA8732'
                        labelStyle={{ fontSize: 17, color: '#666666' }} />
                </View>
                <TxtInput
                    placeholder={lang.birth_date}
                    onChangeText={(txt) => setBirthDate(txt)}
                    iconPath={images.icon_phone_entry_screen}
                    keyboardType={'phone-pad'}
                    errorText={lang.enter_valid_phone}
                />
                <View style={styles.height_between_inputs} />
                <TxtInput
                    placeholder={lang.email}
                    onChangeText={(txt) => setEmail(txt.toLowerCase())}
                    value={email}
                    isLowerCase={true}
                    iconPath={images.icon_email_entry_screen}
                    keyboardType={'email-address'}
                    validation={() => emailValidation(email)}
                    errorText={lang.no_email_valid}
                    isAutoCapitalization={true}
                />
                <View style={styles.field_touch_btn}>
                    <TouchBtn
                        lang={lang.save_changes}
                        func={() => { }}
                        styleBtn={styles.btn_save_changes}
                        txtStyle={styles.txt_save_changes}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
export { EditProfile };