"use strict";

window.onload = () => {
	const educationLabel = document.getElementById("educationHead");
	const workLabel = document.getElementById("workHead");
	const everydayLabel = document.getElementById("everydayHead");
	const educationList = document.getElementById("educationList");
	const workList = document.getElementById("workList");
	const everydayList = document.getElementById("everydayList");
	const addButton = document.getElementById("sendButton");
	const newTask = document.getElementById("task");
	const searchField = document.getElementById("search");
	const searchSensitive = document.getElementById("caseSensitive");

	let educationHide = false;
	let workHide = false;
	let everydayHide = false;
	let bin = null;
	let deleted;

	function addToDo(value, listCode) {
		if (!value) {
			return;
		}

		const task = document.createElement("li");
		const $deletion = $("<button></button>").text("X");
		$deletion.addClass("btn btn-warning");
		$deletion.click(function () {
			deleted = $(this).parent();
			$("#modal").modal('show');
		});

		const spanNode = document.createElement('span');
		spanNode.appendChild(document.createTextNode(value))
		task.addEventListener("click", (event) => toggle(task, event));
		task.appendChild(spanNode);
		$deletion.appendTo(task);

		switch (listCode) {
			case 'd':
				educationList.appendChild(task);
				break;
			case 'o':
				workList.appendChild(task);
				break;
			case 'v':
				everydayList.appendChild(task);
				break;
		}
	}

	$("#modal").modal('hide');

	$("#delete").click(function () {
		$("#modal").modal('hide');
		bin = deleted.children()[0].textContent + deleted.parent().attr("id")[1];
		deleted.remove();
		$("#restore").removeClass("btn btn-success disabled");
		$("#restore").addClass("btn btn-success");
	});

	$("#cancel").click(function () {
		$("#modal").modal('hide');
	});

	addButton.addEventListener("click", (event) => {
		const iseducationcation = document.getElementById('education').checked;
		const isWork = document.getElementById('work').checked;
		const isEveryDay = document.getElementById('everyday').checked;

		const listCode = iseducationcation ? 'd' : isWork ? 'o' : isEveryDay ? 'v' : 'n';
		addToDo(newTask.value, listCode);
	});

	$("#restore").click(function () {
		if (bin === null)
			return;

		addToDo(bin.slice(0, -1), bin.at(-1));

		$("#restore").removeClass("btn btn-success");
		$("#restore").addClass("btn btn-success disabled");

		bin = null;
	});

	educationLabel.addEventListener("click", (_) => {
		educationList.style.display = educationHide ? 'block' : 'none';
		const method = educationLabel['classList'][educationHide ? 'remove' : 'add'];
		method.call(educationLabel.classList, 'hidden');
		educationHide = !educationHide;
	});

	workLabel.addEventListener("click", (_) => {
		workList.style.display = workHide ? 'block' : 'none';
		const method = workLabel['classList'][workHide ? 'remove' : 'add'];
		method.call(workLabel.classList, 'hidden');
		workHide = !workHide;
	});

	everydayLabel.addEventListener("click", (_) => {
		everydayList.style.display = everydayHide ? 'block' : 'none';
		const method = everydayLabel['classList'][everydayHide ? 'remove' : 'add'];
		method.call(everydayLabel.classList, 'hidden');
		everydayHide = !everydayHide;
	});

	function toggle(listElement, event) {
		if (event.target.tagName.toLowerCase() === 'button') {
			return;
		}

		if (!listElement.classList.contains('done')) {
			listElement.classList.add('done');
			let today = new Date();
			let date = ' ' + today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			const dateNode = document.createElement('span');
			dateNode.appendChild(document.createTextNode(date));
			listElement.insertBefore(dateNode, listElement.childNodes[1]);

		} else {
			listElement.classList.remove('done');
			listElement.removeChild(listElement.childNodes[1]);
		}
	}

	function searching() {
		let searched = searchField.value;
		if (!searchSensitive.checked) {
			searched = searched.toLowerCase();
		}

		const items = document.getElementsByTagName("li");

		for (let i = 0; i < items.length; i++) {
			let content = items[i].textContent;

			if (!searchSensitive.checked) {
				content = content.toLowerCase();
			}

			if (content.includes(searched)) {
				items[i].style.display = "block";
			} else {
				items[i].style.display = "none";
			}
		}
	}

	searchField.addEventListener("input", searching);

	searchSensitive.addEventListener("click", searching);
}
