import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Image, Text } from 'react-native';
import styles from '../styles/LoginSignupStyle';
import images from '../../../assets/img_paths/images';
import { Input, Item } from 'native-base';
import lang from '../../../lang/Language';
import _ from 'lodash';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

const TxtInput = forwardRef((props, ref) => {
    const {
        iconPath,
        validation,
        errorText,
        value,
        isLowerCase,
        optional,
        ...rest
    } = props

    const [status, setStatus] = useState('notr')

    const isValid = (optional && !value) || _.isFunction(validation) ? validation() : validation

    useDidMountEffect(() => {
        _validate()
    }, [value])

    useImperativeHandle(ref, () => ({
        validate: () => {
            return _validate()
        }
    }));

    const _validate = () => {
        setStatus(isValid ? 'success' : 'error')

        return isValid
    }

    let inputStyle = styles.input
    switch (status) {
        case 'notr':
            inputStyle = styles.input
            break;
        case 'success':
            inputStyle = styles.input_success
            break;
        case 'error':
            inputStyle = styles.input_error
            break;
    }
    return (
        <>
            <Item style={styles.item}>
                <Image source={iconPath} style={styles.icon_input_login} resizeMode='contain' />
                <Input style={inputStyle} placeholderTextColor='#cccccc' {...rest}
                    selectionColor='#FA8736'
                    value={isLowerCase ? value.toLowerCase() : value}
                    autoCapitalize={props.isAutoCapitalization ? "none" : ""} />
                {
                    status !== 'notr' &&
                    <Image source={isValid ? images.icon_success : images.icon_error} style={styles.icon_success_error} />
                }
            </Item>
            {
                status !== 'notr' && !isValid &&
                <Text style={{ marginLeft: 22, color: '#F50400', fontSize: 11, fontFamily: 'Roboto-Bold' }}>{errorText}</Text>
            }
            {
                optional === true && status === 'notr' &&
                <Text style={styles.txt_optional}>{lang.optional}</Text>
            }
        </>
    )
})

export { TxtInput };