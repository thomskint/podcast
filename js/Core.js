Podcast.Core = (function() {

    var feedData,
        PROXYURL = 'http://localhost:3000/',
        RSSFEEDURL = '?url=http://rss.cnn.com/services/podcasting/studentnews/rss.xml', //RSS feed URL
        focusItems = [],
        focusIndx = 0,
        videoInx;
        
        
        function wireListeners(){
            //key handling
            window.addEventListener('keydown', function(event) {
              switch (event.keyCode) {
                case 37: // Left
                  onMoveLeftKey();
                break;

                case 38: // Up
                  focusNext(-1);
                break;

                case 39: // Right
                  onMoveRightKey();
                break;

                case 40: // Down
                  focusNext(1);
                break;
                case 13: // Enter
                  onEnterKey();
                break;
              }
            }, false);
        }

        function onEnterKey(){
            var selectedTextArea = document.activeElement;
                if(selectedTextArea.getAttribute('data-link')){
                    loadVideo(selectedTextArea.getAttribute('data-link'));
                }
                if(selectedTextArea.getAttribute('data-description')){
                    loadDescription(selectedTextArea.getAttribute('data-description'));
                }          
        }

        function loadVideo(vidlink){
            var video = document.getElementsByTagName('video')[0];
            debugger;
                if(!vidlink){
                    document.getElementById('video-prompt').innerHTML = '<h1 class="error">Episode error please try another one.</h1>';
                   manageVideo(false); 
               }else{
                    manageVideo(true);
                    video.src = vidlink;
                    video.type = "video/mp4"; // hardcoding type here, should really check type of feed media
                    video.play(); 
               }
                
       
        }

        function loadDescription(des){
            var desc = document.getElementById('video-description');
                desc.innerHTML = strip(des);
                
        }


        function strip(html){
           var  tmp = document.implementation.createHTMLDocument("New").body;
                tmp.innerHTML = html;
           return tmp.textContent || tmp.innerText || "";
        }

        function onMoveRightKey(){
            document.getElementById(focusItems[videoInx].id).focus(); 
        }

        function onMoveLeftKey(){
            document.getElementById(focusItems[0].id).focus(); 
        }

        function focusNext(count){
            if(focusIndx === 0 && count ===-1) 
                focusIndx = focusItems.length;

            focusIndx += count;
            for (var i = 0, l = focusItems.length; i < l; i++) {
               if(focusItems[i].count === focusIndx){
                    document.getElementById(focusItems[i].id).focus(); 
               }
            }
        }
        
        function manageVideo(show){
            var video = document.getElementById('video-container'),
                prompt = document.getElementById('video-prompt');
                video.style.display = show?'block':'none';
                prompt.style.display = !show?'block':'none';
        }

        function getFeedData(){
                return feeddata;
        }

        function makeRequest(url) {
                httpRequest = new XMLHttpRequest();

                if (!httpRequest) {
                  alert('Giving up :( Cannot create an XMLHTTP instance');
                  return false;
                }
                httpRequest.onreadystatechange = function() {
                    var xmlstring,
                        parser = new DOMParser(),
                        xml;

                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                      if (httpRequest.status === 200) {
                        xmlstring = httpRequest.responseText;
                        xml = parser.parseFromString(xmlstring, "application/xml");
                        feedData = Podcast.Util.parseXMLToObject(xml);
                        manageView();

                      } else {
                        alert('There was a problem with the request.');
                      }
                    }
                };
                httpRequest.open('GET', url);
                httpRequest.send();
            }

        function manageView(){
                var container = document.getElementById("episode-list"),
                    entry,
                    li,
                    tabIndx = 0;
                    for (var i = 0; i < feedData.feedItems.length; i++) {
                            entry = feedData.feedItems[i];
                            li = document.createElement("li");
                            
                            if(li){
                                li.id = 'block'+ tabIndx;
                                li.className = 'episode-card';
                                li.tabIndex=tabIndx;
                                li.setAttribute('data-link',entry.link);
                                li.setAttribute('data-description',entry.description);

                                focusItems.push({id:li.id,count: tabIndx});

                                var str = Podcast.Util.format('<div class="cameraIcon"><div class="camera"></div></div><h2>{0}</h2><h3>{1}</h3>', entry.title, entry.pubDate);
                                    li.innerHTML = str;
                                container.appendChild(li);
                            }
                            tabIndx +=1;
                    }
                    videoInx = tabIndx;
                    // sticking in the episode a the end of the episode array just in case the user arrows left/right
                    focusItems.push({id:'episode-video',count: tabIndx});

                    
                    console.log(focusItems);
                    
                    document.getElementById("episode-list").firstElementChild.focus();
                    // set the title
                    document.getElementById("header-title").innerHTML = Podcast.Util.format('<h1>{0}</h1>', feedData.podcastTitle);
                    // set the description
                    document.getElementById("header-description").innerHTML = feedData.podcastDescription;
        }

        return {
            /**
             * @description
             * Init the application
             */
            init : function() {
                manageVideo(false);
                wireListeners();
                makeRequest(PROXYURL + RSSFEEDURL);   
            }
        };
            
     
            
}());