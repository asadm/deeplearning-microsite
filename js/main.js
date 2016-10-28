var firebaseURL = "https://deeplearningworkshop.firebaseio.com/";
$('#submitID').click(function(){
  var val = $('#githubID').val();

  if (!val || val.length===0){
    return;
  }

  $('.github_notdone').addClass("hidden");
  $('.github_done').removeClass("hidden");

  var fbID = new Firebase(firebaseURL + "/githubID/" + EncodeEmail(val))
  fbID.set(val);

})

marked.setOptions({
  sanitize: true
})
//console.log(marked("*Nothing here yet*"))

var fbPad = new Firebase(firebaseURL + "tempPad/")
fbPad.on('value',function(snapshot){

  var newVal = snapshot.val() || "*Nothing here yet*";
  console.log("updating Pad",newVal)

  var html = marked(newVal);
  $('#tempPad').html(html);
})


function EncodeEmail(email) {
    email = escape(email);
    return base64toURL(btoa(email));
};

function base64toURL(input, decode) {
    function replaceAll(find, replace, str) {
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function strtr(str) {
        return replaceAll('=', '~', replaceAll('_', '/', replaceAll('-', '+', str)));
    }

    function strtr2(str) {
        return replaceAll('~', '=', replaceAll('/', '_', replaceAll('+', '-', str)));
    }
    if (decode)
        return strtr2(input);
    else
        return strtr(input);
};
