import * as interfaces from 'interfaces';
const { registry } = interfaces;

let inited = false;

export function init() {
    if (inited) {
        return;
    }
    inited = true;
}
