/******************************************************
* #### jQuery Hashtags on Instagram v01 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jhoi-jquery-hashtags-on-instagram/
* Updates will be posted to this site.
******************************************************/

var bcr_instag = function(ins_tag,ins_token){

	var sub = '',
		methos = 'html';

	ibacordotcom_ins(ins_tag,ins_token,sub,methos);

	function ibacordotcom_ins(ins_tag,ins_token,sub,methos) {
		$.ajax({
			url: 'https://api.instagram.com/v1/tags/' + ins_tag + '/media/recent?access_token=' + ins_token + sub,
			crossDomain: true,
			dataType: 'jsonp'
		}).done(function (data) {
			var html = '';
			$.each(data.data, function(i, item) {
				var title = '';
				if(data.data[i].caption == null){
					title += Date(data.data[i].created_time);
				}else {
					title += data.data[i].caption.text + ' - ' + Date(data.data[i].created_time);
				}
				html += '<div class="bcr_unit_ins bcr_ins_box">';
				html += '<a href="' + data.data[i].images.standard_resolution.url.replace(/\\/, "") + '" class="ins_popup" rel="ins_gallery" title="' + title + '"><img src="' + data.data[i].images.thumbnail.url.replace(/\\/, "") + '" alt="" title="' + title + '"></a>';
				html += '<a href="http://instagram.com/' + data.data[i].caption.from.username + '" target="_blank"><span style="float:left"><i class="fa fa-user"> ' + data.data[i].caption.from.username + '</i></span></a>';
				html += '<a href="' + data.data[i].link + '" target="_blank"><span style="float:right"><i class="fa fa-heart" style="margin-right:10px"> ' + data.data[i].likes.count + '</i><i class="fa fa-comment"> ' + data.data[i].comments.count + '</i></span></a>';
				html += '</div>';
			});
			html += '<p class="ibacordotcom_load_more"><input type="submit" class="btn bcr_ins_more" value="More"></p>';
			if(methos == 'html'){
				$('.bcr_ins_gallery').html(html);
			}else{
				$('.bcr_ins_gallery').append(html);
			}
			$('.bcr_ins_more').click(function(){
				ibacordotcom_ins(ins_tag,ins_token,sub + '&max_tag_id=' + data.pagination.next_max_tag_id,'epen');
				$( ".ibacordotcom_load_more" ).css( "display", "none" );
				return false;
			});
		});
	}

}
