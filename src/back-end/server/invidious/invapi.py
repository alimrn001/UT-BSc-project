# keep it synced with front-end api calls
import re
import requests

invidious_unblocked_instances = [
    "https://iv.nboeck.de/",
    "https://vid.puffyan.us/",
    "https://invidious.asir.dev/",
    "https://iv.ggtyler.dev/",
    "https://inv.us.projectsegfau.lt/",
    "https://invidious.slipfox.xyz/",
]  # Invidious non-filtered instances (last one is a German server, not USA!)


def get_invidious_current_instance():
    return invidious_unblocked_instances[0]


def get_video_id_from_youtube_url(video_url):
    reg_exp = r'^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})'
    match = re.match(reg_exp, video_url)
    if match:
        return match.group(1)
    else:
        return None


def youtube_video_exists(video_url):
    video_id = get_video_id_from_youtube_url(video_url)
    if video_id is None:
        return False
    try:
        response = requests.get(f"{get_invidious_current_instance()}/api/v1/videos/{video_id}")
        if response.status_code == 200:
            return True
        else:
            return False
    except requests.RequestException:
        return False
        # return True  # Do NOT consider the video to be non-existent if there was a connection error with invidious!


def get_search_results(q, search_type, page):
    # Add sort query too if needed similar to axios in front-end!
    search_type = ",".join(search_type)
    if len(search_type) == 1 and search_type[0] == "all":
        search_type = "video,channel,playlist"
    try:
        response = requests.get(
            f"{get_invidious_current_instance()}api/v1/search?q={q}&type={search_type}&page={page}"
        )
        search_results = response.json()
        return search_results
    except requests.exceptions.RequestException as e:
        raise Exception(e)


def get_video_data(video_id):
    try:
        response = requests.get(
            f"{get_invidious_current_instance()}api/v1/videos/{video_id}"
        )
        video_data = response.json()
        return video_data
    except requests.exceptions.RequestException as e:
        raise Exception(e)

