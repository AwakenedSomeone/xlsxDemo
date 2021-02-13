const defaults = {
    title: null,
    message: '',
    type: ''
};

import Vue from 'vue';
import tipVue from './Tip.vue';

const TipVueConstructor = Vue.extend(tipVue);

let currentMsg, instance;
const defaultCallback = action => {
    if (currentMsg) {
        let callback = currentMsg.callback;
        if (typeof callback === 'function') {
            if (instance.showInput) {
                callback(instance.inputValue, action);
            } else {
                callback(action);
            }
        }
        if (currentMsg.resolve) {
            if (action === 'confirm') {
                if (instance.showInput) {
                    currentMsg.resolve({ value: instance.inputValue, action });
                } else {
                    currentMsg.resolve(action);
                }
            } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
                currentMsg.reject(action);
            }
        }
    }
};

const initInstance = () => {
    instance = new TipVueConstructor({
        el: document.createElement('div')
    });

    instance.callback = defaultCallback;
};


const TipBox = function (options) {
    if (!instance) {
        initInstance();
    }
    instance.action = '';
    if (!instance.visible && options) {
        document.body.appendChild(instance.$el);
        var closeTime = options.closeTime || 1000;
        Vue.nextTick(() => {
            instance.visible = true;
            instance.isTip = options.isTip;
            instance.message = options.message
            setTimeout(() => {
                TipBox.close();
                if (typeof options.func == "function") {
                    options.func();
                }
                
            }, closeTime);
        });
    }
};

TipBox.setDefaults = defaults => {
    TipBox.defaults = defaults;
};

TipBox.tip = ( options) => {

    return TipBox(options);
};


TipBox.close = () => {
    instance.doClose();
    instance.visible = false;
    currentMsg = null;
};

export default TipBox;
// export { TipBox };
