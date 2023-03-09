import React, { Component } from 'react';
import { Audio , InterruptionModeAndroid, InterruptionModeIOS, } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

const song = require('./assets/ukulele.mp3');
const ukulele = require('./assets/ukulele.png');

export default class App extends Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    currentTrackIndex: 0,
    isBuffering: false,
  }

	async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying
    });
  }

  

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering
    });
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = song;
		const status = {
			shouldPlay: this.state.isPlaying,
			volume: this.state.volume,
    };
    playbackInstance
      .setOnPlaybackStatusUpdate(
        this.onPlaybackStatusUpdate
      );
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance
    });
  }

 

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.Title}>
        <Text style = {styles.text}>Aloha Music</Text>
        </View>
        <View>
        
<Image source={ukulele} style = {styles.image}/>
      <View style={styles.control}>
          <TouchableOpacity
            
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ?
              <Feather name="pause" size={32} color="#000"/> :
              <Feather name="play" size={32} color="#000"/>
            }
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
Title:{
width: 300,
backgroundColor: '#da9547',
alignItems:"center",
marginBottom: 30,
},
text:{
  fontSize:30,
},
image:{
height:500,
width:300,
marginBottom: 10
},
control:{
alignItems:'center'
}

});