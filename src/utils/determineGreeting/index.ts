function determineGreeting() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var greeting;
  if (!currentHour) {
    greeting = "欢迎！💨";
  } else if (currentHour > 5 && currentHour <= 6) {
    greeting = "清晨好! 🌤️";
  } else if (currentHour > 6 && currentHour <= 8) {
    greeting = "早晨好 🌞";
  } else if (currentHour > 8 && currentHour <= 11) {
    greeting = "上午好! ✨";
  } else if (currentHour > 11 && currentHour <= 13) {
    greeting = "中午好 🍻";
  } else if (currentHour > 13 && currentHour <= 17) {
    greeting = "下午好 💛";
  } else if (currentHour > 17 && currentHour <= 19) {
    greeting = "傍晚好 🩷";
  } else if (currentHour > 19 && currentHour <= 24) {
    greeting = "晚上好 🌙";
  } else if (currentHour >= 0 && currentHour <= 5) {
    greeting = "凌晨好 🌚"; ;
  } else {
    greeting = "欢迎！💨";
  }

  return greeting;
}

export default determineGreeting;
