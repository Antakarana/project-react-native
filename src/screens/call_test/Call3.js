
//GENERAL FUNCTIONS
var incall = false;
var isRegistered = false;
var isInternetExplorer = false;

function softphoneScriptVersion() {
	return "1.6.5";
}

function getMessage(message) {
	try {
		return tegsoftLang.get(message);
	} catch (e) {
		loggingExceptionX("Locale Error message:" + message);
		return message;
	}
}

function fireZkOnClick(elementId) {
	try {
		zAu.send(new zk.Event(zk.Widget.$("$" + elementId), "onClick", null, {
			toServer : true
		}));
	} catch (e) {
		loggingExceptionX("Fire Error e: " + e.stack);
	}
}

function checkAgentStateColor() {
	fireZkOnClick("changeAgentColor");
	setTimeout(function() {
		fireZkOnClick("changeAgentColor");
	}, 2000);
	setTimeout(function() {
		fireZkOnClick("changeAgentColor");
	}, 4000);
}

function displayWebphoneEngineDetails(engineType, host, username) {
	try {
		if (isRegistered) {
			return;
		}
		var userAgent = navigator.userAgent.toUpperCase();
		var browserInformation = "";

		if (userAgent.indexOf("FIREFOX") > 0) {
			var informationBrowser = userAgent.substring(userAgent.indexOf("FIREFOX"));
			browserInformation = informationBrowser.split(" ")[0];
		} else if (userAgent.indexOf("CHROME") > 0) {
			var informationBrowser = userAgent.substring(userAgent.indexOf("CHROME"));
			browserInformation = informationBrowser.split(" ")[0];
		} else if (userAgent.indexOf("TRIDENT") > 0) {
			browserInformation = "Internet Explorer";
			isInternetExplorer = true;
		} else if (userAgent.indexOf("OPR") > 0) {
			var informationBrowser = userAgent.substring(userAgent.indexOf("OPR"));
			browserInformation = informationBrowser.split(" ")[0];
		} else if (userAgent.indexOf("SAFARI") > 0) {
			var informationBrowser = userAgent.substring(userAgent.indexOf("SAFARI"));
			browserInformation = informationBrowser.split(" ")[0];
		} else {
			browserInformation = "Browser version is undefined.";
			knownBrowser = false;
		}

		zk.Widget.$("$featureboxBrowser").setValue(browserInformation);

		zk.Widget.$("$informationExtId").setValue("Username:" + username);
		zk.Widget.$("$informationHOST").setValue("Server:" + host);
		zk.Widget.$("$featureBoxTYPE").setValue(engineType);

		if (userAgent.indexOf("WINDOWS") != -1) {
			zk.Widget.$("$featureBoxOS").setValue("Windows");
		} else if (userAgent.indexOf("LINUX") != -1) {
			zk.Widget.$("$featureBoxOS").setValue("Linux");
		} else {
			zk.Widget.$("$featureBoxOS").setValue("Mac");
		}
	} catch (e) {
		loggingExceptionX(e.stack);
	}
}

// JAVA FUNCTIONS
var applethandle = null;
var isWebphone = false;

function reRegisterWebphone(host, username, password) {
	if (isInCall()) {
		return;
	}

	isWebphone = true;

	displayWebphoneEngineDetails('Java', host, username);

	if (getSoftphone() == null) {
		setTimeout(function() {
			// debugLog(getMessage('webphone_error1'));
			// checkJavaInstalled();
			reRegisterWebphone(host, username, password);
		}, 10000);
		return;
	}

	try {
		getSoftphone().API_Register(host, username, password, username, username);
	} catch (e) {
		setTimeout(function() {
			// debugLog(getMessage('webphone_error2'));
			if (reregisterCount > 5) {
				// checkJavaInstalled();
				return;
			}
			reregisterCount = reregisterCount + 1;
			reRegisterWebphone(host, username, password);
		}, 5500);
	}
}

function isInCall() {
	if (isWebRTC) {
		if (activeRTCSession == null) {
			return false;
		}
		
		return true;
	}
	
	return incall; 
}

function isTransferActive() {
	if (isWebRTC) {
		if (transferRTCSession == null) {
			return false;
		}
		
		return true;
	}
	
	return transferActive; 
}

function getSoftphone() {
	return applethandle;
}

function setSoftphoneVariable() {
	if (applethandle != null) {
		if (applethandle.API_Register == undefined) {
			applethandle = null;
		}
	}

	if (applethandle == null) {
		try {
			applethandle = document.getElementById('webphone');
		} catch (e) {
			loggingExceptionX(e.stack);
		}
		if (applethandle == null) {
			try {
				applethandle = document.getElementByName('webphone');
			} catch (e) {
				loggingExceptionX(e.stack);
			}
		}
		if (applethandle == null) {
			var applets = null;
			try {
				applets = document.applets;

				// Needed for FireFox
				if (applets.length == 0) {
					applets = document.getElementsByTagName("object");
				}
				if (applets.length == 0) {
					applets = document.getElementsByTagName("applet");
				}

				for (var i = 0; i < applets.length; ++i) {
					try {
						if (typeof (applets[i].API_Call) != "undefined") {
							applethandle = applets[i];
							break;
						}
					} catch (e) {
						loggingExceptionX(e.stack);
					}
				}
			} catch (e) {
				loggingExceptionX(e.stack);
			}

			if (applethandle == null)
				try {
					applethandle = document.applets[0];
				} catch (e) {
					loggingExceptionX(e.stack);
				}
		}

		if (applethandle != null) {
			// See if we're using the old Java Plug-In and the
			// JNLPAppletLauncher
			try {
				applethandle = applethandle.getSubApplet();
			} catch (e) {
				loggingExceptionX(e.stack);
				// Using new-style applet -- ignore
			}
		}
	}
	return applethandle;
}

function checkJavaInstalled() {
}

// WebphoneNS FUNCTIONS
var isWebphoneNS = false;
var isWebphoneNSstarted = false;

function reRegisterWebphoneNS(host, username, password) {
	if (incall) {
		return;
	}
	displayWebphoneEngineDetails('NSPlugin', host, username);
	isWebphoneNS = true;

	if (isRegistered) {
		return;
	}

	if (isWebphoneNSstarted) {
		return;
	}

	zk.Widget.$("$webphone_api").setSrc('../forms/TegsoftTelecom/webRTCPhone/webphone_api.js');
	zk.Widget.$("$stringres").setSrc('../forms/TegsoftTelecom/webRTCPhone/js/lib/stringres.js');

	var rtcPriority = 0;
	var nsPriority = 5;
	var javaPriority = 0;

	setTimeout(function() {
		try {
			webphone_api.onRegistered(function() {
				registered();
			});

			var loadedEvent = function() {
				setParameterWebphone(host, username, password, rtcPriority, nsPriority, javaPriority);
				console.log("On Loaded");

				webphone_api.start();
				isWebphoneNSstarted = true;
				webphone_api.register();
				hideWebphoneLoadingComponent();
			};

			webphone_api.onEvents(function(evt) {
				try {
					webphonetojsY(evt);
				} catch (e) {
					loggingExceptionX("Event Exception: " + evt);
				}
			});

			if (webphone_api.webphone_loaded) {
				loadedEvent();
				return;
			}

			webphone_api.onLoaded(loadedEvent);
		} catch (e) {
			// Webphone_api not loaded waiting
			loadWebPhoneJs(host, username, password, engineType);
			loggingExceptionX(e.stack);
		}
	}, 1000);
}

