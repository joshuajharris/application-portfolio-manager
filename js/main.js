var apm = new Firebase('https://joshuajharris-apm.firebaseio.com/');

function getApps(db) {
  db.on("value", function(snapshot){
    var projects = snapshot.val();
    $.each(projects, function(i, project) {
      $('#projects').append(
        '<div>' +
          '<h3>' + project.name + '</h3>' +
          'Clone Url: <code>' + project.git_url + '</code>' +
          '<p>' + project.description + '</p>' +
          '<button class="btn btn-danger">Remove Project</button>' +
        '</div>'
      );
    });
  }, function(errorObject){
    console.log("The read failed: " + errorObject.code);
  });
}

function pushGithubRepos(db, githubAPI) {
  $.getJSON(githubAPI, function(json){
    $.each(json, function(i, repo) {
      db.push(repo);
    });

    db.on("child_added", function(){
      console.log("repo pushed");
    });
  });
}

getApps(apm);
