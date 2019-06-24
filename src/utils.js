export function showError(message) {
  window.vm.$notification.open({
    duration: 5000,
    message,
    position: 'is-bottom-right',
    type: 'is-danger',
    hasIcon: true,
  });
}

export function showInfo(message) {
  window.vm.$notification.open({
    duration: 5000,
    message,
    position: 'is-bottom-right',
    type: 'is-info',
    hasIcon: true,
  });
}


export function catchError(error) {
  console.error(error);
  const { errors } = error.response.data;
  for (const i in errors) {
    showError(errors[i]);
  }
}
