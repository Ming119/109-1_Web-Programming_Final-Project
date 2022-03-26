
// GET
db.collection("workList").orderBy("createdAt", "desc").get()
	.then(function(collection) {
		collection.forEach(function(doc) {
			var data = doc.data();

			var id = data.createdAt.seconds;
			var title = data.title;
			var subtitle = data.subtitle;
			var thumbnail = data.thumbnail;
			var date = new Date(1970, 0, 1);
			date.setSeconds(id);
			date = date.toLocaleDateString();

			var newWork = `
				<div class='col-xs-12 col-sm-12 col-md-6 col-lg-4'><div class='card-flyer'>
					<div class='text-box'>
						<div class='image-box'>
							<img src="${thumbnail}" data-toggle='modal fade' data-target="a${id}"/>
						</div>
						<div class='text-container'>
							<h6>${title}</h6>
							<p>${subtitle}</p>
						</div>
						<small class='text-muted'>${date}</small>
					</div>
				</div>`;
			$("#newWork").append(newWork);

			// var newWork = "<div class='col-lg-4'><div class='card mb-4'><img class='card-img-top' style='height: 225px; width: 100%; display: block;' src='"+  thumbnail +"'data-holder-rendered='true'><div class='card-body'><h4>"+ title +"</h4><p class='card-text'>"+ subtitle +"</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button type='button' class='btn btn-sm btn-outline-info' data-toggle='modal' data-target='#"+ id +"'>View</button><button type='button' class='btn btn-sm btn btn-outline-danger'>Delete</button></div><small class='text-muted'>"+ date +"</small></div></div></div></div>";

			var newModal = `
				<div class='modal fade' id="a${id}">
					<div class='modal-dialog'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h4 class='modal-title'>${title}</h4>
								<button type='button' class='close' data-dismiss='modal'>&times;</button>
							</div>
							<div class='modal-body'>
								<img class='card-img-top' style='height: 225px; width: 100%; display: block;' src="${thumbnail}" data-holder-rendered='true'>
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>
							</div>
						</div>
					</div>
				</div>`;
			$("#newWork").append(newModal);
		})
	})

	.catch(function(error) {
		console.log("[error]", error);
		alert("Error, please check on console!");
	});


// POST
$("#createWork").submit(function(event) {
	event.preventDefault();

	var work = {
		title: 		$("#workTitleInput").val(),
		subtitle:	$("#workSubtitleInput").val(),
		thumbnail:	$("#workThumbnail").val(),
		createdAt:	new Date()
	};

	db.collection("workList").add(work)
	.then(function() {
		alert("work created!");
		location.replace("./index.html");
	})

	.catch(function(error) {
		console.log('[error:]', error);
    	alert("Error, please check on console!");
	})
});
