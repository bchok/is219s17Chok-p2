// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string
  if(mCurrentIndex < mImages.length){
      $('.thumbnail').attr("src", mImages[mCurrentIndex].img);
      mCurrentIndex++;
  } 
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

//XMLHttpRequest function
mRequest.onreadystatechange = function() {
  //do something interesting if file is opened correctly
  if (mRequest.readyState == 4 && mRequest.status == 200) {
    try {
      //parse the JSON file
      mJson = JSON.parse(mRequest.responseText);


      //loop through mJson array and instert into mImages arrow with GI objects
      for(var i = 0; i < mJson.images.length; i++){
        console.log("looping!");
        mImages.push(new GalleryImage(mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date, mJson.images[i].imgPath));
      };
      console.log(mImages);
      //printing out Json --> hopefully it shows object which means its working
      console.log(mJson);
      console.log(mJson.images[0].date);
    } catch (err) {
      console.log(err.message);
    }
  }
};

mRequest.open("GET", mUrl, true);
mRequest.send();

//GET request function
//used to retrieve the file from the URL
function getQueryParams(qs){
  qs = qs.split("+").join(" ");
  var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {

	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

  //have the more indicator clickable
  $('.moreIndicator').click(function () {
    $('.details').eq(0).toggle();

    $(this).toggleClass("rot90 rot270");
    /**$(this).addClass("rot270");**/
  });

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);

function GalleryImage(location, description, date, img) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  this.location = location;
  this.description = description;
  this.date = date;
  this.img = img;
}

var testImage = new GalleryImage("testloc", "testdesc", "testdate", "testimg");
console.log(testImage.location);
