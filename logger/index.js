
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

    return (
      `\x1b[96m${Logger.date(date)} \x1b[0m` +
      `\x1b[96m${Logger.time(date)} \x1b[0m`
    )
      
  }

  static user(user) {

    let byte_message = "";
    let str = user.message.toString();
    for (let i = 0; i < user.message.length; i++) {
      byte_message += str.charCodeAt(i).toString(16) + " ";
    }

    console.log(
      `${Logger.dateString()}` + 
      ((user.username !== undefined) ? `<\x1b[92m${user.username}\x1b[0m> ` : '') +
      ((user.message !== undefined) ? ` ${byte_message}` : '')
    )
  }

  static userJoin(user) {
    console.log(
      `${Logger.dateString()}` + 
      ((user.username !== undefined) ? `<\x1b[92m${user.username}\x1b[0m> ` : '') +
      ((user.userTag !== undefined) ? `\x1b[92m${user.userTag}\x1b[0m ` : '') +
      ((user.message !== undefined) ? ` joined channel ${user.Channel}` : '')
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