function setParameterWebphone(host, username, password, rtcPriority, nsPriority, javaPriority) {
	webphone_api.setparameter('enginepriority_webrtc', rtcPriority);
	webphone_api.setparameter('enginepriority_java', javaPriority);
	webphone_api.setparameter('enginepriority_ns', nsPriority);
	webphone_api.setparameter('enginepriority_flash', 0);
	webphone_api.setparameter('enginepriority_app', 0);
	webphone_api.setparameter('enginepriority_p2p', 0);
	webphone_api.setparameter('enginepriority_accessnum', 0);
	webphone_api.setparameter('enginepriority_nativedial', 0);

	webphone_api.setparameter('name', "webphone");
	webphone_api.setparameter('JAVA_CODEBASE', ".");
	webphone_api.setparameter('MAYSCRIPT', true);
	webphone_api.setparameter('mayscript', "yes");
	webphone_api.setparameter('scriptable', true);
	webphone_api.setparameter('autocfgsave', true);
	webphone_api.setparameter('mustconnect', true);
	webphone_api.setparameter('jsscriptevent', 2);
	webphone_api.setparameter('voicemail', 0);
	webphone_api.setparameter('rejectonbusy', true);
	webphone_api.setparameter('maxlines', 4);

	webphone_api.setparameter('serveraddress', host);
	webphone_api.setparameter('username', username);
	webphone_api.setparameter('password', password);
	webphone_api.setparameter('webrtcserveraddress', "wss://" + host + "/wss");

	webphone_api.setparameter('loglevel', 1);
	webphone_api.setparameter('registerival', 30000);
	webphone_api.setparameter('hasconnect', false);
	webphone_api.setparameter('hascall', 0);
	webphone_api.setparameter('hasconference', false);
	webphone_api.setparameter('haschat', 0);
	webphone_api.setparameter('hasmute', true);
	webphone_api.setparameter('hasredial', true);
	webphone_api.setparameter('hasaudio', true);
	webphone_api.setparameter('hasincomingcall', true);
	webphone_api.setparameter('haschat', 0);
	webphone_api.setparameter('register', true);
	webphone_api.setparameter('call', false);
	webphone_api.setparameter('compact', false);
	webphone_api.setparameter('multilinegui', true);
	// webphone_api.setparameter('language', "en");
	webphone_api.setparameter('hasvolume', 3);
	webphone_api.setparameter('displaysipusername', false);
	webphone_api.setparameter('displaydisplayname', false);
	webphone_api.setparameter('hideusernamepwdinput', true);
	webphone_api.setparameter('earlymedia', 3);
	webphone_api.setparameter('changesptoring', 0);

	webphone_api.setparameter('ringincall', 2);

	webphone_api.setparameter('agc', 0);
	webphone_api.setparameter('aec', 0);
	webphone_api.setparameter('denoise', 0);
	webphone_api.setparameter('permissions', "all-permissions");

	webphone_api.setparameter('transfertype', 1);
	webphone_api.setparameter('transfwithreplace', -1);
	webphone_api.setparameter('disconincomingrefer', 1);
	webphone_api.setparameter('discontransfer', -1);

	webphone_api.setparameter('autohold', 2);
	webphone_api.setparameter('sendrtponmuted', true);

	webphone_api.setparameter('beeponconnect', 1);
	webphone_api.setparameter('beeptype ', 4);
	webphone_api.setparameter('denoise', 0);

	webphone_api.setparameter('use_pcma', 2);
	webphone_api.setparameter('use_pcmu', 2);
	webphone_api.setparameter('use_g729', 2);
	webphone_api.setparameter('use_gsm', 0);
	webphone_api.setparameter('use_ilbc', 0);
	webphone_api.setparameter('use_speex', 0);
	webphone_api.setparameter('use_speexwb', 0);
	webphone_api.setparameter('use_speexuwb', 0);
	webphone_api.setparameter('autostart', false);
}

function hideWebphoneLoadingComponent() {
	try {
		document.getElementsByClassName('ui-loader ui-corner-all ui-body-a ui-loader-default')[0].hidden = true;
	} catch (e) {
		// loggingExceptionX(e.stack);
	}
}

function downloadNSPlugin() {
	zk.Widget.$('$browserCheckInstalledNsPlugin2').setVisible(true);
	var host = window.location.origin;
	window.open(host + "/Tobe/forms/TegsoftTelecom/webRTCPhone/native/WebPhoneService_Install.exe");
	setTimeout(function() {
		if (zk.Widget.$("$browserCheckInstalledNsPlugin2").isVisible()) {
			zul.wgt.Notification.show('If The Plugin was installed, Click Here', null, {
				ref : zk.Widget.$("$buttonRetryForNsPlugin"),
				pos : 'end_before',
				off : 0,
				dur : 10000,
				type : 'info',
				closable : true
			});
		}
	}, 1000);
}

// WebphoneNS FUNCTIONS
var isWebRTC = false;
var remoteAudio = document.createElement('audio');
var webrtcPhone = null;
var activeRTCSession = null;
var transferRTCSession = null;
var dtmfSender = null;
var answerOptions = {
	'mediaConstraints' : {
		'audio' : true,
		'video' : false
	}
};
var dialOptions = {
	'eventHandlers' : eventHandlers,
	'mediaConstraints' : {
		'audio' : true,
		'video' : false
	}
};
var eventHandlers = {
	'progress' : function(e) {
		console.log('TEGSOFT LOG call is in progress');
	},

	'failed' : function(e) {
		console.log('TEGSOFT LOG call failed with cause: ' + e.data);
	},
	'ended' : function(e) {
		console.log('TEGSOFT LOG call ended with cause: ' + e.data);
	},
	'confirmed' : function(e) {
		console.log('TEGSOFT LOG call confirmed');
	}
};

