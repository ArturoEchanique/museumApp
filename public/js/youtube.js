// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let iteration = 0;
// let apiVideoId = 'ez1YgRexThQ'
// let apiVideoIds = []

function getVideoId() {

    return axios.get('/api/videos')
}

function onYouTubeIframeAPIReady() {
    getVideoId()
        .then(({ data }) => {
            data.forEach(apiVideoId => {
                iteration++
                player = new YT.Player('player'+iteration, {
                    height: '350',
                    width: '90%',
                    videoId: apiVideoId,
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                })
            })
        })
        .catch(err => console.log(err))

    console.log('00000', videoId)

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}