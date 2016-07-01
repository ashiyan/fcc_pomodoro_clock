/* jshint browser: true */

document.addEventListener( "DOMContentLoaded", function() {
	
	// Переменные для быстрого доступа к элементам страницы
	var settings_face = document.querySelector(".settings");
	var timer_face = document.querySelector(".timer");
	var btn_ok = document.querySelector(".settings_ok");
	var btn_new = document.querySelector(".timer_new");
	
	// Переменная для отсчета текущего таймера
	var timer;
	
	// Количество запусков таймера
	var count = 1;
	
	// Функция для добавления нулей к числам от 1 до 9
	function add_zero(min, sec) {
		var result = "";
		if (min < 10) result += "0";
		result += min + ":";
		if (sec < 10) result += "0";
		result += sec;
		return result;
	}
	
	// Функция для инициализации таймеров. Выставление времени и запуск.
	// Общий цикл состоит из 6 таймеров: Работа - Короткий отдых - Работа - Короткий отдых - Работа - Длинный отдых
	// При каждой инициализации выставляем нужное время (взятое из настроек) и увеличиваем количество запущенных таймеров на 1 или сбрасываем
	function initialize_new_timer() {
		
		// Переменная, содержащая время окончания обратного осчета. Для ее расчета к текущему времени прибавляем нужное количество минут
		var countdown = new Date();
		
		// Если таймер по счету 6-ой - это длинный отдых
		if (count === 6) {
			countdown.setMinutes(countdown.getMinutes() + Number(document.querySelector(".range_long_break").value));
			//countdown.setSeconds(countdown.getSeconds() + 2); // ДЛЯ ТЕСТА
			document.querySelector(".timer_message").innerHTML = "Take time to relax!";
			count = 1;
		}
		
		// Если номер таймера - нечетное число - это работа
		else if (count % 2) {
			countdown.setMinutes(countdown.getMinutes() + Number(document.querySelector(".range_work").value));
			//countdown.setSeconds(countdown.getSeconds() + 2); // ДЛЯ ТЕСТА
			document.querySelector(".timer_message").innerHTML = "Time to work!";
			count++;
		}
		
		// В других случаях (т.е. четные числа, кроме 6) - это короткий отдых
		else {
			countdown.setMinutes(countdown.getMinutes() + Number(document.querySelector(".range_short_break").value));
			//countdown.setSeconds(countdown.getSeconds() + 2); // ДЛЯ ТЕСТА
			document.querySelector(".timer_message").innerHTML = "Take a break";
			count++;
		}
		
		// Запуск таймера
		launch_timer(countdown);
	}
	
	
	// Функция - таймер
	function launch_timer(endtime) {
		
		timer = setInterval(function () {
			
			//Переменная, содержащая разницу в миллисекундах между временем окончания таймера и текущим временем
			var total = Date.parse(endtime) - Date.parse(new Date());

			// Конвертируем полученные миллисекунды в минуты и секунды
			var minutes = Math.floor((total / 1000 / 60) % 60);
			var seconds = Math.floor((total / 1000) % 60);
			
			// Вывод таймера на дисплей с добавлением нулей перед этим
			document.querySelector(".timer_display").innerHTML = add_zero(minutes, seconds);
			
			// Если время таймера закончилось
			if (total <= 0) {
				// Останавливаем текущий таймер
				clearInterval(timer);
				// И запускаем следующий
				initialize_new_timer();
			}
			
		}, 1000);
		
			
	}
	
	// Функция переключения окон "Настройки-Таймер-Настройки"
	function rotate(event) {
		
		// Момент переключения на окно таймера
		if (event.target.classList[1] === "settings_ok") {
		
			// Разворачиваем окно настроек лицом назад
			settings_face.style.webkitTransform = "rotateY(180deg)";
			settings_face.style.MozTransform = "rotateY(180deg)";
			settings_face.style.msTransform = "rotateY(180deg)";
			settings_face.style.OTransform = "rotateY(180deg)";
			settings_face.style.transform = "rotateY(180deg)";

			// Разворачиваем окно таймера лицом вперед
			timer_face.style.webkitTransform = "rotateY(0)";
			timer_face.style.MozTransform = "rotateY(0)";
			timer_face.style.msTransform = "rotateY(0)";
			timer_face.style.OTransform = "rotateY(0)";
			timer_face.style.transform = "rotateY(0)";
			
			// Из-за задержки старта нового таймера, в момент переключения в течение секунды видны цифры от старого таймера. Нужно их убрать.
			document.querySelector(".timer_display").innerHTML = "";
			
			// Запускаем новый таймер
			initialize_new_timer();
		
		}
		
		// Момент возврата в настройки
		else if (event.target.classList[1] === "timer_new") {
			
			// Разворачиваем окно настроек лицом вперед
			settings_face.style.webkitTransform = "rotateY(0)";
			settings_face.style.MozTransform = "rotateY(0)";
			settings_face.style.msTransform = "rotateY(0)";
			settings_face.style.OTransform = "rotateY(0)";
			settings_face.style.transform = "rotateY(0)";

			// Разворачиваем окно таймера лицом назад
			timer_face.style.webkitTransform = "rotateY(-180deg)";
			timer_face.style.MozTransform = "rotateY(-180deg)";
			timer_face.style.msTransform = "rotateY(-180deg)";
			timer_face.style.OTransform = "rotateY(-180deg)";
			timer_face.style.transform = "rotateY(-180deg)";
			
			// Останавливаем запущенный таймер
			clearInterval(timer);
			
			// Сбрасываем количество запущенных таймеров на 1, чтобы в следующий раз начать снова с работы
			count = 1;
			
		}
	}
	
	// Подписываем кнопки запуска таймера и возврата в настройки на событие клика кнопкой мыши. Обработчик: функция "rotate"
	btn_ok.addEventListener("click", rotate);
	btn_new.addEventListener("click", rotate);
	
});