function reRegisterWebRTC(host, username, pass) {
	if (isInCall()) {
		return;
	}

	if (isWebRTC) {
		return;
	}
	
	isWebRTC = true;

	displayWebphoneEngineDetails('WebRTC', host, username);

	var socketAddress = 'wss://' + host + ":8089/ws";
	var socket = new JsSIP.WebSocketInterface(socketAddress);
	var configuration = {
		sockets : [ socket ],
		uri : 'sip:' + username + '@' + host,
		password : pass,
		authorization_user : username,
		realm : 'tegsoftcloud.com',
		contact_uri : 'sip:' + username + '@' + host,
		register : true,
		user_agent : 'TegsoftWebRTC-Client-3.3.6',
		no_answer_timeout : 40
	};

	webrtcPhone = new JsSIP.UA(configuration);

	webrtcPhone.on('registered', function(e) {
		registered();
	});
	webrtcPhone.on('unregistered', function(e) {
		console.log('TEGSOFT LOG unregistered: ' + e.data);
	});
	webrtcPhone.on('registrationFailed', function(e) {
		console.log('TEGSOFT LOG registrationFailed: ' + e.data);
	});

	webrtcPhone.on('newRTCSession', function(e) {
		if (e.session.direction == "incoming") {
			playBeepSoundWebRTC();
		}
		
		if(activeRTCSession == null) {
			activeRTCSession = e.session;
		} else if (e.session.direction == "incoming") {
			activeRTCSession = e.session;
		} else {
			transferRTCSession = e.session;
		}
		
		e.session.on("confirmed", function() {
			console.log('TEGSOFT LOG call confirmed');
			// the call has connected, and audio is playing
			var localStream = activeRTCSession.connection.getLocalStreams()[0];
			dtmfSender = activeRTCSession.connection.createDTMFSender(localStream.getAudioTracks()[0])
		});
		e.session.on("ended", function(e) {
			if(transferRTCSession != null) {
				if(activeRTCSession.isEnded()) {
					transferRTCSession.terminate();
					setLastMessage(e);
					callFinished();
					stopBeepSoundWebRTC();
					return;
				} else {
					transferRTCSession = null;
					setTransferActive(false);
					setLastMessage(e);
					stopBeepSoundWebRTC();
					return;
				}
			}
			setLastMessage(e);
			callFinished();
			stopBeepSoundWebRTC();
			console.log('TEGSOFT LOG call ended');
		});
		e.session.on("failed", function(e) {
			console.log('TEGSOFT LOG call failed');
			
			if(transferRTCSession != null) {
				transferRTCSession = null;
				setTransferActive(false);
				setLastMessage(e);
				return;
			} 
			setTransferActive(false);
			setLastMessage(e);
			callFinished();
			stopBeepSoundWebRTC();
		});

		if (e.session.direction == "incoming") {
			e.session.on('peerconnection', function(data) {
				data.peerconnection.addEventListener('addstream', function(var1) {
					remoteAudio.srcObject = var1.stream;
					stopBeepSoundWebRTC();
					remoteAudio.play();
				});
			});

			var callerId = e.session.remote_identity.uri.user;
			
			if (!(typeof e === "undefined")) {
				if (!(typeof e.request === "undefined")) {
					if (!(typeof e.request.data === "undefined")) {
						if(e.request.data.includes("answer-after")) {
							setTimeout(function() {
								stopBeepSoundWebRTC();
								e.session.answer(answerOptions);
							}, 500);
							return;
						}
					}
				}
			}			

			if ((callerId == "859995") || (callerId == "859996") || (callerId == "859997") || (callerId == "859998") || (callerId == "859999") || (callerId == "860012")) {
				setTimeout(function() {
					stopBeepSoundWebRTC();
					e.session.answer(answerOptions);
				}, 500);
				return;
			}

			if (callerId != "859999") {
				zk.Widget.$("$phoneNumber").setValue(callerId);
			}

			if (callerId != "859999") {
				// For Incoming
				showIncomingCallWindow(true, callerId);
				if (zk.Widget.$("$phoneNumber").isVisible()) {
					if (e.session.remote_identity.display_name != null) {
						document.getElementById('nR4Q_n2').textContent = callerId + ' - ' + e.session.remote_identity.display_name;
					} else {
						document.getElementById('nR4Q_n2').textContent = callerId;
					}
				}
			}
		} else {
			e.session.connection.addEventListener('addstream', function(e) {
				remoteAudio.srcObject = e.stream;
				stopBeepSoundWebRTC();
				remoteAudio.play();
			});
		}
	});

	setInterval(function() {
		updateCallStatusLabel();
	}, 1000);

	webrtcPhone.start();
}

function setLastMessage(data) {
	lastMessage = "";

	if (data == null) {
		return;
	}

	if (data == undefined) {
		return;
	}

	if (data.cause == null) {
		return;
	}

	if (data.cause == undefined) {
		return;
	}

	if (data.cause === JsSIP.C.causes.BUSY) {
		lastMessage = getMessage('message_lastMessage05');
		displayNotice = true;
	} else if (data.cause === JsSIP.C.causes.BYE) {
		lastMessage = getMessage('message_lastMessage06');
	} else if (data.cause === JsSIP.C.causes.REJECTED) {
		lastMessage = getMessage('message_lastMessage07');
		displayNotice = true;
	} else if (data.cause === JsSIP.C.causes.CANCELED) {
		lastMessage = getMessage('message_lastMessage08');
		displayNotice = true;
	} else if (data.cause === JsSIP.C.causes.REDIRECTED) {
		lastMessage = getMessage('message_lastMessage09');
		displayNotice = true;
	} else if (data.cause === JsSIP.C.causes.NO_ANSWER) {
		lastMessage = getMessage('message_lastMessage09');
		displayNotice = true;
	} else {
		lastMessage = data.cause;
		displayNotice = true;
	}
}

function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100), seconds = parseInt((duration / 1000) % 60), minutes = parseInt((duration / (1000 * 60)) % 60), hours = parseInt((duration / (1000 * 60 * 60)) % 24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
}

function updateCallStatusLabel() {
	if (activeRTCSession == null) {
		return;
	}

	if (activeRTCSession.start_time == null) {
		if(activeRTCSession.isInProgress()) {
			zk.Widget.$("$callStatus").setValue(getMessage('message_lastmessage02'));
		} else {
			zk.Widget.$("$callStatus").setValue(getMessage('message_lastmessage04'));
		}
		return;
	}

	duration = "(" + msToTime(new Date().getTime() - activeRTCSession.start_time.getTime()) + ")";

	var speaking = getMessage('message_lastmessage10');
	if (ismuted) {
		zk.Widget.$("$agentExtensionBar").setStyle("background-color: #f1c40f;");
		zk.Widget.$("$callStatus").setValue(getMessage('message_lastMessage03') + " " + duration);
	} else if (isOnHold) {
		zk.Widget.$("$agentExtensionBar").setStyle("background-color: #f1c40f;");
		zk.Widget.$("$callStatus").setValue("Hold" + " " + duration);
	} else {
		zk.Widget.$("$callStatus").setValue(speaking + " " + duration);
	}
}

// Event Handlers
function callFinished() {
	zk.Widget.$("$callStatus").setValue(getMessage('message_lastMessage01') + lastMessage);
	zk.Widget.$("$phoneNumber").setValue("");
	showIncomingCallWindow(false, "");
	unmute();
	beepPlayed = false;
	isOnHold = false;
	incall = false;
	isSpeaking = false;
	activeRTCSession = null;
	
	transferRTCSession = null;
	setTransferActive(false);
	
	dtmfSender = null;
	checkAgentStateColor();

	if (isWebphone) {
		getSoftphone().API_SetParameter("earlymedia", 3);
	}

	if (isWebphoneNS) {
		webphone_api.setparameter("earlymedia", 3);
	}
}

var activeElementPre = undefined;

function showIncomingCallWindow(display, callerId) {
	if (!display) {
		document.getElementById('callWindow').style.display = "none";
		if (activeElementPre != undefined) {
			activeElementPre.focus();
		}
		if (notification != undefined) {
			notification.close();
			notification = undefined;
		}
		return;
	}

	setTimeout(function() {
		notifyMe("Incoming Call", callerId);
	}, 300);
	activeElementPre = document.activeElement;
	document.getElementById('callWindow').style.display = "";
	var acceptComponent = document.getElementById('acceptCallComponent');
	acceptComponent.focus();
	if (isInternetExplorer) {
		acceptComponent.focus();
		acceptComponent.focus();
		acceptComponent.focus();
		acceptComponent.focus();
		acceptComponent.focus();
		setTimeout(function() {
			acceptComponent.focus();
		}, 2000);
	}
}

var ismuted = false;

function unmute() {
	try {
		ismuted = false;
		if (isWebRTC) {
			if (activeRTCSession == null) {
				return;
			}

			if (activeRTCSession.isMuted().audio) {
				activeRTCSession.unmute({
					audio : true
				});
			}
			return;
		}

		if (isWebphone) {
			getSoftphone().API_MuteEx(getSoftphone().API_GetLine(), false, 2);
			return;
		}

		if (isWebphoneNS) {
			webphone_api.mute(false, 2);
			return;
		}
	} catch (e) {
		loggingExceptionX(e.stack);
	}
}

