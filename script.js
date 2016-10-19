$(function() {
    $.cloudinary.config({ cloud_name: 'christekh', api_key: '874837483274837'})
    var uploadButton = $('#upload-button');
    var canvas = $('#canvas');
    uploadButton.on('click', function(e){
        cloudinary.openUploadWidget({ cloud_name: 'christekh', upload_preset: 'idcidr0h'}, 
        function(error, result) { 
            var id = result[0].public_id;
            console.log(procesImage(id));
            canvas.html(procesImage(id))
        });
    });

    function procesImage(id){
        // Get a random mustache image from
        var movembers = ["movember3_oabbz1", "movember2_rqx5ys", "movember_qimgkg"];
        var random = Math.floor(Math.random() * movembers.length);
        var randomMovember = movembers[random];
        var options = {
            // Transformation option
            transformation: 
                [
                    // Specify desired width
                    {width: 400},
                    // Check if faces (if faces >= 1)
                    {if: "faces_gte_1"},
                    // Add movember image.
                    // Movember will be placeed right
                    // in the middle of the face so we can push 
                    // it down a little bellow the nose
                    {overlay: randomMovember, width: 1.1, flags: "region_relative", gravity: "faces", x:0, y:60},
                    // If the image is not a face
                    {if: "else"},

                    // drop the movember at the 
                    // down-right section of the image
                    {overlay: randomMovember, width: 100, gravity: "south_east"},
                    // End if statement
                    {if: "end"},
                    // Add a border and a border-radius
                    {border: "7px_solid_grey", radius: 30}
                ]
            };
            // Return image with the options
            // Image is returned in an image tag
            // and not as a URL
        return $.cloudinary.image(id, options);
    }
     
});