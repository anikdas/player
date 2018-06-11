const ap = new APlayer({
    container: document.getElementById('aplayer')
});

$(document).on('submit','#search',function(e){

    e.preventDefault();

    var searchQuery = $('#searchInput').val();

    if(!searchQuery) {
        return;
    }

    $('#searchResContainerRow').html("");

    var url = '/youtube/search/?q=' + searchQuery; 
    $.ajax({
        url: url,
        success: function (data) {
            for(var index=0; index < data.length; index++) {
                var searchRes = data[index];
                var dummySearchResNode = document.querySelector("#searchItem");
                var searchResItemNode = dummySearchResNode.cloneNode(true);
                searchResItemNode.setAttribute('id', '');
                var imgTag = searchResItemNode.querySelector('img');
                imgTag.setAttribute('src', searchRes.snippet.thumbnails.medium.url);

                var heading = searchResItemNode.querySelector('p');
                heading.innerHTML = searchRes.snippet.title;

                searchResItemNode.style.display = '';

                $(searchResItemNode).data('songDetails', searchRes);
                searchResItemNode.onclick = play;

                var searchResContainer = document.querySelector('#searchResContainerRow');
                searchResContainer.appendChild(searchResItemNode);
            }
        }
    })
 });

 function play() {

    var song = $(this).data('songDetails');

    console.log(song);
     ap.list.clear();
     ap.list.add({
         name: song.snippet.title,
         cover: song.snippet.thumbnails.default.url,
         url: '/play/?url=https://www.youtube.com/watch?v=' + song.id.videoId
     });
 }

 ap.on('canplay', function () {
     ap.play();
});