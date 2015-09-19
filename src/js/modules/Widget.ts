import $ = require('jquery');
import Base = require('modules/Base');

class Widget extends Base
    {
    private selector: string;

    constructor(selector: string) {
        super();
        this.selector = selector;
    }

    init():void {
        $('body').append('<br><br>Widget loaded using: ' + this.selector);
    }
}

export = Widget