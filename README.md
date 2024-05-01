# Play Sound
The movilizer of this project was to share any audio on Google Meet. As the only way of doing that was sharing an tab with audio, I find a wa to inject the audio I want on the tab I want to share.
This is a quick Google Chrome extension PoC that select an audio device and reproduce its sound on a page opened on Google Chrome. This actual version was created in Windows using VB-Audio CABLE as default and only is enabled on Google Docs.

# How to use it
1. Install VB-Audio CABLE driver https://vb-audio.com/Cable/
2. In Chrome, go to Extension Manager, enable dev mode, and load the extension from the file system
3. Play something on Spotify, VLC or any media player
4. On the Windows Mixer, where you have all the apps playing sound, expand the app and select the "Cable Input" as the Output device. Sound will stop, but the player will still be reproducing.
5. Open any Google Doc.
6. Accept access to the microphone.
7. You will see a speaker icon on the doc menu bar. When you clic it, sound will start playing on that tab.
8. Then, you start the meeting and share that tab. You can control the song you want to play and the volume from the media player

# Thanks to
- Icons by icons8.com
