var computerCategoriesElement = document.getElementById('computer-categories-div');
var computersElement = document.getElementById('computers-div');
var computersLoading = document.getElementById('computers-loading');
var basketComputerCount = document.getElementById('basket-computer-count');
var openBasketButton = document.getElementById('open-basket-button');
//var computerModalImage = document.getElementById('computer-modal-image');
var computerModalName = document.getElementById('computer-modal-name');
var computerModalDescription = document.getElementById('computer-modal-description');
var computerModalPrice = document.getElementById('computer-modal-price');
var computerModalPhone = document.getElementById('computer-modal-phone');
var computerModalNew = document.getElementById('computer-modal-new');
var computerModalRam = document.getElementById('computer-modal-ram');
var computerModalCpu = document.getElementById('computer-modal-cpu');
var computerModalDrive = document.getElementById('computer-modal-drive');
var computerModalDriveType = document.getElementById('computer-modal-drive-type');
var computerModalOs = document.getElementById('computer-modal-os');
var computerModalVideoCard = document.getElementById('computer-modal-video-card');
var computerDetailsModal = document.getElementById('computer-details-modal');
var computerDetailsModalContent = document.getElementById('computer-details-modal-content');
var basketModalElement = document.getElementById('basket-modal');
var basketModalCloseButtonElement = document.getElementById('basket-modal-close-button');
var basketComputersTableBodyElement = document.getElementById('basket-computers-table-body');
var basketTotalPriceContentElement = document.getElementById('basket-total-price-content');

var users = [];
var categories = [];
var categoriesGlobal = [];
var computers = []; var computersGlobal = []; var computersSelectedGlobal = [];
var computersSelectedGlobalForSearch = [];

var basketComputers = [];
var currentSelectedCategoryId = 0;

