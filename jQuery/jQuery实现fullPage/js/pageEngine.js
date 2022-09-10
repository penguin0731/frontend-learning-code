var pageEngine = {
    init: function (selector, colorArray) {
        this.$W = $(selector);
        this.colorArray = colorArray;
        this.sliderKey = false;
        return this;
    },
    addSection: function (className) {
        this.$Page = $('<div class="section"></div>').addClass(className);
        this.$Page.appendTo(this.$W);
        this.sliderKey = false;
        return this;
    },
    addSlider: function (className) {
        this.$Slider = $('<div class="slider"></div>').addClass(className);
        this.$Slider.appendTo($Page);
        this.sliderKey = true;
        return this;
    },
    component: function (config) {
        var oCp = null;
        switch(config.type) {
            case 'base':
                oCp = ComponentFactory(config);
                break;
            // case 'super':
            //     ComponentSuperFactory(config);
            //     break;
        }
        this.sliderKey ? this.$Slider.append(oCp) : this.$Page.append(oCp);
        return this;
    }
}