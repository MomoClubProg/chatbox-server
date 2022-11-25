
class Logger {


  static dd(v) {
    return ("00" + v.toString()).slice(-2);
  }

  static time(t) {
    return (t.getHours()%12) + ':' + Logger.dd(t.getMinutes()) + ':' + Logger.dd(t.getSeconds());
  }

  static date(t) {
    return t.getFullYear() + '/' + Logger.dd(t.getMonth()) + '/' + Logger.dd(t.getDay());
  }

  static dateString() {
    let date = new Date();

    return 
      `${Logger.date(date)} ` +
      `${Logger.date(time)} `
      
  }

  static user(username, message) {
    console.log(
      `${Logger.dateString()}` + 
      ((username !== undefined) ? `<\x1b[92m${username}\x1b[0m>` : '') +
      ((message !== undefined) ? `\x1b[92m${message}\x1b[0m` : '')
    )
  }

  static error() {
    console.log(...arguments);
  }

  static log() {
    console.log(...arguments);
  }
}

module.exports = Logger;