function mute() {
	try {
		ismuted = true;

		if (isWebRTC) {
			if (activeRTCSession == null) {
				return;
			}

			if (!activeRTCSession.isMuted().audio) {
				activeRTCSession.mute({
					audio : true
				});
			}
			return;
		}

		if (isWebphone) {
			getSoftphone().API_MuteEx(getSoftphone().API_GetLine(), true, 2);
			return;
		}

		if (isWebphoneNS) {
			webphone_api.mute(true, 2);
			return;
		}
	} catch (e) {
		loggingExceptionX(e.stack);
	}
}

function muteEx() {
	if (!ismuted) {
		mute();
		zk.Widget.$("$muteComponenet").setSrc(themePath + '/webphone/tegsoft_phone_mute_hover.png')
		zk.Widget.$("$muteComponenet").setHover(themePath + '/webphone/tegsoft_phone_mute.png')
		zk.Widget.$("$agentExtensionBar").setStyle("background-color: #f1c40f;");
	} else {
		unmute();
		zk.Widget.$("$muteComponenet").setSrc(themePath + '/webphone/tegsoft_phone_mute.png')
		zk.Widget.$("$muteComponenet").setHover(themePath + '/webphone/tegsoft_phone_mute_hover.png')
		checkAgentStateColor();
	}
}

function registered() {
	try {
		debugLog(getMessage('message_register01'));

		if (isRegistered) {
			debugLog(getMessage('message_register02'));
			return;
		}

		// if(!isWebRTC) {
		// applethandle = null;
		// ismuted = false;
		// incall = false;
		// }

		debugLog(getMessage('message_register03'));

		document.getElementById('callWindow').innerHTML = getCallComponent();

		if (isWebRTC) {
			debugLog("WebRTC Phone Version : " + JsSIP.version);
			debugLog("Webphone License State : " + "Active");
			debugLog("Script version: " + softphoneScriptVersion());
		} else if (isWebphone) {
			debugLog("Webphone Version : " + getSoftphone().API_GetVersion());
			debugLog("Webphone License State : " + getSoftphone().API_HasLicenseLimit());
			debugLog("Script version: " + softphoneScriptVersion());
		} else if (isWebphoneNS) {
			debugLog("WebphoneNS Version : ");
			debugLog("Webphone License State : ");
			debugLog("Script version: " + softphoneScriptVersion());
		}

		zk.Widget.$("$softphoneWindowWait").setVisible(false);
		zk.Widget.$("$noWebphone0").setVisible(false);
		zk.Widget.$("$noWebphone1").setVisible(false);

		zk.Widget.$("$webphone0").setVisible(true);
		zk.Widget.$("$webphone1").setVisible(true);
		zk.Widget.$("$webphone2").setVisible(true);
		zk.Widget.$("$webphone3").setVisible(true);
		zk.Widget.$("$webphone4").setVisible(true);

		debugLog(getMessage('message_register04'));

		zk.Widget.$("$agentExtensionBar").setStyle("background-color: #FF8000;");
		hideWebphoneLoadingComponent();
		initSpeakerMicrophoneVolume();
		checkAgentStateColor();
		isRegistered = true;

	} catch (e) {
		loggingExceptionX("Registered Failed ReTry!! Exception: " + e.stack);
	}
}

var speakerVolume = 50;
var microphonevolume = 50;

function initSpeakerMicrophoneVolume() {
	cookieSpeakerVolume = getCookie("cookieSpeakerVolume");
	if (cookieSpeakerVolume == "") {
		speakerVolume = 50;
		return;
	}

	speakerVolume = cookieSpeakerVolume;

	cookieMicrophoneVolume = getCookie("cookieMicrophoneVolume");
	if (cookieMicrophoneVolume == "") {
		microphonevolume = 50;
		return;
	}

	microphonevolume = cookieMicrophoneVolume;

	setSpeakerVolume();
	setMicrophoneVolume();
}

function setSpeakerVolume() {
	zk.Widget.$("$speakerProgress0").setSrc(themePath + "/webphone/speaker-" + speakerVolume + ".png");

	if (isWebRTC) {
		remoteAudio.value = speakerVolume / 100;
	} else if (isWebphone) {
		getSoftphone().API_SetVolume(1, speakerVolume);
	} else if (isWebphoneNS) {
		webphone_api.setvolume(1, speakerVolume);
	}
}

function setMicrophoneVolume() {
	zk.Widget.$("$speakerProgress1").setSrc(themePath + "/webphone/microphone-" + microphonevolume + ".png");
	if (isWebRTC) {
	} else if (isWebphone) {
		getSoftphone().API_SetVolume(0, microphonevolume);
	} else if (isWebphoneNS) {
		webphone_api.setvolume(0, microphonevolume);
	}
}

function increaseSpeakerVolume() {
	speakerVolume += 25;
	if (speakerVolume > 100) {
		speakerVolume = 0;
	}

	setCookie("cookieSpeakerVolume", speakerVolume, 10);
	setSpeakerVolume();
}

function increaseMicrophoneVolume() {
	microphonevolume += 25;
	if (microphonevolume > 100) {
		microphonevolume = 0;
	}
	setCookie("cookieMicrophoneVolume", microphonevolume, 10);
	setMicrophoneVolume();
}

function sendDTMF(dtmf) {
	if (isWebRTC) {
		if (dtmfSender != null) {
			dtmfSender.insertDTMF(dtmf);
		}
	} else if (isWebphone) {
		getSoftphone().API_Dtmf(getSoftphone().API_GetLine(), dtmf);
	} else if (isWebphoneNS) {
		webphone_api.dtmf(dtmf);
	}

	zk.Widget.$("$DialNumber").setText(zk.Widget.$("$DialNumber").getText() + dtmf);
	zk.Widget.$("$DialNumber").focus();
}

var attendedTransferFailed = false;
var transferActive = false;
var isOnHold = false;

function holdCall() {
	if (isWebRTC) {
		if (activeRTCSession == null) {
			return;
		}
		
		if (isTransferActive()) {
			if(activeRTCSession.isOnHold().local) {
				transferRTCSession.hold();
				activeRTCSession.unhold();
				
				var activeLine = zk.Widget.$("$activeLine");
				if (activeLine != null) {
					if (typeof activeLine != 'undefined') {
						activeLine.setValue("1");
					}
				}
			} else {
				transferRTCSession.unhold();
				activeRTCSession.hold();
				
				var activeLine = zk.Widget.$("$activeLine");
				if (activeLine != null) {
					if (typeof activeLine != 'undefined') {
						activeLine.setValue("2");
					}
				}
			}
			isOnHold = false;
		} else {
			if (activeRTCSession.isOnHold().local) {
				activeRTCSession.unhold();
				isOnHold = false;
			} else {
				activeRTCSession.hold();
				isOnHold = true;
			}
		}
		checkAgentStateColor();
		return;
	} else if (isWebphone) {
		if (getSoftphone().API_IsOnHold(1) != '0') {
			isOnHold = false;
			checkAgentStateColor();
		} else {
			if (incall && !transferActive) {
				zk.Widget.$("$agentExtensionBar").setStyle("background-color: #f1c40f;");
				isOnHold = true;
			}
		}
		
		getSoftphone().API_Hold(getSoftphone().API_GetLine(), isOnHold);
		getSoftphone().API_Hold(getSoftphone().API_GetLine(), isOnHold);
		getSoftphone().API_Hold(1, isOnHold);
		getSoftphone().API_Hold(1, isOnHold);
		getSoftphone().API_Hold(getSoftphone().API_GetLine(), isOnHold);
	} else if (isWebphoneNS) {
		if (transferActive) {
			changeActiveLine(webphone_api.getline());
			return;
		}

		if (webphone_api.isonhold()) {
			checkAgentStateColor();
			webphone_api.hold(false);
			isOnHold = false;
		} else {
			if (incall) {
				zk.Widget.$("$agentExtensionBar").setStyle("background-color: #f1c40f;");
				isOnHold = true;
			}
			webphone_api.hold(true);
		}
	}
}

