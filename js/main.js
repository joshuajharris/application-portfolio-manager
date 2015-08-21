var ghUserName = 'joshuajharris'; 
var refRootUrl = 'https://joshuajharris-apm.firebaseio.com/';
var ref = new Firebase(refRootUrl + 'projects');

ref.on("value", function(snapshot) {
  var projects = snapshot.val();
  
  $.each(projects, function(i, project) {
    $('#projects').append(
      '<div id="' + project.id + '">' +
        '<h3><i class="fa fa-github"></i> ' + project.name + '</h3>' +
        'Clone Url: <code>' + project.git_url + '</code>' +
        '<p>' + project.description + '</p>' +
        '<button class="btn btn-danger" onclick="removeProject(\'' + project.id + '\')"><i class="fa fa-times"></i> Remove Project</button>' +
      '</div>'
    );
  });
}, function(errorObject){
  console.log("The read failed: " + errorObject.code);
});

ref.on("child_removed", function(snapshot){
  $("#projects").empty();
  console.log("child " + snapshot.key() + " removed");
});

function removeProject(projectId) {
  ref.child(projectId).remove();
}

function pushGithubRepos(userName) {
  $.getJSON('https://api.github.com/users/' + ghUserName + '/repos', function(json) {
    $.each(json, function(i, repo) {
      newProject = ref.push(repo);
      newId = newProject.key();
      ref.child(newId).update({id: newId});
    });

    ref.on("child_added", function() {
      console.log("repo pushed");
    });
  });
}
