/*
*  Copyright(c) 2012, budhitechno.com
*  http://www.budhitechno.com
*
* Licensed under the GPL license:
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/

this.ImageShadow = (function () {
    this.Config = {};
    function MainFunct(ConfigOpts) {
        if (ConfigOpts.control != '' && ConfigOpts.control != undefined && ConfigOpts.control != 'undefined' && ConfigOpts.control != null && ConfigOpts.control != 'null')
            this.Config.control = ConfigOpts.control;
        else
            this.Config.control = '';

        if (ConfigOpts.shadowColor != '' && ConfigOpts.shadowColor != undefined && ConfigOpts.shadowColor != 'undefined' && ConfigOpts.shadowColor != null && ConfigOpts.shadowColor != 'null')
            this.Config.shadowColor = ConfigOpts.shadowColor;
        else
            this.Config.shadowColor = '#999';

        if (ConfigOpts.shadowBlur != '' && ConfigOpts.shadowBlur != undefined && ConfigOpts.shadowBlur != 'undefined' && ConfigOpts.shadowBlur != null && ConfigOpts.shadowBlur != 'null')
            this.Config.shadowBlur = ConfigOpts.shadowBlur;
        else
            this.Config.shadowBlur = 20;

        if (ConfigOpts.shadowOffsetX != '' && ConfigOpts.shadowOffsetX != undefined && ConfigOpts.shadowOffsetX != 'undefined' && ConfigOpts.shadowOffsetX != null && ConfigOpts.shadowOffsetX != 'null')
            this.Config.shadowOffsetX = ConfigOpts.shadowOffsetX;
        else
            this.Config.shadowOffsetX = 15;

        if (ConfigOpts.shadowOffsetY != '' && ConfigOpts.shadowOffsetY != undefined && ConfigOpts.shadowOffsetY != 'undefined' && ConfigOpts.shadowOffsetY != null && ConfigOpts.shadowOffsetY != 'null')
            this.Config.shadowOffsetY = ConfigOpts.shadowOffsetY;
        else
            this.Config.shadowOffsetY = 15;

        if (ConfigOpts.applyID != '' && ConfigOpts.applyID != undefined && ConfigOpts.applyID != 'undefined' && ConfigOpts.applyID != null && ConfigOpts.applyID != 'null')
            this.Config.applyID = ConfigOpts.applyID;
        else
            this.Config.applyID = false;

        if (ConfigOpts.applyCSS != '' && ConfigOpts.applyCSS != undefined && ConfigOpts.applyCSS != 'undefined' && ConfigOpts.applyCSS != null && ConfigOpts.applyCSS != 'null')
            this.Config.applyCSS = ConfigOpts.applyCSS;
        else
            this.Config.applyCSS = false;

        if (ConfigOpts.applyStyle != '' && ConfigOpts.applyStyle != undefined && ConfigOpts.applyStyle != 'undefined' && ConfigOpts.applyStyle != null && ConfigOpts.applyStyle != 'null')
            this.Config.applyStyle = ConfigOpts.applyStyle;
        else
            this.Config.applyStyle = false;

        if (ConfigOpts.beforeShadow != '' && ConfigOpts.beforeShadow != undefined && ConfigOpts.beforeShadow != 'undefined' && ConfigOpts.beforeShadow != null && ConfigOpts.beforeShadow != 'null')
            this.Config.beforeShadow = ConfigOpts.beforeShadow;
        else
            this.Config.beforeShadow = function () { };

        if (ConfigOpts.afterShadow != '' && ConfigOpts.afterShadow != undefined && ConfigOpts.afterShadow != 'undefined' && ConfigOpts.afterShadow != null && ConfigOpts.afterShadow != 'null')
            this.Config.afterShadow = ConfigOpts.afterShadow;
        else
            this.Config.afterShadow = function () { };

        this.CreateMagic();
        //CreateWaterMark(control.valueOf(), this.Config.Controls[control], this.Config.Class, position);

    }
    this.CreateMagic = function () {

        if (this.Config.control.lastIndexOf('#', 0) != -1) {
            var elem = document.getElementById(this.Config.control.replace('#', ''));
            CreateShadow(elem, this.Config);
        }
        else if (this.Config.control.lastIndexOf('.', 0) != -1) {
            var elems = document.getElementsByClassName(this.Config.control.replace('.', ''));
            var cnt = elems.length;
            for (var i = cnt - 1; i >= 0; i--) {
                var elem = elems[i];
                CreateShadow(elem, this.Config);
            }
        }
        else {
            var elems = document.getElementsByTagName(this.Config.control);
            var cnt = elems.length;
            for (var i = cnt - 1; i >= 0; i--) {
                var elem = elems[i];
                CreateShadow(elem, this.Config);
            }
        }

    }
    this.CreateShadow = function (elem, Config) {

        if (elem.tagName.toLowerCase() == 'img' && elem.src != '') {

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            
            

            var img_width = 0;
            var img_height = 0;

            canvas.width = parseInt(elem.offsetWidth);
            img_width = canvas.width;

            canvas.height = parseInt(elem.offsetHeight);
            img_height = canvas.height;

            if (Config.applyID == true) {
                canvas.id = elem.id;
            }
            if (Config.applyCSS == true) {
                canvas.className = elem.className;
            }
            if (Config.applyStyle == true) {

                canvas.style.cssText = elem.style.cssText;
            }
            // load image from data url
            var imageObj = new Image();
            imageObj.onload = function () {
                if (img_width != 0 && img_height != 0) {
                    context.drawImage(this, 0, 0, img_width, img_height);
                }
                else {
                    context.drawImage(this, 0, 0);
                }
            };

            imageObj.src = elem.src;

            Config.beforeShadow(Config, elem, canvas);

            context.shadowColor = Config.shadowColor;
            context.shadowBlur = Config.shadowBlur;
            context.shadowOffsetX = Config.shadowOffsetX;
            context.shadowOffsetY = Config.shadowOffsetY;
            elem.parentNode.replaceChild(canvas, elem);

            Config.afterShadow(Config, elem, canvas);
        }
    }

    return {
        Options: function (Config) {
            return {
                Shadow: function () {
                    MainFunct(Config);
                }
            }
        }
    }
})();