function prepareDialNumber() {
	var numberToDial = zk.Widget.$("$DialNumber").getText();
	if (numberToDial == null) {
		return;
	}
	if (numberToDial == '') {
		return;
	}

	numberToDial = replaceAll(numberToDial, "-", "");
	numberToDial = replaceAll(numberToDial, " ", "");
	numberToDial = replaceAll(numberToDial, "\\%2520", "");
	numberToDial = replaceAll(numberToDial, "\\(", "");
	numberToDial = replaceAll(numberToDial, "\\)", "");
	numberToDial = replaceAll(numberToDial, "\\+", "00");
	zk.Widget.$("$DialNumber").setText(numberToDial);
}

function answerCall() {
	showIncomingCallWindow(false, "");

	var answered = false;
	if (isWebRTC) {
		if (activeRTCSession != null) {
			if (activeRTCSession.direction == "incoming") {
				if (activeRTCSession.start_time == null) {
					activeRTCSession.answer(answerOptions);
					answered = true;
				}
			}
		}
	} else if (isWebphone) {
		if (incall) {
			answered = getSoftphone().API_Accept(1);
		}
	} else if (isWebphoneNS) {
		if (incall) {
			answered = webphone_api.accept();
		}
	}

	if (answered) {
		return;
	}

	prepareDialNumber();
	var numberToDial = zk.Widget.$("$DialNumber").getText();
	if (numberToDial == null) {
		return;
	}

	if (numberToDial == '') {
		return;
	}

	if (!isInCall()) {
		beepPlayed = true;
		
		var profileSelectionActive = zk.Widget.$("$profileSelectionActive").getValue();
		if(profileSelectionActive == 'True') {
			fireZkOnClick("profileSelectionActive");
			return;
		}

		if (isWebRTC) {
			webrtcPhone.call(numberToDial, dialOptions);
		} else if (isWebphone) {
			getSoftphone().API_SetParameter("earlymedia", 5);
			getSoftphone().API_Call(1, numberToDial);
		} else if (isWebphoneNS) {
			webphone_api.setparameter("earlymedia", 5);
			webphone_api.call(numberToDial);
		}
	} else {
		transferUnattended();
	}
}

function hangupCall() {
	if (!isInCall()) {
		debugLog("NOT IN A CALL");
		fireZkOnClick("noWebphoneHangupButton");
		return;
	}
	if (!hangupPermission && isIncomingCall) {
		if (!isSpeaking) {
			loggingX("Agent has not reject permission! Please contact your administrator. ");
			notifyUserNotification("Agent has not reject permission! Please contact your administrator ");
			return;
		}
	}
	showIncomingCallWindow(false, "");

	if (isWebRTC) {
		if (isTransferActive()) {
			transferAttendedCancel();
			return;
		} 
		webrtcPhone.terminateSessions();
	} else if (isWebphone) {
		getSoftphone().API_Hangup(-2);
	} else if (isWebphoneNS) {
		webphone_api.setline(-2);
		webphone_api.hangup();
	}
	setTransferActive(false);
	fireZkOnClick("noWebphoneHangupButton");
}

function playBeepSoundWebRTC() {
	zk.Widget.$("$audioBeep").play();
}

function stopBeepSoundWebRTC() {
	zk.Widget.$("$audioBeep").pause();
	zk.Widget.$("$audioBeep").currentTime = 0;
}


// operation

var isIncomingCall = false;
var lastMessage = "";

var isSpeaking = false;

// Type of WebPhone
var isRtc = false;

// Beep and Volume peration
var beepRequired = true;
var beepPlayed = false;
var transferCompetedForBeep = false;

// Gui operation
var hideDownloadLink = false;

// State operation
var handleJavaFeatures = false;
var hangupPermission = true;

// Counter
var reregisterCount = 0;

var notification = undefined;

// /Html Componenet Pop-Up Call

var themePath = "/Tobe/image/themes/default";

// ----------regLOADING FUNCTION

// ------------------------------regREGISTERFUNCTIONS

// ////-------------------------------------------regCALLPROCESSSFUNCTIONS
function playBeepSound() {
	if (transferCompetedForBeep) {
		transferCompetedForBeep = false;
		return;
	}

	if (!beepPlayed) {
		if (beepRequired) {
			showIncomingCallWindow(false, "");
			zk.Widget.$("$audioBeep").play();
		} else {
			beepRequired = true;
		}
		beepPlayed = true;
	}
}

function setTransferActive(active) {
	zk.Widget.$("$transferActive").setVisible(active);
	transferActive = active;
	if(!active) {
		var activeLine = zk.Widget.$("$activeLine");
		if (activeLine != null) {
			if (typeof activeLine != 'undefined') {
				activeLine.setValue("2");
			}
		}
	}
}

function transferUnattended() {
	var numberToDial = zk.Widget.$("$DialNumber").getText();
	if (numberToDial == null) {
		return;
	}
	if (numberToDial == '') {
		return;
	}

	if (isWebRTC) {
		if (activeRTCSession != null) {
			activeRTCSession.refer(numberToDial);
			callFinished();
		}
	} else if (isWebphone) {
		getSoftphone().API_SetParameter('transfertype', '1');
		getSoftphone().API_Transfer(1, numberToDial);
	} else if (isWebphoneNS) {
		webphone_api.parameters['transfertype'] = 1;
		webphone_api.transfer(numberToDial);
	}

	zk.Widget.$("$DialNumber").setText("");
}

function transferAttended() {
	var numberToDial = zk.Widget.$("$DialNumber").getText();
	if (numberToDial == null) {
		return;
	}
	if (numberToDial == '') {
		debugLog("NO NUMBER TO DIAL");
		return;
	}

	if (!isInCall()) {
		debugLog("NOT IN A CALL");
		return;
	}
	
	if (isWebRTC) {
		if (isTransferActive()) {
			if(activeRTCSession.isOnHold().local) {
				transferRTCSession.hold();
				activeRTCSession.unhold();
				
				var activeLine = zk.Widget.$("$activeLine");
				if (activeLine != null) {
					if (typeof activeLine != 'undefined') {
						activeLine.setValue("1");
					}
				}
			} else {
				transferRTCSession.unhold();
				activeRTCSession.hold();
				
				var activeLine = zk.Widget.$("$activeLine");
				if (activeLine != null) {
					if (typeof activeLine != 'undefined') {
						activeLine.setValue("2");
					}
				}
			}
		} else {
			activeRTCSession.hold();
			webrtcPhone.call(numberToDial, dialOptions);
			setTransferActive(true);
			var activeLine = zk.Widget.$("$activeLine");
			if (activeLine != null) {
				if (typeof activeLine != 'undefined') {
					activeLine.setValue("2");
				}
			}
		}
		return;
	}
	
	var activeLine = -2;
	if (isActiveWebPhoneJs()) {
		activeLine = webphone_api.getline();
	} else {
		activeLine = getSoftphone().API_GetLine();
	}

	if (!isTransferActive()) {
		// Start the second call
		attendedTransferFailed = false;
		if (activeLine == 1) {
			if (isActiveWebPhoneJs()) {
				// webphone_api.setline(2);
				webphone_api.call(numberToDial);
			} else {
				getSoftphone().API_Call(2, numberToDial);
			}
			setTimeout(function() {
				setTransferActive(true);
				if (attendedTransferFailed) {
					setTransferActive(false);
					if (isActiveWebPhoneJs()) {
						webphone_api.setline(1);
						webphone_api.hold(false);
					} else {
						getSoftphone().API_SetLine(1);
						getSoftphone().API_Hold(1, false);
					}
					isOnHold = false;
					checkAgentStateColor();
				}
			}, 1500);
		} else {
			if (isWebRTC) {

			} else if (isWebphone) {
				getSoftphone().API_SetLine(1);
			} else if (isWebphoneNS) {
				webphone_api.setline(1);
			}
		}
		return;
	}

	if (isWebRTC) {

	} else if (isWebphone) {
		holdCall();
	} else if (isWebphoneNS) {
		changeActiveLine(activeLine);
	}
}

