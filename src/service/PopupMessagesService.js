class PopupMessagesService {
    info(message){
        // eslint-disable-next-line no-undef
        $("body").overhang({
            type: "info",
            message: message,
            duration: 4,
            closeConfirm: true
        });
    }
    error(message){
        // eslint-disable-next-line no-undef
        $("body").overhang({
            type: "error",
            message: message,
            duration: 4,
            closeConfirm: true
        });
    }
    warn(message){
        // eslint-disable-next-line no-undef
        $("body").overhang({
            type: "warn",
            message: message,
            duration: 4,
            closeConfirm: true
        });
    }
    success(message){
        // eslint-disable-next-line no-undef
        $("body").overhang({
            type: "success",
            message: message,
            duration: 4,
            closeConfirm: true
        });
    }

    async prompt(message){
        // eslint-disable-next-line no-undef
        await  $("body").overhang({
            type: "prompt",
            message: message,
            overlay: true
        });
    }

    async confirm(message, callbackFnc){
        // eslint-disable-next-line no-undef
        $("body").overhang({
            type: "confirm",
            message: message,
            overlay: true,
            callback: callbackFnc
        });
    }
}

export default new PopupMessagesService();