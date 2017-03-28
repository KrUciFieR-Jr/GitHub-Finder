$(document).ready(function(){
$('#searchUser').on('keyup',function(e){
let username = e.target.value;
//Make Request to GitHub
$.ajax({
url  : 'https://api.github.com/users/'+username,
data :{
	client_id :'16010e09dc22e09dd6e9',
	client_secret : '5615ec612d399b0a679c63ee09dd4de9011df2df'
}
}).done(function(user){
	$.ajax({
	url  : 'https://api.github.com/users/'+username+'/repos',
	data :{
		client_id :'16010e09dc22e09dd6e9',
		client_secret : '5615ec612d399b0a679c63ee09dd4de9011df2df',
		sort :'created: asc',
		per_page : 10
	}
	}).done(function(repos){
	$.each(repos,function(index,repos){
$('#repos').append(`

<div class="well">
	<div class="row">
		<div class="col-md-7"><strong>${repos.name}</strong> : ${repos.description}</div>
		<div class="col-md-3">
		 <span class="label label-default" style="color:#1a55ed;">Forks : ${repos.forks_count}</span>
<span class="label label-default" style="color:#1a55ed;">Watchers : ${repos.watchers_count}</span>
<span class="label label-default" style="color:#1a55ed;">Stars : ${repos.stargazers_count}</span>
</div>
		<div class="col-md-2">
		<a href="${repos.html_url}" target="_blank" class="btn btn-default" style="color:#1a55ed;">Repo Page</a>
		</div>
	</div>
</div>
`);
});
});
$('#profile').html(`
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title" style="color : #1a55ed;">${user.name}</h3>
  </div>
  <div class="panel-body">
    <div class="row">
    <div class="col-md-3">
    <img  class="thumbnail avatar" src="${user.avatar_url}">
    <a target="_blank" class="btn btn-primary btn-block grey-background" href="${user.html_url}" style="color : #1a55ed;">View Profile</a>
    </div>
    <div class="col-md-9">
    <span class="label label-default" style="color:#1a55ed;">Public Repositories : ${user.public_repos}</span>
<span class="label label-default" style="color:#1a55ed;">Public Gists : ${user.public_gists}</span>
<span class="label label-default" style="color:#1a55ed;">Followers : ${user.followers}</span>
<span class="label label-default" style="color:#1a55ed;">Following : ${user.following}</span>
<br><br>
<ul class = "list-group">
<li class="list-group-item" style="color:#1a55ed;">Company : ${user.company}</li>
<li class="list-group-item" style="color:#1a55ed;">Website : ${user.blog}</li>
<li class="list-group-item" style="color:#1a55ed;">Location : ${user.location}</li>
<li class="list-group-item" style="color:#1a55ed;">Member Since : ${user.created_at}</li>
    </div>
    </div>
  </div>
</div>
<h3 class="">Latest Repositories</h3>
<div id="repos"></div>
	`);
});
});
});