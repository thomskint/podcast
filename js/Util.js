Podcast.Util = (function() {
    /**
     * @description
     * Set the logged in counter
     */
    function showCounter() {
        document.getElementById("result").innerHTML =
            "<p>You have logged in <b>" + getCounter() +
            "</b> time(s).</p>";
    }


    return {
        format : function (format) {
            var formatRe = /\{(\d+)\}/g,
              args = [];
              for (i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
              }
              return format.replace(formatRe, function(m, i) {
                return args[i];
              });
        },

        parseXMLToObject : function(xml){
            var items,
                podcastItems = [],
                podcastItem,
                podcastData = {
                    feedItems : [],
                    podcastTitle : '',
                    podcastDescription : ''
                }
                if(!xml)return; //shortcircuit no xml
                // set the title
                podcastData.podcastTitle = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                // set the description
                podcastData.podcastDescription = xml.getElementsByTagName("description")[0].childNodes[0].nodeValue;


                items = xml.getElementsByTagName('item');
                console.log(items);
                try{
                    for(var i = 0; i < items.length; i++){
                      podcastItem = {
                            title: items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue, 
                            description: items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue, 
                            link: items[i].getElementsByTagName("link")[0].childNodes[0].nodeValue,
                            pubDate: items[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue
                            //enclosure: items[i].getElementsByTagName("enclosure")[0].childNodes[0].nodeValue
                      };
                      podcastItem.description.replace(/<(?:.|\n)*?>/gm, '');
                      podcastItems.push(podcastItem);
                    };
                }catch(e){
                    podcastItems = [];
                }
                
                
                podcastData.feedItems = podcastItems;

                return podcastData;
          }
    }
}());
