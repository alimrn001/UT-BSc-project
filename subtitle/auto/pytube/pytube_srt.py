import pytube

video_url = 'https://youtube.com/watch?v=pFptt7Cargc&ab_channel=tameimpalaVEVO'

yt = pytube.YouTube(video_url)

# Get the available captions for the video
captions = yt.captions

language_code = ''

# Find the English caption track
for caption in captions:
    print (caption.code)
    if 'en' in caption.code:
        language_code = caption.code
        break

if language_code:
    print(language_code)
    selected_caption = yt.captions[language_code]

    # Download the subtitles and save them to a file
    subtitles_text = selected_caption.generate_srt_captions()

    with open('subtitles.srt', 'w', encoding='utf-8') as file:
        file.write(subtitles_text)

    print(f"Subtitles saved to 'subtitles.srt'")
else:
    print(f"No captions found for English (en) language code.")
