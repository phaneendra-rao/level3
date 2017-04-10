$(document).ready(function(){
  $('.loader').hide();
  var myFacebookToken = 'EAACEdEose0cBAAw2mEZCXrTnFbfiZCDSc1JJwPfEK3e6qZBwpKyj8YFRg9z0AJt4ai0Phu60rT8j5iONWXOO6NlJnPVFi3ARPnhdZApd3zGmZAHJTZCwZBB6rvyCPIR353HbNVgQvpGNWNFyzCexmj14L7NHCMJzYv3O2x3fdYlUKO2MjmOuFNPPeUlRAnmnZBYeIWmMO1YgcMxzYzfCaD6RHxCTr084EJEZD';
  myProfileInfo();
  function myProfileInfo()
  {
    $.ajax('https:graph.facebook.com/me/feed?access_token='+myFacebookToken,{
      success:function(response)
      {
        console.log(response);
        //console.log(typeof(response));
       jQuery.each(response.data,showFeed);

       function showFeed(i, val)
        {
          var likes=[];
          var likes=getLikes(val.likes);
          if(likes[0]!=undefined)
          {
            likesCount=likes[0].length;
          }
          else {
            likesCount=0;
          }
//console.log(likes.length);

          if(val.name!=undefined && val.link!=undefined && likesCount>=0 && val.status_type!=undefined && val.from.name!=undefined && val.from.id!=undefined )
          {
            if(val.status_type=="mobile_status_update")
            {
              val.status_type="Updated Status";
            }

            if(val.status_type=="shared_story")
            {
              val.status_type="Shared Story";
            }

            if(val.status_type=="added_photos")
            {
              val.status_type="Added Photos";
            }

            if(val.story==undefined)
            {
              val.story="";
            }

            if(val.description==undefined)
            {
              val.description="";
            }

            if(val.created_time==undefined)
            {
              var agoTime="";
            }
            else
            {
              var created_time = val.created_time;
              var agoTime = prettyDate(created_time);
              if(agoTime==undefined)
              {
                agoTime="1 month ago";
              }

            }

            if(val.message==undefined)
            {
              val.message="";
            }


            function prettyDate(time){
            	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
            		diff = (((new Date()).getTime() - date.getTime()) / 1000),
            		day_diff = Math.floor(diff / 86400);

            	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
            		return;

            	return day_diff == 0 && (
            			diff < 60 && "just now" ||
            			diff < 120 && "1 minute ago" ||
            			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            			diff < 7200 && "1 hour ago" ||
            			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
            		day_diff == 1 && "Yesterday" ||
            		day_diff < 7 && day_diff + " days ago" ||
            		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
            }

            createPanelDiv(i);
            $("#"+i).html('<div class="panel panel-primary"><div class="panel-heading" style="padding:10px;10px;"><h3 class="panel-title"><span><a href="https://www.facebook.com/'+val.from.id+'" target="_blank" style="margin-top:0px;font-size:.800em;color:white" >'+val.from.name+'</a>&nbsp;&nbsp;&nbsp; <span style="font-size:.700em;margin-top:0px;">&nbsp;&nbsp;&nbsp;'+val.status_type+'</span></span>&nbsp;&nbsp;&nbsp;<a href="'+val.link+'" style="text-decoration:none;font-size:.888em;" target="_blank">'+val.name+'</a></h3></div><div class="panel-body">'+val.story+'<br />'+val.message+'<br>'+val.description+'<br>  <div class="panel-footer" style="margin-top:6px;"> <a class="btn btn-sm btn-primary" role="button" data-toggle="collapse" href="#collapseExample'+i+'" aria-expanded="false" aria-controls="collapseExample'+i+'">'+likesCount+' Likes &nbsp;<i class="fa fa-thumbs-up" aria-hidden="true"></i></a><span style="float:right;">'+agoTime+'</span><div class="collapse" id="collapseExample'+i+'"><div class="well"></div> </div></div></div></div>');

            likedNames(i,likes);
          }
          //alert(i+","+val.description)
          //$("#feed").html('<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">'+val.description+'</h3></div><div class="panel-body">Panel content</div></div>');
        }

        function createPanelDiv(i)
        {
          $("#feed").append('<br/><div id="'+i+'" ></div>')
        }

        function getLikes(likes)
        {
          if(likes!=undefined)
          {
            var names=[],ids=[],arr=[],i;
            for(i=0;i<likes.data.length;i++)
            {
              names.push(likes.data[i].name);
              ids.push(likes.data[i].id);
            }
            return arr=[names,ids]
            //console.log(arr);
            /*var likesResult=likes.data.length;;
                if(likesResult>=1)
                {
                  return likesResult;
                }
                else {
                  return 0;
                }*/
          }
          else {
            return 0;
          }
        }

        function likedNames(i,likes)
        {
          if(likes[0]!=undefined)
          {
            for (var j = 0; j < likes[0].length; j++) {
              $("#collapseExample"+i+" .well").append('<span style="font-size:.899em;"><a href="https://www.facebook.com/'+likes[1][j]+'" target="_blank" style="text-decoration:none;">'+likes[0][j]+'</a></span><br/>');
              }
          }

        }
       //$("#feed").html('<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">'+response.data[0].description+'</h3></div><div class="panel-body">Panel content</div></div>');
     },//end success


 error : function(request,errorType,errorMessage)
 {
  console.log(request);
  console.log(errorType);
  alert(errorMessage);
 },
 timeout:3000,
 beforeSend : function()
 {
   $('.loader').show();
 },
 complete : function()
 {
   $('.loader').hide();
 }

}

    );//end ajax
  }//end PmyProfileInfo

//  $('#feedBtn').on('click',myProfileInfo);
});//end document
