# -*- encoding: utf-8 -*-
'''
@File    :   main.py
@Time    :   2023/05/22 16:32:20
@Version :   1.0
@Desc    :   None
'''

# import lib here
import moviepy.editor as mp
import speech_recognition as sr

def convert_video_to_audio(video_path, audio_path):
    video = mp.VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)

def convet_audio_to_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    text = recognizer.recognize_google(audio)
    return text
if __name__ == '__main__':
    video_path = './test.mp4'
    audio_path = 'ouput.wav'
    # convert_video_to_audio(video_path, audio_path)
    text = convet_audio_to_text(audio_path)
    print(text)
