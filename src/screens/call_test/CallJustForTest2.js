import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, TouchableHighlight, Text } from 'react-native';
import { Endpoint } from 'react-native-pjsip';

const CallJustForTest2 = () => {

	let endpoint = new Endpoint();

	const _get = async () => {
		let state = await endpoint.start(); // List of available accounts and calls when RN context is started, could not be empty because Background service is working on Android
		let { accounts, calls, settings, connectivity } = state;

	}
	const _makeCall = async () => {

		let options = {
			headers: {
				"P-Assserted-Identity": "Header example",
				"X-UA": "React native"
			}
		}

		let call = await endpoint.makeCall(account, destination, options);
		call.getId() // Use this id to detect changes and make actions

		endpoint.addListener("call_changed", (newCall) => {
			if (call.getId() === newCall.getId()) {
				// Our call changed, do smth.
			}
		})
		endpoint.addListener("call_terminated", (newCall) => {
			if (call.getId() === newCall.getId()) {
				// Our call terminated
			}
		})
	}

	useEffect(() => {
		_get();
		let configuration = {
			'domain': 'sip:8898@academy.tegsoftcloud.com', // FILL SIP URI HERE like sip:sip-user@your-domain.bwapp.bwsip.io
			'password': 'tegsoft13598898', // FILL PASSWORD HERE,
			'name': '8898', // FILL USERNAME HERE
			'register': true,
			"proxy": null,
			"transport": null, // Default TCP
			"regServer": null, // Default wildcard
			"regTimeout": null, // Default 3600
			"regHeaders": {
				"X-Custom-Header": "Value"
			},
			"regContactParams": ";unique-device-token-id=XXXXXXXXX"
		};
		endpoint.createAccount().then((account) => {
			console.log("Account created", account);
		});
	}, []);
	return (
		<SafeAreaView>
			<Text>Call ekranı</Text>
			<TouchableHighlight
				style={{
					backgroundColor: "#FFFFFF",
					padding: 20
				}}
				onPress={() => _makeCall()}>
				<Text>Call</Text>
			</TouchableHighlight>
		</SafeAreaView>)
}

export default CallJustForTest2;