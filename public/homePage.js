// КНОПКА ВЫХОДА
const logoutButton = new LogoutButton();
logoutButton.action = (logout) => {
  const callback = (response) => {
    if (response.success) {
      location.reload();
    }
  }

  ApiConnector.logout(callback);
};

// ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ

ApiConnector.current(callback = (response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

//ПОЛУЧЕНИЕ ТЕКУЩИХ КУРСОВ ВАЛЮТЫ

const ratesBoard = new RatesBoard();

function currentExchangeRate() {
  ApiConnector.getStocks(callback = (response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  })
}
currentExchangeRate();


setInterval(currentExchangeRate, 60000);

// ОПЕРАЦИИ С ДЕНЬГАМИ

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => { //Запишите в свойство addMoneyCallback функцию, которая будет выполнять запрос.
  ApiConnector.addMoney(data, callback = (response) => { //Внутри функции выполните запрос на пополнение баланса (addMoney).
    if (response.success) {
      ProfileWidget.showProfile(response.data); //В случае успешного запроса отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
      moneyManager.setMessage(response.success, 'Успех')
    } else {
      moneyManager.setMessage(response.error, 'Ошибка');
    }
  })
}

//РЕАЛИЗУЙТЕ КОНВЕРТИРОВАНИЕ ВАЛЮТЫ

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, callback = (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); //В случае успешного запроса отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
      moneyManager.setMessage(response.success, 'Успех')
    } else {
      moneyManager.setMessage(response.error, 'Ошибка');
    }
  })
}

// РЕАЛИЗУЙТЕ ПЕРЕВОД ВАЛЮТЫ

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, callback = (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); //В случае успешного запроса отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
      moneyManager.setMessage(response.success, 'Успех')
    } else {
      moneyManager.setMessage(response.error, 'Ошибка');
    }
  })

}

// РАБОТА С ИЗБРАННЫМ
const favoritesWidget = new FavoritesWidget(); //Создайте объект типа FavoritesWid
ApiConnector.getFavorites(callback = (response) => { //Выполните запрос на получение списка избранного (getFavorites)
  if (response.success) { //В колбеке запроса проверяйте успешность запроса.
    favoritesWidget.clearTable(); //При успешном запросе очистите текущий список избранного (clearTable).
    favoritesWidget.fillTable(response.data); //Отрисуйте полученные данные (fillTable).
    moneyManager.updateUsersList(response.data); //Заполните выпадающий список для перевода денег (updateUsersList).
  }
})

//Реализуйте добавления пользователя в список избранных:
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, callback = (response) => {
    if (response.success) { //В колбеке запроса проверяйте успешность запроса.
      favoritesWidget.clearTable(); //При успешном запросе очистите текущий список избранного (clearTable).
      favoritesWidget.fillTable(response.data); //Отрисуйте полученные данные (fillTable).
      moneyManager.updateUsersList(response.data); //Заполните выпадающий список для перевода денег (updateUsersList).
      favoritesWidget.setMessage(response.success, 'Успех')
    } else {
      favoritesWidget.setMessage(response.error, 'Ошибка');
    }
  }); //Внутри функции выполните запрос на добавление пользователя (addUserToFavorites).

}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, callback = (response) => {
    if (response.success) { //В колбеке запроса проверяйте успешность запроса.
      favoritesWidget.clearTable(); //При успешном запросе очистите текущий список избранного (clearTable).
      favoritesWidget.fillTable(response.data); //Отрисуйте полученные данные (fillTable).
      moneyManager.updateUsersList(response.data); //Заполните выпадающий список для перевода денег (updateUsersList).
      favoritesWidget.setMessage(response.success, 'Успех')
    } else {
      favoritesWidget.setMessage(response.error, 'Ошибка');
    }
  });
}