function changeActiveLine(activeLine) {
	if (isWebRTC) {
		if (!isTransferActive()) {
			return;
		}
		
		if (activeLine == 1) {
			transferRTCSession.hold();
			activeRTCSession.unhold();
		} else {
			transferRTCSession.unhold();
			activeRTCSession.hold();
		}
		return;
	}
	
	if (activeLine == 1) {
		webphone_api.setline(1);
		webphone_api.hold(true);
		setTimeout(function() {
			webphone_api.setline(2);
			webphone_api.hold(false);
			isOnHold = false;
			checkAgentStateColor();
		}, 500);
	} else {
		webphone_api.setline(2);
		webphone_api.hold(true);
		setTimeout(function() {
			webphone_api.setline(1);
			webphone_api.hold(false);
			isOnHold = false;
			checkAgentStateColor();
		}, 500);
	}
}

function transferAttendedCancel() {
	if (isWebRTC) {
		if (isTransferActive()) {
			transferRTCSession.hold();
			activeRTCSession.unhold();
			transferRTCSession.terminate();
		}
		checkAgentStateColor();
		setTransferActive(false);
		return;
	}
	
	if (isActiveWebPhoneJs()) {
		webphone_api.setline(2);
		webphone_api.hangup();
		webphone_api.setline(1);
		webphone_api.hold(false);
	} else {
		getSoftphone().API_Hangup(2);
		getSoftphone().API_SetLine(1);
		getSoftphone().API_Hold(1, false);
	}
	isOnHold = false;
	checkAgentStateColor();
	setTransferActive(false);
}

function transferAttendedComplete() {
	if (isWebRTC) {
		if (isTransferActive()) {
			if(transferRTCSession == null) {
				return;
			}
			if(transferRTCSession.isInProgress()) {
				return;
			}
			if(transferRTCSession.isEnded()) {
				return;
			}
			var referOptions = {
					'extraHeaders' : [],
					'replaces' : transferRTCSession
				};
			
			activeRTCSession.refer(transferRTCSession.remote_identity.uri.user, referOptions);
			callFinished();
		}
		checkAgentStateColor();
		setTransferActive(false);
		return;
	}
	
	if (isActiveWebPhoneJs()) {
		webphone_api.parameters['transfertype'] = 2;
		webphone_api.transfer('');
		webphone_api.setline(1);
		webphone_api.hangup();
		webphone_api.setline(2);
		webphone_api.hangup();

		zk.Widget.$("$DialNumber").setText("");
	}
	transferCompetedForBeep = true;
}

// ///-----------------------------------------------regUI-INTERFACE FUNCTIONS

function setReadyOrNotReadyColor(ready) {
	try {
		if (ready) {
			if (isOnHold) {
				return;
			}
			zk.Widget.$("$agentExtensionBar").setStyle("background-color: #16a085;");
		} else {
			if (isOnHold) {
				return;
			}
			zk.Widget.$("$agentExtensionBar").setStyle("background-color: #FF8000;");
		}
	} catch (e) {
		loggingExceptionX(e.stack);
	}
}

function openSettings() {
	try {
		if (isWebRTC) {
			return;
		}

		if (isWebphoneNS) {
			webphone_api.API_AudioDevice();
			try {
				document.getElementsByClassName('pico-overlay')[0].style.backgroundColor = "#1f1f1e";
			} catch (e) {

			}
			return;
		}
		getSoftphone().API_AudioDevice();
	} catch (e) {
		loggingExceptionX("OpenSettings Error e:" + e.stack);
	}
}

function hideWebphoneServiceDownloadLink() {
	if (!isWebphoneNS) {
		return;
	}
	try {
		// Hide Software Download Link
		document.getElementsByClassName('pico-content')[0].style.visibility = 'hidden';
		document.getElementsByClassName('pico-overlay')[0].style.visibility = 'hidden';
		if (hideDownloadLink) {
			return;
		}
		hideDownloadLink = true;
		setTimeout(function() {
			if (isRegistered) {
				return;
			}
			document.getElementsByClassName('pico-content')[0].style.visibility = 'visible';
			document.getElementsByClassName('pico-overlay')[0].style.visibility = 'visible';
		}, 20000);

	} catch (e) {
		// loggingExceptionX("Hide Software Download Link ERROR");
	}
}

function notifyMe(title, content) {
	try {
		if (isInternetExplorer) {
			return;
		}

		if (!zk.Widget.$("$phoneNumber").isVisible()) {
			return;
		}

		var options = {
			body : content,
			icon : themePath + "/webphone/tegsoft_phone_answer.png",
			dir : "auto"
		};

		if (!("Notification" in window)) {
			loggingX("Notify Doesn Not Support. Keep going without Notification !")
			return;
		}

		if (Notification.permission === 'denied') {
			return;
		}

		if (Notification.permission === "granted") {
			notification = new Notification(title, options);
			return;
		}

		if (Notification.permission === 'default') {
			Notification.requestPermission();
			notification = new Notification(title, options);
		}
	} catch (e) {
		loggingExceptionX(e.stack);
	}
}

function notifyUserNotification(message) {
	zul.wgt.Notification.show(message, null, {
		ref : null,
		pos : 'middle_center',
		off : 0,
		dur : 3000,
		type : 'info',
		closable : true
	});
}

// //-------------------------------------------regUTIL-TOOLS

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function guidPart() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

function guid() {
	return guidPart() + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + guidPart() + guidPart();
}

function isActiveWebPhoneJs() {
	return isRtc || isWebphoneNS;
}

