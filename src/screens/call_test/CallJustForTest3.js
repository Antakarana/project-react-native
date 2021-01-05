import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, TouchableHighlight, Text } from 'react-native';
import JsSIP from 'jssip';

JsSIP.debug.enable('JsSIP:*');

const CallJustForTest3 = () => {
	const [status, setStatus] = useState('disconnected')
	const [session, setSession] = useState()
	const _ua = useRef()

	useEffect(() => {
		console.log("begin")
		var socket = new JsSIP.WebSocketInterface('wss://academy.tegsoftcloud.com:8089/ws'); // FILL WSS SERVER

		var configuration = {
			sockets: [socket],
			'uri': 'sip:8898@academy.tegsoftcloud.com', // FILL SIP URI HERE like sip:sip-user@your-domain.bwapp.bwsip.io
			'password': 'tegsoft13598898', // FILL PASSWORD HERE,
			'username': '8898', // FILL USERNAME HERE
			'register': true
		};

		try {
			_ua.current = new JsSIP.UA(configuration)
		} catch (error) {
			console.log(error);
			return
		}

		_ua.current.on('connecting', () => {
			setStatus('connecting')
		});

		_ua.current.on('connected', () => {
			setStatus('connected')
		});

		_ua.current.on('disconnected', () => {
			setStatus('disconnected')
		});

		_ua.current.on('registered', () => {
			setStatus('registered')
			// call()
		});

		_ua.current.on('unregistered', () => {
			if (_ua.current.isConnected())
				setStatus('connected')
			else
				setStatus('disconnected')
		});

		_ua.current.on('registrationFailed', (data) => {
			if (_ua.current.isConnected())
				setStatus('connected')
			else
				setStatus('disconnected')

			console.log({
				level: 'error',
				title: 'Registration failed',
				message: data.cause
			});
		});

		_ua.current.on('newRTCSession', (data) => {
			if (data.originator === 'local')
				return;

			const session = data.session;

			// Avoid if busy or other incoming
			if (state.session || state.incomingSession) {
				console.log('incoming call replied with 486 "Busy Here"');

				session.terminate(
					{
						'status_code': 486,
						'reason_phrase': 'Busy Here'
					});

				return;
			}

			console.log('start ringing');
			console.log('setIncomingSession');
			// setIncomingSession(session)

			session.on('failed', (data) => {
				setSession(null)

				console.log(
					{
						level: 'error',
						title: 'Call failed',
						message: data.cause
					});
			});

			session.on('ended', () => {
				console.log('session ended');

				setSession(null)
			});

			session.on('accepted', () => {
				console.log('stop ringing');
				setSession(session)
			});
		});

		_ua.current.start();
	}, []);

	useEffect(() => {
		if (!session) {
			return
		}

		console.log('session begin');


		const peerconnection = session.connection;
		const localStream = peerconnection.getLocalStreams()[0];
		const remoteStream = peerconnection.getRemoteStreams()[0];

		// Handle local stream
		if (localStream) {
			// Clone local stream
			// this._localClonedStream = localStream.clone();

			// Display local stream
			// localVideo.srcObject = this._localClonedStream;

			// setTimeout(() =>
			// {
			// 	if (!this._mounted)
			// 		return;

			// 	if (localStream.getVideoTracks()[0])
			// 		this.setState({ localHasVideo: true });
			// }, 1000);
		}

		// If incoming all we already have the remote stream
		if (remoteStream) {
			console.log('already have a remote stream');

			_handleRemoteStream(remoteStream);
		}

		session.on('progress', (data) => {
			console.log('session "progress" event [data:%o]', data);
		});

		session.on('accepted', (data) => {
			console.log('session "accepted" event [data:%o]', data);

			if (session.direction === 'outgoing') {
				console.log(
					{
						level: 'success',
						title: 'Call answered'
					});
			}
		});

		session.on('failed', (data) => {
			console.log(
				{
					level: 'error',
					title: 'Call failed',
					message: `Cause: ${data.cause}`
				});
		});

		session.on('ended', (data) => {
			console.log('session "ended" event [data:%o]', data);

			console.log(
				{
					level: 'info',
					title: 'Call ended',
					message: `Cause: ${data.cause}`
				});
		});

		session.on('hold', (data) => {
			const originator = data.originator;

			console.log('session "hold" event [originator:%s]', originator);

			switch (originator) {
				case 'local':
					break;
				case 'remote':
					break;
			}
		});

		session.on('unhold', (data) => {
			const originator = data.originator;

			console.log('session "unhold" event [originator:%s]', originator);

			switch (originator) {
				case 'local':
					break;
				case 'remote':
					break;
			}
		});

		peerconnection.addEventListener('addstream', (event) => {
			console.log('peerconnection "addstream" event');

			_handleRemoteStream(event.stream);
		});
	}, [session])

	const _handleRemoteStream = (stream) => {
		console.log('_handleRemoteStream() [stream:%o]', stream);

		stream.addEventListener('addtrack', (event) => {
			const track = event.track;


			console.log('remote stream "addtrack" event [track:%o]', track);

			track.addEventListener('ended', () => {
				console.log('remote track "ended" event [track:%o]', track);
			});
		});

		stream.addEventListener('removetrack', () => {
			console.log('remote stream "removetrack" event');
		});
	}


	const call = () => {
		const session = _ua.current.call('5534664864',
			{
				mediaConstraints:
				{
					audio: true,
					video: false
				}
			});

		session.on('connecting', () => {
			setSession(session)
		});

		session.on('progress', () => {
			console.log('play ringback');
		});

		session.on('failed', (data) => {
			console.log('stop ringback');
			console.log('play rejected');
			setSession(null)

			console.log(
				{
					level: 'error',
					title: 'Call failed',
					message: data.cause
				});
		});

		session.on('ended', (data) => {
			console.log('ended');

			console.log('stop ringback');
			setSession(null);
			let seen = [];
			console.log(
				{
					level: 'error',
					title: 'Call failed',
					message: JSON.stringify(data, function (key, val) {
						if (val != null && typeof val == "object") {
							if (seen.indexOf(val) >= 0) {
								return;
							}
							seen.push(val);
						}
						return val
					})
				})
		});
		session.on('accepted', () => {
			console.log('accepted');

			console.log('stop ringback');
			console.log('play answered');
		});
	}

	return (
		<SafeAreaView>
			<Text>{status}</Text>

			<TouchableHighlight
				style={{
					backgroundColor: "#FFFFFF",
					padding: 20
				}}
				onPress={() => call()}>
				<Text>Call</Text>
			</TouchableHighlight>
		</SafeAreaView>
	)

}
export default CallJustForTest3;