import Swal from 'sweetalert2'

/**
 * PopupMessages service
 */
class PopupMessagesService {

  /**
   * Success alert
   * @param message
   */
  success(message) {
    Swal.fire({
      icon: 'success',
      title: 'Yippee...',
      text: message,
      timer: 750
    })
  }

  /**
   * info alert
   * @param message
   */
  info(message) {
    Swal.fire({
      icon: 'info',
      title: 'Yippee...',
      text: message,
      timer: 3000
    })
  }

  /**
   * Error alert
   * @param message
   */
  error(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: message
    })
  }

  /**
   * Warn alert
   * @param message
   */
  warn(message) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message,
      timer: 4000
    })
  }

  /**
   * Confirm dialog
   * @param message
   * @returns {Promise<SweetAlertResult>}
   */
  confirm(message) {
    return Swal.fire({
      title: 'Jste si jistí?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#408b2d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ano',
      cancelButtonText: 'Ne'
    })
  }
}

export default new PopupMessagesService();