function loadDataFromLocalStorage() {
	var usersString = localStorage.getItem("users");
	var categoriesString = localStorage.getItem("categories");
	var computersString = localStorage.getItem("computers");
	if (usersString == null) {
		localStorage.setItem("users", JSON.stringify(users));
	} else {
		users = JSON.parse(usersString);
	}
	if (categoriesString == null) {
		localStorage.setItem("categories", JSON.stringify(categories));
	} else {
		categories = JSON.parse(categoriesString);
		categoriesGlobal = categories.slice();
	}
	if (computersString == null) {
		localStorage.setItem("computers", JSON.stringify(computers));
	} else {
		computers = JSON.parse(computersString); computersGlobal = computers.slice();
	}
	var basketComputersString = localStorage.getItem("basketComputers");
	if (basketComputersString == null) {
		localStorage.setItem("basketComputers", "[]");
	} else {
		basketComputers = JSON.parse(basketComputersString);
	}
	showBasketComputerCount();

}
loadDataFromLocalStorage();
function loadComputerCategories() {
	computerCategoriesElementHTML = "<ul class='list-group'>";
	for (var i = 0; i < categories.length; i++) {
		const c = categories[i];
		computerCategoriesElementHTML += "<li class='list-group-item " +
			"list-group-item-action' id='computer-category-" + c.id + "' onclick='onCategorySelected(" + c.id + ")'>" +
			c.name + "</li>";
	}
	computerCategoriesElementHTML += "</ul>";
	computerCategoriesElement.innerHTML = computerCategoriesElementHTML;
}
loadComputerCategories();
function onCategorySelected(categoryId) {
	if (currentSelectedCategoryId === categoryId) { } else {
		currentSelectedCategoryId = categoryId;
		computersLoading.style.display = 'block';
		computersElement.innerHTML = '';
		computersElement.style.display = 'none';
		begin = 0;
		allComputersLoaded = false;
		allowScroll = true;
		for (let index = 0; index < categories.length; index++) {
			const c = categories[index];
			if (c.id === categoryId) {
				document.getElementById('computer-category-' + c.id).style.color = 'blue';
				document.getElementById('computer-category-' + c.id).style.fontWeight = 'bold';
			} else {
				document.getElementById('computer-category-' + c.id).style.color = 'black';
				document.getElementById('computer-category-' + c.id).style.fontWeight = 'normal';
			}
		}
		setTimeout(function () {
			computersLoading.style.display = 'none';
			var computersSelected = [];
			for (var i = 0; i < computers.length; i++) {
				const c = computers[i];
				if (c.categoryId === categoryId) {
					computersSelected.push(c);
				}
			}
			for (var i = 0; i < computersSelected.length; i++) {
				const c = computersSelected[i];

				for (var j = 0; j < users.length; j++) {
					const u = users[j];
					if (u.id === c.userId) {
						c.phone = u.phone; break;
					}
				}
			} computersSelectedGlobal = computersSelected.slice();
			computersSelectedGlobalForSearch = computersSelected.slice();
			computersElementHTML = "";
			if (computersSelected.length <= length) { allComputersLoaded = true; } else {

			}
			computersSelected = computersSelected.slice(begin, length);

			for (var i = 0; i < computersSelected.length; i++) {
				const c = computersSelected[i];
				computersElementHTML += "<div class='computer-card-container' >" +
					"<div class='computer-card' >" +
					"<div class='computer-image'   style='background-image:url(" + c.imagePath + ");'></div>" +
					"<div class='computer-data'><div class='computer-name' title='" +
					c.name + "'>" + c.name + "</div>" +
					"<div class='computer-description' title='" +
					c.description + "'>" + c.description + "</div>" +
					"<div class='computer-price' title='" + c.price + " AZN'>" +
					c.price + " AZN</div>" +
					"<div class='computer-new'>" + (c.isNew ? 'Да' : 'Нет' ) + "</div>" +
					"<div class='user-phone' title='" + c.phone + "'>" + c.phone + "</div>" +
					"<div class='add-to-basket-div'><button class='btn btn-primary' " +
					"onclick='onComputerSelected(" + c.id + ")'>Подробнее</button></div>" +
					"</div></div></div>";
			}
			computersElement.innerHTML = computersElementHTML;
			computersElement.style.display = 'block';
			if (computersSelected.length === 0) {
				computersElement.innerHTML = "<h2 class='not-found'>По этой категории нет компьютера!</h2>";
			}

		}, 300)

	}
}
onCategorySelected(1);// Show Acer computers when page loads
function onComputerSelected(computerId) {
	computerDetailsModal.style.display = "block";
	var selectedComputer = null;
	for (let index = 0; index < computers.length; index++) {
		const c = computers[index];
		if (c.id === computerId) {
			selectedComputer = c; break;
		}
	}
	//computerModalImage.src = selectedComputer.imagePath;
	computerModalImageContainer.style.backgroundImage = "url('" + selectedComputer.imagePath + "')";
	computerModalName.innerHTML = selectedComputer.name;
	computerModalDescription.innerHTML = selectedComputer.description;
	computerModalPrice.innerHTML = selectedComputer.price + " AZN";
	computerModalPhone.innerHTML = selectedComputer.phone;
	computerModalNew.innerHTML = (selectedComputer.isNew ? 'Да' : 'Нет');
	computerModalRam.innerHTML = selectedComputer.ram + " GB";
	computerModalCpu.innerHTML = selectedComputer.cpu;
	computerModalDrive.innerHTML = selectedComputer.drive + " GB";
	computerModalDriveType.innerHTML = selectedComputer.driveType == "hdd" ? "HDD" : "SSD";
	computerModalOs.innerHTML = selectedComputer.os;
	computerModalVideoCard.innerHTML = selectedComputer.videoCard + " GB";
}
function onAddToBasket(computerId) {
	openBasketButton.style.display = 'none';
	setTimeout(function () {
		openBasketButton.style.display = 'inline-block';

		var existsInBasket = false;
		for (let index = 0; index < basketComputers.length; index++) {
			const b = basketComputers[index];
			if (b.computer.id === computerId) {
				b.count++; existsInBasket = true; break;
			}
		}
		if (existsInBasket) {
		} else {
			var selectedComputer = null;
			for (let index = 0; index < computers.length; index++) {
				const c = computers[index];
				if (c.id === computerId) {
					selectedComputer = c; break;
				}
			}
			basketComputers.push({ count: 1, computer: selectedComputer });
		}
		showBasketComputerCount();	
		saveBasketComputersToLocalStorage();
	}, 200);
}
function saveBasketComputersToLocalStorage() {
	localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
}
function showBasketComputerCount() {
	basketComputerCount.innerHTML = basketComputers.length;
}
window.addEventListener("click", function (event) {
	if (event.target === computerDetailsModal) {
		computerDetailsModal.style.display = 'none';
	}
});
function onOpenBasket() {
	if (basketComputers.length === 0) {
		showAlertMessage('В корзине пусто', 1000);
	} else {
		basketModalElement.style.display = 'block';
		refreshComputersBasket();
		calculateBasketTotalPrice();
	}
}
basketModalCloseButtonElement.addEventListener("click", function () {
	closeBasket();
});
function refreshComputersBasket() {
	basketComputersTableBodyElement.innerHTML = '';
	basketComputersTableBodyElementHtml = '';
	for (let index = 0; index < basketComputers.length; index++) {
		const b = basketComputers[index];
		basketComputersTableBodyElementHtml += '<tr><td>' + b.computer.id;
		basketComputersTableBodyElementHtml += '</td><td><img class="basket-computer-image" src="' +
			b.computer.imagePath + '"/>';
		basketComputersTableBodyElementHtml += '</td><td>' + b.computer.name;
		basketComputersTableBodyElementHtml += '</td><td>' + b.computer.price;
		basketComputersTableBodyElementHtml += ' AZN</td><td><input min="1" max="10000" type="number" value="' +
			b.count + '" ' +
			' onchange="computerCountChanged(this,' + b.computer.id + ')" onkeypress="checkCount(event)" />';
		basketComputersTableBodyElementHtml += '</td><td id="computer-total-price-' +
			b.computer.id + '">' + (b.computer.price * b.count);
		basketComputersTableBodyElementHtml += ' AZN</td><td><button onclick="deleteBasketComputer(' +
			b.computer.id +
			')" class="btn btn-danger">Удалить</button></td><tr>';
	}
	basketComputersTableBodyElement.innerHTML = basketComputersTableBodyElementHtml;
}
function calculateBasketTotalPrice() {
	var totalPrice = 0;
	for (let index = 0; index < basketComputers.length; index++) {
		const b = basketComputers[index];
		totalPrice += b.count * b.computer.price;
	}
	basketTotalPriceContentElement.innerHTML = totalPrice;
}
calculateBasketTotalPrice();
function computerCountChanged(countInput, computerId) {
	if (countInput.value == '' || countInput.value == '0') { countInput.value = "1"; }
	for (let index = 0; index < basketComputers.length; index++) {
		const b = basketComputers[index];
		if (b.computer.id === computerId) {
			b.count = Number(countInput.value);
			document.getElementById('computer-total-price-' + b.computer.id).innerHTML = "" + (b.count * b.computer.price) + " AZN";
			break;
		}
	}
	localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
	calculateBasketTotalPrice();
}
function deleteBasketComputer(computerId) {
	for (let index = 0; index < basketComputers.length; index++) {
		const b = basketComputers[index];
		if (b.computer.id === computerId) {
			basketComputers.splice(index, 1);
			break;
		}
	}
	refreshComputersBasket();
	localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
	hideAndShowBasketButton();
	calculateBasketTotalPrice();
	if (basketComputers.length === 0) {
		closeBasket();
	}
}
function hideAndShowBasketButton() {
	openBasketButton.style.display = 'none';
	setTimeout(function () {
		openBasketButton.style.display = 'block';
		showBasketComputerCount();
	}, 200);
}
function closeBasket() {
	setTimeout(function () { basketModalElement.style.display = 'none'; }, 200);
}
function clearBasket() {
	basketComputers.splice(0, basketComputers.length);
	refreshComputersBasket();
	localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
	calculateBasketTotalPrice();
	hideAndShowBasketButton();

	setTimeout(() => {
		closeBasket();
	}, 300);
}

function confirmOrder() {
	closeBasket();
	setTimeout(() => {
		openConfirmOrderModalPage();
	}, 200);
}



var confirmOrderModalElement = document.getElementById('confirm-order-modal');
var confirmOrderModalCloseButtonElement = document.getElementById('confirm-order-modal-close-button');

confirmOrderModalCloseButtonElement.addEventListener("click", function () {
	closeConfirmOrder();
});

function closeConfirmOrder() {

	setTimeout(function () { confirmOrderModalElement.style.display = 'none'; }, 100);
}

function openConfirmOrderModalPage() {

	confirmOrderModalElement.style.display = 'block';
	fillCustomerInformation();

}

function checkCount(event) {

	var code = event.charCode;
	if (code >= 48 && code <= 57) {

	} else {

		event.returnValue = false;
	}

	if (Number(event.target.value + "" + event.key) > 10000) {
		event.target.value = "1";
		event.returnValue = false;
	}
	if (event.target.value === "0" && event.key === "0") { event.returnValue = false; }

}