function closeHangupPermission() {
	hangupPermission = false;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// ----------------------------------------------regLOGGING----------------------------------------------

function debugLog(message) {
	if (isRegistered) {
		return;
	}
	console.log("Debug Log: " + message);
	if (zk.Widget.$("$softphoneWindowWait").isVisible()) {
		zk.Widget.$("$debugbox").setText(zk.Widget.$("$debugbox").getText() + message + "\n");
		if (!isActiveWebPhoneJs()) {
			if (!handleJavaFeatures) {
				displayWebphoneEngineDetails('Java', 'Loading', 'Loading');
				handleJavaFeatures = true;
			}
		}
	}
}

function loggingX(message) {
	console.log("Log -> " + message);
}

function loggingExceptionX(message) {
	message = "EXCEPTION  ---> " + message;
	loggingX(message);
}

function webphonetojs(message) {
	try {
		webphonetojsY(message);
	} catch (e) {
		loggingExceptionX("Event Error message:" + message);
	}
}

function processStatusLogMessage(messages) {
	try {
		var code = messages[1];
		var command = messages[2];

		if ((messages[2].indexOf("Speaking") != -1) || (messages[2].indexOf("In Call") != -1)) {
			var speaking = getMessage('message_lastmessage10');
			if (code.indexOf("-1") != -1) {
				speaking = messages[2].substring(8);
			}

			zk.Widget.$("$callStatus").setValue(speaking);
			playBeepSound();
			incall = true;
			isSpeaking = true;

			if (ismuted) {
				zk.Widget.$("$callStatus").setValue(getMessage('message_lastMessage03') + " " + messages[3]);
			}
			return;
		}

		if (messages[2].indexOf("Muted") != -1) {
			zk.Widget.$("$callStatus").setValue(getMessage('message_lastMessage03') + " " + messages[2].substring(5));
			if ((messages.length > 3) && (typeof (messages[3]) !== 'undefined')) {
				if ((messages[3].indexOf("85999") == -1) && (messages[3].indexOf("NEOL") == -1)) {
					zk.Widget.$("$phoneNumber").setValue(messages[3]);
				}
			}
			incall = true;
			return;
		}

		if (messages[2].indexOf("Hold") != -1) {
			zk.Widget.$("$callStatus").setValue(messages[2]);
			if ((messages.length > 3) && (typeof (messages[3]) !== 'undefined')) {
				if ((messages[3].indexOf("85999") == -1) && (messages[3].indexOf("NEOL") == -1)) {
					zk.Widget.$("$phoneNumber").setValue(messages[3]);
				}
			}
			zk.Widget.$("$agentExtensionBar").setStyle("background-color: #f1c40f;");
			incall = true;
			return;
		}

		if (messages[2].indexOf("Ringing") != -1) {
			incall = true;
			if ((messages.length > 3) && (typeof (messages[3]) !== 'undefined')) {
				if (messages[3].indexOf("859995") != -1 || messages[3].indexOf("859996") != -1 || messages[3].indexOf("859997") != -1 || messages[3].indexOf("859998") != -1 || messages[3].indexOf("859999") != -1 || messages[3].indexOf("860012") != -1) {
					setTimeout(function() {
						if (isActiveWebPhoneJs()) {
							webphone_api.accept();
						} else {
							getSoftphone().API_Accept(1);
						}
					}, 500);
					return;
				}
				if ((messages[3].indexOf("85999") == -1) && (messages[3].indexOf("NEOL") == -1)) {
					zk.Widget.$("$phoneNumber").setValue(messages[3]);
				}
			}
			zk.Widget.$("$callStatus").setValue(getMessage('message_lastMessage02'));
			return;
		}

		if (messages[2].indexOf("Incoming") != -1) {
			debugLog("Incoming received ");
			return;
		}

		if (messages[2].indexOf("Calling") != -1) {
			debugLog("Calling received ");
			zk.Widget.$("$callStatus").setValue(getMessage('message_lastMessage04'));
			if ((messages.length > 3) && (typeof (messages[3]) !== 'undefined')) {
				if ((messages[3].indexOf("85999") == -1) && (messages[3].indexOf("NEOL") == -1)) {
					zk.Widget.$("$phoneNumber").setValue(messages[3]);
				}
			}
			incall = true;
			return;
		}

		if ((messages[2].indexOf("Call Finished") != -1) || (messages[2].indexOf("Çağrı sonlandı") != -1)) {
			callFinished();
			return;
		}

		if ((messages[2].indexOf("Registered") != -1)) {
			if (isActiveWebPhoneJs()) {
				return;
			}
			setSoftphoneVariable();
			registered();
			return;
		}

		if (messages[2].indexOf("CallSetup") != -1) {
			var callerId = messages[6];
			loggingX(messages);
			if (messages[5] === "2") {
				isIncomingCall = true;
				if (callerId.indexOf("85999") == -1) {
					// For Incoming
					showIncomingCallWindow(true, callerId);
					if (zk.Widget.$("$phoneNumber").isVisible()) {
						document.getElementById('nR4Q_n2').textContent = callerId;
					}
				}
			} else {
				isIncomingCall = false;
			}
			isSpeaking = false;
			return;
		}
	} catch (e) {
		loggingExceptionX(e.stack);
	}
}

function webphonetojsY(message) {

	if (message == null) {
		return;
	}

	if (message.length <= 5) {
		return;
	}

	if (message.indexOf("Accepted") !== -1) {
		beepRequired = false;
	}

	debugLog(message);

	if (transferActive) {
		var activeLine = zk.Widget.$("$activeLine");
		if (activeLine != null) {
			if (typeof activeLine != 'undefined') {
				if (isRegistered) {
					if (isActiveWebPhoneJs()) {
						activeLine.setValue("" + webphone_api.getline());
					} else {
						activeLine.setValue("" + getSoftphone().API_GetLine());
					}
				}
			}
		}
	}

	var messages = message.split(",");
	if ((messages[0].indexOf("STATUS") != -1) && (messages.length > 2)) {
		processStatusLogMessage(messages);
		return;
	}

	if (messages[0].indexOf("CDR") != -1) {
		incall = false;
		lastMessage = messages[9].toLowerCase();
		var displayNotice = false;
		if (lastMessage.indexOf("busy here") >= 0) {
			lastMessage = getMessage('message_lastMessage05');
			displayNotice = true;
		} else if (lastMessage.indexOf("bye received") >= 0) {
			lastMessage = getMessage('message_lastMessage06');
		} else if (lastMessage.indexOf("declined") >= 0) {
			lastMessage = getMessage('message_lastMessage07');
			displayNotice = true;
		} else if ((lastMessage.indexOf("temporarily unavailable") >= 0) || (lastMessage.indexOf("service unavailable") >= 0)) {
			lastMessage = getMessage('message_lastMessage08');
			displayNotice = true;
		} else if ((lastMessage.indexOf("hangup main hangup") >= 0) || (lastMessage.indexOf("hangup external unknown") >= 0) || (lastMessage.indexOf("hangup external unknown") >= 0) || (lastMessage.indexOf("cancel received") >= 0) || (lastMessage.indexOf("user hung up") >= 0)) {
			lastMessage = getMessage('message_lastMessage06');
		} else if (lastMessage.indexOf("cancel received") >= 0) {
			lastMessage = getMessage('message_lastMessage06');
			displayNotice = true;
		} else if (lastMessage.indexOf("disconnect on transfer") >= 0) {
			lastMessage = getMessage('message_lastMessage09');
			displayNotice = true;
		}

		if (displayNotice) {
			notifyUserNotification(getMessage('message_notifyMessage01') + '<BR><BR>' + lastMessage);
		}

		if (messages[1].indexOf("2") != -1) {
			setTransferActive(false);
			if (isActiveWebPhoneJs()) {
				webphone_api.setline(1);
			} else {
				getSoftphone().API_SetLine(1);
			}
			attendedTransferFailed = true;
		} else {
			callFinished();
			if (isActiveWebPhoneJs()) {
				webphone_api.setline(-2);
				webphone_api.hangup();
			} else {
				getSoftphone().API_Hangup(-2);
			}
			setTransferActive(false);
		}
		return;
	}

	if ((messages[0].indexOf("EVENT") != -1) && (messages.length > 2)) {
		if ("session disc because rejected 486" == messages[2]) {
			lastMessage = getMessage('message_lastMessage05');
		} else if ("session disc because bye received" == messages[2]) {
			lastMessage = getMessage('message_lastMessage06');
		} else if ("session disc because " == messages[2].substring(0, 21)) {
			lastMessage = messages[2].substring(21);
		} else if ((" call hold 2" == messages[2]) || (" hold" == messages[2])) {
			if (transferActive) {
				if (isActiveWebPhoneJs()) {
					return;
				}
				var activeLine = -2;
				if (isActiveWebPhoneJs()) {
					activeLine = webphone_api.getline();
				} else {
					activeLine = getSoftphone().API_GetLine();
				}
				debugLog("Call hold 2 transfer is active line:" + activeLine);
				if (activeLine == 1) {
					getSoftphone().API_SetLine(2);
					getSoftphone().API_Hold(2, false);
				} else {
					getSoftphone().API_SetLine(1);
					getSoftphone().API_Hold(1, false);
				}
			} else {
				debugLog("Call hold 2 transfer is not active");
			}
		}
		return;
	}
}

// /// ----------------------------------------regSTATIC FUNCTIONS

function getCallComponent() {
	return '<div>\r\n\t<table id=\"nR4Qlm2-cave\" style=\"table-layout: fixed;\" width=\"100%\">\r\n\t\t<colgroup id=\"nR4Qmm2-bdfaker\">\r\n\t\t\t<col id=\"nR4Qnm2-bdfaker\" style=\"width: 4%;\">\r\n\t\t\t<col id=\"nR4Qom2-bdfaker\" style=\"width: 47%;\">\r\n\t\t\t<col id=\"nR4Qpm2-bdfaker\" style=\"width: 47%;\">\r\n\t\t\t<col id=\"nR4Qqm2-bdfaker\" style=\"width: 4%;\">\r\n\t\t<\/colgroup>\r\n\t\t<tbody id=\"nR4Qrm2\" class=\"z-rows\">\r\n\t\t\t<tr id=\"nR4Qsm2\" style=\"height: 20px;\" class=\"z-row\">\r\n\t\t\t\t<td id=\"nR4Qtm2-chdextr\" class=\"z-row-inner\"><div\r\n\t\t\t\t\t\tid=\"nR4Qtm2-cell\" class=\"z-row-content\">\r\n\t\t\t\t\t\t<span id=\"nR4Qtm2\" class=\"labelParameterText z-label\"><\/span>\r\n\t\t\t\t\t<\/div><\/td>\r\n\t\t\t<\/tr>\r\n\t\t\t<tr id=\"nR4Qum2\" class=\"z-row z-grid-odd\"><\/tr>\r\n\t\t\t<tr id=\"nR4Qvm2\" class=\"z-row\">\r\n\t\t\t\t<td id=\"nR4Qwm2-chdextr\" class=\"z-row-inner\"><div\r\n\t\t\t\t\t\tid=\"nR4Qwm2-cell\" class=\"z-row-content\">\r\n\t\t\t\t\t\t<span id=\"nR4Qwm2\" class=\"labelParameterText z-label\"><\/span>\r\n\t\t\t\t\t<\/div><\/td>\r\n\t\t\t\t<td class=\"z-cell\" colspan=\"2\" id=\"nR4Qxm2\"><table id=\"nR4Qym2\"\r\n\t\t\t\t\t\tstyle=\"width: 100%; height: 38px;\" class=\"z-vbox\" cellspacing=\"0\"\r\n\t\t\t\t\t\tcellpadding=\"0\" border=\"0\">\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr valign=\"middle\">\r\n\t\t\t\t\t\t\t\t<td id=\"nR4Qym2-frame\" style=\"width: 100%\" align=\"center\"><table\r\n\t\t\t\t\t\t\t\t\t\tid=\"nR4Qym2-real\" style=\"text-align: left\" cellspacing=\"0\"\r\n\t\t\t\t\t\t\t\t\t\tcellpadding=\"0\" border=\"0\">\r\n\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t<tr id=\"nR4Qzm2-chdex\" valign=\"top\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"center\"><table id=\"nR4Qzm2\" class=\"z-hbox\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tcellspacing=\"0\" cellpadding=\"0\" border=\"0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr valign=\"middle\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td id=\"nR4Qzm2-frame\" style=\"width: 100%; height: 100%\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\talign=\"center\"><table id=\"nR4Qzm2-real\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"text-align: left\" cellspacing=\"0\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcellpadding=\"0\" border=\"0\" height=\"100%\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr valign=\"middle\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td id=\"nR4Q_n2-chdex\" style=\"height: 100%\"><span\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"nR4Q_n2\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"font-size: 30px; color: #3498db; font-family: \'Open Sans\', Helvetica, Arial, sans-serif;\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"z-label\">Incoming Call<\/span><\/td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<\/tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<\/tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<\/table><\/td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<\/tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<\/tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<\/table><\/td>\r\n\t\t\t\t\t\t\t\t\t\t\t<\/tr>\r\n\t\t\t\t\t\t\t\t\t\t<\/tbody>\r\n\t\t\t\t\t\t\t\t\t<\/table><\/td>\r\n\t\t\t\t\t\t\t<\/tr>\r\n\t\t\t\t\t\t<\/tbody>\r\n\t\t\t\t\t<\/table><\/td>\r\n\t\t\t<\/tr>\r\n\t\t\t<tr id=\"nR4Q0n2\" style=\"height: 20px;\" class=\"z-row z-grid-odd\"><\/tr>\r\n\t\t\t<tr id=\"nR4Q1n2\" class=\"z-row\">\r\n\t\t\t\t<td id=\"nR4Q2n2-chdextr\" class=\"z-row-inner\"><div\r\n\t\t\t\t\t\tid=\"nR4Q2n2-cell\" class=\"z-row-content\">\r\n\t\t\t\t\t\t<span id=\"nR4Q2n2\" class=\"labelParameterText z-label\"><\/span>\r\n\t\t\t\t\t<\/div><\/td>\r\n\t\t\t\t<td id=\"nR4Q3n2-chdextr\" class=\"z-row-inner\"><div\r\n\t\t\t\t\t\tid=\"nR4Q3n2-cell\" class=\"z-row-content\">\r\n\t\t\t\t\t\t<button id=\"acceptCallComponent\" autofocus="autofocus" class=\"accept\"\r\n\t\t\t\t\t\t\tonclick=\"answerCall();\">' + getMessage('Answer') + '<\/button>\r\n\t\t\t\t\t<\/div><\/td>\r\n\t\t\t\t<td id=\"nR4Q4n2-chdextr\" class=\"z-row-inner\"><div\r\n\t\t\t\t\t\tid=\"nR4Q4n2-cell\" class=\"z-row-content\">\r\n\t\t\t\t\t\t<button id=\"rejectCallComponent\" class=\"reject\"\r\n\t\t\t\t\t\t\tonclick=\"hangupCall();\">' + getMessage('Reject') + '<\/button>\r\n\t\t\t\t\t<\/div><\/td>\r\n\t\t\t<\/tr>\r\n\t\t\t<tr id=\"nR4Q5n2\" class=\"z-row z-grid-odd\"><\/tr>\r\n\t\t\t<tr id=\"nR4Q6n2\" style=\"height: 20px;\" class=\"z-row\">\r\n\t\t\t\t<td id=\"nR4Q7n2-chdextr\" class=\"z-row-inner\"><div\r\n\t\t\t\t\t\tid=\"nR4Q7n2-cell\" class=\"z-row-content\">\r\n\t\t\t\t\t\t<span id=\"nR4Q7n2\" class=\"labelParameterText z-label\"><\/span>\r\n\t\t\t\t\t<\/div><\/td>\r\n\t\t\t<\/tr>\r\n\t\t<\/tbody>\r\n\t\t<tbody class=\"z-grid-emptybody\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td id=\"nR4Qlm2-empty\" style=\"display: none\"><\/td>\r\n\t\t\t<\/tr>\r\n\t\t<\/tbody>\r\n\t<\/table>\r\n<\/div>';
}
