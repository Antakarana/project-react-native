import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, StatusBar } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styles from './styles/MyCommentStyle';
import { ListItemSeparator, TouchBtn, Indicator } from '../../screens/common/common_components/index';
import { ServiceConnection_UserReview, ServiceConnection_DeleteReview } from '../../config/api/ApiFunctions';
import lang from '../../lang/Language';
import _ from 'lodash';
import images from '../../assets/img_paths/images';
import setFavouriteCompany from '../../redux/actions/favouriteCompany';
import { useDispatch, useSelector } from 'react-redux';

const MyComment = ({ navigation }) => {
    const { navigate } = useNavigation();
    let [reviews, setReviews] = useState([]);
    const [showIndicator, setShowIndicator] = useState(true);
    const [isShownModal, setIsShownModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(0);
    const companyInfoData = useSelector(companyInfoData => companyInfoData.companyInfo.companyInfo);

    useEffect(() => {
        _getReviews();
        companyInfoData.companyName && navigation.setParams({
            title: companyInfoData.companyName
        });
    }, []);

    _getReviews = async () => {
        const responseUserReviews = await ServiceConnection_UserReview();
        if (responseUserReviews.success) {
            const reviews = responseUserReviews.result.reviews.concat(responseUserReviews.result.reviews).concat(responseUserReviews.result.reviews)
            await setReviews(reviews);
            setShowIndicator(false);
        }
        else if (responseUserReviews == "unauthorization") {
            AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
            setShowIndicator(false);
            navigate("Login");
        }
    };
    _showDeleteModal = async (reviewId) => {
        await setIsShownModal(true);
        await setSelectedReviewId(reviewId);
    }
    _clickedNo = () => {
        setIsShownModal(false);
    }
    _clickedYes = async (reviewId) => {
        const responseDeleteReview = await ServiceConnection_DeleteReview(reviewId);
        if (responseDeleteReview.success) {
            await setIsDeleted(!isDeleted);
            setShowIndicator(false);
            setIsShownModal(false);
        }
        else if (responseDeleteReview == "unauthorization") {
            AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
            setIsShownModal(false);
            setShowIndicator(false);
            navigate("Login");
        }
        else setIsShownModal(false);
    }
    const modal_background_style = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    return (
        <SafeAreaView style={styles.field_my_comment}>
            <ScrollView>
                {showIndicator && <Indicator />}
                <View style={styles.field_list}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isShownModal}>
                        <View style={[styles.container, modal_background_style]}>
                            <View style={styles.field_modal}>
                                <Image source={images.icon_warning} style={styles.icon_rubbish_bin} resizeMode='contain' />
                                <Text style={styles.txt_review_desc}>{lang.are_you_sure_delete_comment}</Text>
                                <View style={styles.field_yes_no_txt}>
                                    <TouchableOpacity onPress={() => _clickedYes()} style={styles.btn_yes_no}>
                                        <Text style={styles.txt_yes}>{(lang.yes).toUpperCase()}</Text>
                                    </TouchableOpacity>
                                    <TouchBtn
                                        lang={(lang.no).toUpperCase()}
                                        func={() => _clickedNo()}
                                        styleBtn={styles.btn_yes_no}
                                        txtStyle={styles.txt_no}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {
                        _.size(reviews) > 0 ?
                            <View style={styles.shadow_flatlist}>
                                <FlatList
                                    data={reviews}
                                    scrollEnabled={false}
                                    extraData={isDeleted}
                                    ItemSeparatorComponent={ListItemSeparator}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <CommentItem item={item} index={index} />
                                    )} />
                            </View>
                            :
                            <View style={{ marginTop: 173 }}>
                                <Image style={styles.icon_empty_comment} resizeMode='contain'
                                    source={images.icon_no_company_comment} />
                                <Text style={styles.txt_empty_comment_desc} >{lang.empty_comment_desc}</Text>
                                <TouchBtn
                                    lang={lang.btn_touch}
                                    func={() => { }}
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

const CommentItem = ({ item }) => {
    const { navigate } = useNavigation();
    const [isClickedReadMore, setIsClickedReadMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(0);
    const [totalNumberOfLines, setTotalNumberOfLines] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true)
    const dispatch = useDispatch();

    const _onToggle = useCallback(
        () => {
            setIsOpen(isOpen => !isOpen);
        },
        [isOpen],
    );

    _setCompanyInfoDataAndNavigate = async () => {
        await dispatch(setFavouriteCompany(item));
        navigate("SendReview", { reviewData: item });
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
            <View style={styles.flex_direction_row}>
                <Image source={{ uri: item.company_img_path }} resizeMode='contain' style={styles.icon_company} />
                <View style={styles.flex_direction_column}>
                    <Text style={styles.txt_company_name}>{item.company_name}</Text>
                    <View style={styles.flex_direction_row}>
                        <Text style={styles.txt_rating}>{item.rating}</Text>
                        <Text style={styles.txt_score}>{lang.score}</Text>
                    </View>
                </View>
                {!isOpen ?
                    <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={_onToggle} style={styles.btn_icon_toggle}>
                        <Image source={images.icon_table_toggle} resizeMode='contain' style={styles.icon_toggle} />
                    </TouchableOpacity>
                    :
                    <View style={styles.field_open_toggle}>
                        <View style={styles.flex_direction_row}>
                            <TouchableOpacity onPress={() => _setCompanyInfoDataAndNavigate()}>
                                <Image source={images.icon_pencil_edit_button} style={styles.icon_toggle_pencil} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => _showDeleteModal(item.review_id)} style={styles.btn_clickable_field}>
                                <Image source={images.icon_rubbish_bin} style={styles.icon_toggle_rubbish_bin} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={_onToggle}>
                                <Image source={images.icon_toggle_close} style={styles.icon_toggle_close} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
            <View style={styles.field_bottom_of_comment}>
                <View style={styles.flex_direction_column}>
                    <Image source={images.icon_my_comment_balloon} resizeMode='contain' style={styles.icon_comment_balloon} />
                    <View style={styles.align_center}>
                        <Text style={styles.txt_by_who} >{item.by_who}</Text>
                        <Text style={styles.txt_review_date} >{item.review_date}</Text>
                    </View>
                </View>
                <View style={{
                    marginRight: 10,
                    flex: 1,
                    ...styles.flex_direction_column
                }} >
                    <Text
                        style={styles.txt_review}
                        numberOfLines={!isClickedReadMore ? 2 : undefined}
                        ellipsizeMode={'tail'}
                        onTextLayout={({ nativeEvent: { lines } }) => {
                            if (totalNumberOfLines < lines.length) {
                                setTotalNumberOfLines(lines.length)
                            }

                            setNumberOfLines(lines.length)
                            if (isFirstRender) {
                                setIsClickedReadMore(false)
                            }
                            setIsFirstRender(false)
                        }}>
                        {item.review}
                    </Text>
                    {
                        totalNumberOfLines > 2 && (
                            <TouchableOpacity style={styles.flex_direction_row}
                                onPress={() => setIsClickedReadMore(!isClickedReadMore)}>
                                <Text style={styles.txt_read_more}>{!isClickedReadMore ? lang.read_more : lang.read_less}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </>
    )
}

export { MyComment };