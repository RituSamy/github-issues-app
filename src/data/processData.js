export default function processData(data) {
  let issues = data.map((item) => {
    let {
      html_url,
      labels,
      title,
      user,
      number,
      created_at,
      updated_at,
      comments,
    } = item;
    created_at = calculateDate(created_at);
    updated_at = calculateDate(updated_at);
    let username = null;
    let userlink = null;
    if (user) {
      username = user.login;
      userlink = user.html_url;
    }
    let visible = true;

    return {
      html_url,
      labels,
      title,
      username,
      userlink,
      number,
      created_at,
      updated_at,
      comments,
      visible,
    };
  });
  return issues;
}

function calculateDate(dateString) {
  const date = new Date(dateString);
  let today = new Date();
  let currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const millisec = Math.abs(date - currentDate);
  const seconds = Math.ceil(millisec / 1000);
  const minutes = Math.ceil(seconds / 60);
  const hours = Math.ceil(minutes / 60);
  const days = Math.ceil(hours / 24);
  const weeks = Math.ceil(days / 7);
  const months = Math.ceil(weeks / 4);
  const years = Math.ceil(weeks / 52);

  let time = 0;
  let units = "";

  if (seconds < 60) {
    time = seconds;
    units = " seconds";
  } else if (minutes < 60) {
    time = minutes;
    units = " minutes";
  } else if (hours < 24) {
    time = hours;
    units = " hours";
  } else if (days < 7) {
    time = days;
    units = " days";
  } else if (weeks < 4) {
    time = weeks;
    units = " weeks";
  } else if (months < 12) {
    time = months;
    units = " months";
  } else {
    time = years;
    units = " years";
  }
  let displayTime = time + units;
  if (time === 1) {
    displayTime = displayTime.slice(0, displayTime.length - 1);
  }
  // created_at will be an array consisting of the raw time and the display time.
  return [millisec, displayTime];
}
