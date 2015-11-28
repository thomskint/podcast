
(function (global) 
	{ 
	var Podcast = {VERSION : '0.0.1'};

	if (global .Podcast ) {
		throw new Error ('Podcast has already been defined')
	} else {
		global .Podcast = Podcast ;
	}
})( typeof window === 'undefined' ? this : window );