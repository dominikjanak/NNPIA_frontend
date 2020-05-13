import Swal from 'sweetalert2'

class PopupMessagesService {

    success(message){
        Swal.fire({
            icon: 'success',
            title: 'Yippee...',
            text: message,
            timer: 1000
        })
    }

    info(message){
        Swal.fire({
            icon: 'info',
            title: 'Yippee...',
            text: message,
            timer: 3000
        })
    }

    error(message){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        })
    }

    warn(message){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: message,
        timer: 4000
      })
    }

    confirm(message){
        return Swal.fire({
            title: 'Are you sure?',
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