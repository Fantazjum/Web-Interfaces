"use strict";

window.onload = () => {
const eduLabel = document.getElementById("eduHead");
const workLabel = document.getElementById("workHead");
const everydayLabel = document.getElementById("everydayHead");
const eduList = document.getElementById("eduList");
const workList = document.getElementById("workList");
const everydayList = document.getElementById("everydayList");
const addButton = document.getElementById("sendButton");
const newTask = document.getElementById("task");
const searchField = document.getElementById("search");
const searchSensitive = document.getElementById("caseSensitive");

let eduHide = true;
let workHide = true;
let everydayHide = true;
let bin = null;

addButton.addEventListener("click", (event) => {
	if(newTask.value === "") return;
	let task = document.createElement("li");
	let $deletion = $("<button></button>").text("X");
	$deletion.addClass("btn btn-warning");
	$deletion.click(function(){
		bin = $(this).parent().contents()[0].nodeValue + $(this).parent().parent().attr("id")[1];
		$(this).parent().remove();
		$("#restore").removeClass("btn btn-success disabled");
		$("#restore").addClass("btn btn-success");
	});
	task.appendChild(document.createTextNode(newTask.value));
	$deletion.appendTo(task);
	if(document.getElementById("edu").checked) {
		eduList.appendChild(task);
	}
	else if(document.getElementById("work").checked) {
		workList.appendChild(task);
	}
	else if(document.getElementById("everyday").checked) {
		everydayList.appendChild(task);
	}
});

$("#restore").click(function(){
	if(bin === null) return;
	let type = bin.slice(-1);
	let restored = $("<li></li>");
	let $deletion = $("<button></button>").text("X");
	$deletion.addClass("btn btn-warning");
	$deletion.click(function(){
		bin = $(this).parent().contents()[0].nodeValue + $(this).parent().parent().attr("id")[1];
		$(this).parent().remove();
		$("#restore").removeClass("btn btn-success disabled");
		$("#restore").addClass("btn btn-success");
	});
	restored.append(document.createTextNode(bin.slice(0,-1)));
	$deletion.appendTo(restored);
	$("#restore").removeClass("btn btn-success");
	$("#restore").addClass("btn btn-success disabled");
	bin = null;
	switch (type) {
		case 'd':
			$("#eduList").append(restored);
			break;
		case 'o':
			$("#workList").append(restored);
			break;
		case 'v':
			$("#everydayList").append(restored);
			break;
		default:
			console.log("Something went wrong...");
	}
});

eduLabel.addEventListener("click", (event) => {
	if(eduHide)	{
		eduList.style.display = "none";
		eduHide = false;
	} else {
		eduList.style.display = "block";
		eduHide = true;
	}
});

workLabel.addEventListener("click", (event) => {
	if(workHide)	{
		workList.style.display = "none";
		workHide = false;
	} else {
		workList.style.display = "block";
		workHide = true;
	}
});

everydayLabel.addEventListener("click", (event) => {
	if(everydayHide)	{
		everydayList.style.display = "none";
		everydayHide = false;
	} else {
		everydayList.style.display = "block";
		everydayHide = true;
	}
});

function toggle() {
	let listElement = event.target;
	if(listElement.tagName.toLowerCase() === "button") return;
	if(listElement.style.color != 'grey')
	{
		listElement.style.setProperty('text-decoration', 'line-through');
		listElement.style.color = 'grey';
		let today = new Date();
		let date = ' ' + today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
		listElement.insertBefore(document.createTextNode(date), listElement.childNodes[1]);
	} else {
		listElement.style.setProperty('text-decoration', 'none');
		listElement.style.color = "orange";
		listElement.removeChild(listElement.childNodes[1]);
	}
}

eduList.addEventListener("click", toggle);

workList.addEventListener("click", toggle);

everydayList.addEventListener("click", toggle);

function searching() {
	let searched = searchField.value;
	if(!searchSensitive.checked) searched = searched.toLowerCase();
	let items = document.getElementsByTagName("li");
	for (let i = 0; i < items.length; i++) {
		let inside = items[i].textContent;
		if(!searchSensitive.checked) inside = inside.toLowerCase();
		if(inside.includes(searched)) items[i].style.display = "block";
		else items[i].style.display = "none";
	}
}

searchField.addEventListener("input", searching);

searchSensitive.addEventListener("click", searching);

}