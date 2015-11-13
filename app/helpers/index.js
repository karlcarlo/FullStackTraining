// date format
exports.dateFormat = function(_date){
  if(typeof _date != 'object'){
    return {};
  }

  // 小于10时补0
  function fix(num){
    return (num < 10)? '0' + num : num.toString();
  }

  // yyyy-MM-dd HH:mm:ss
  var year = _date.getFullYear()
    , month = _date.getMonth() + 1
    , date = _date.getDate()
    , day = _date.getDay()
    , hours = _date.getHours()
    , minutes = _date.getMinutes()
    , seconds = _date.getSeconds();

  var months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    , months_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    , months_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    , days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    , days_en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
    , days_abbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return {
    year: year,
    month: fix(month),
    date: fix(date),
    day: day,
    hours: fix(hours),
    minutes: fix(minutes),
    seconds: fix(seconds),
    month_name: months[month - 1],
    month_name_en: months_en[month - 1],
    month_abbr: months_abbr[month - 1],
    day_name: days[day],
    day_name_en: days_en[day],
    day_abbr: days_abbr[day],
    // yyyy-MM-dd
    ymd: year + '-' + fix(month) + '-' + fix(date),
    // HH:mm:ss
    hms: fix(hours) + ':' + fix(minutes) + ':' + fix(seconds),
    // yyyy-MM-dd HH:mm:ss
    full: year + '-' + fix(month) + '-' + fix(date) + ' ' + fix(hours) + ':' + fix(minutes) + ':' + fix(seconds),
    // yyyy/MM/dd HH:mm
    ymdhm: year + '/' + fix(month) + '/' + fix(date) + ' ' + fix(hours) + ':' + fix(minutes),
    // MM/dd HH:mm
    mdhm: fix(month) + '/' + fix(date) + ' ' + fix(hours) + ':' + fix(minutes),
    // dd month yyyy HH:mm
    west: fix(date) + ' ' + months_abbr[month - 1] + ' ' + year + ' ' + fix(hours) + ':' + fix(minutes),
  };
};