import UIkit from 'uikit';

function notify(message, status) {
  UIkit.notification(message, {
    status,
    timeout: 3000,
    pos: 'top-left',
  });
}

export default notify;
