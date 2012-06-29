var JDao = new Object();

//este es el objeto json para poder crear las alertas de la pagina
JDao.alertas = {

    //creacion de las alerta personalizadas
    //esta es la alerta para cuando alla un error
    //esta alerta recibe 3 parametro los cuales son:
    //titulo:el cual recibe el titulo de la alerta lo cual puede ser texto o una imagen
    //info:este parametro sirve para colocar el texto informativo para la alerta
    //n:este parametro tiene que ser unico de cualquier otra alerta
    error:function(titulo,info,n){
       
        var mensaje        mensaje="<div id='myModal"+n+"' class='modal' style='display:none'>";        mensaje=mensaje+"<div class='modal-header' style='background:#BE4036;'>"        mensaje=mensaje+"<a class='close' data-dismiss='modal' >&times;</a>";        mensaje=mensaje+"<center><h1 style='color:#FFF;'>"+titulo+"</h1></center>";        mensaje=mensaje+"</div><div class='modal-body'>";        mensaje=mensaje+"<h4>"+info+"</h4>";        mensaje=mensaje+"</div>";        mensaje=mensaje+'<div class="modal-footer">';        mensaje=mensaje+'<a style="text-decoration:none" href="#" data-dismiss="modal" class="btn btn-danger">Aceptar</a>';        mensaje=mensaje+'</div>'        mensaje=mensaje+'</div>';
        $(function(){
        $("body").append(mensaje);
        $('#myModal'+n+'').modal('show');
        })
    },


    info:function(titulo,info,n)
    {
        var mensaje        mensaje="<div id='myModal"+n+"' class='modal' style='display:none'>";        mensaje=mensaje+"<div class='modal-header' style='background:#4DB2D0;'>"        mensaje=mensaje+"<a class='close' data-dismiss='modal' >&times;</a>";        mensaje=mensaje+"<center><h1 style='color:#FFF;'>"+titulo+"</h1></center>";        mensaje=mensaje+"</div><div class='modal-body'>";        mensaje=mensaje+"<h4>"+info+"</h4>";        mensaje=mensaje+"</div>";        mensaje=mensaje+'<div class="modal-footer">';        mensaje=mensaje+'<a style="text-decoration:none" href="#" data-dismiss="modal" class="btn btn-info">Aceptar</a>';        mensaje=mensaje+'</div>'        mensaje=mensaje+'</div>';
        $(function(){
        $("body").append(mensaje);
        $('#myModal'+n+'').modal('show');
        })
    }

};




$(document).on("ready",function(){

    $("#error").click(function(){

        //========================================================ALERTA DE ERROR=====================================================================
       //asi se manda a llamar la alerta que desar que aparesca en este caso es una alerta de tipo error
       //el primer parametro que recibe esta funcion es para poder colocarle el titulo a la alerta en est caso es una imagen aunque podria ser texto
       //segundo parametro sirve para mostrar un texto informativo en la alerta
       //el ultimo parametro es un numero entero unico de cualquier alerta
        JDao.alertas.error("<img src='img/alertaerror.png' width='500'>",
        "Aqui puedes poner lo que quieres que te aparesca de texto cuando alla ocurrido un determinado error",
        2);
      //=============================================================================================================================================
      
      });

      $("#informacion").click(function(){

        //========================================================ALERTA DE informacion=====================================================================
       //asi se manda a llamar la alerta que desar que aparesca en este caso es una alerta de tipo informacion
       //el primer parametro que recibe esta funcion es para poder colocarle el titulo a la alerta en est caso es una imagen aunque podria ser texto
       //segundo parametro sirve para mostrar un texto informativo en la alerta
       //el ultimo parametro es un numero entero unico de cualquier alerta
        JDao.alertas.info(
        "<img src='img/alertainfo.png' width='500'>",
        "Aqui puedes poner lo que quieres que te aparesca de texto cuando alla ocurrido una determinada accion",
        3
        );
      //=============================================================================================================================================
      
      });



});


























































































































/* =========================================================
 * bootstrap-modal.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery );



