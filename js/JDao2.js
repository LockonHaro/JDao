var JDao;

JDao = {
    //aqui informacion general de la libreria
    version: "2.0",
    autor: "David Castro",
    verInfo: function() {
        alert("Libreria JDao " + JDao.version + " creada por " + JDao.autor);
    },
    //fucnion para  crear elementos dentro del documento
    crearE: function(lugar, elemento) {

        $(function() {
            $(lugar).append(elemento)
        })

    },
    click: function(elem, fun) {
        var DomE = document.getElementById(elem)
        DomE.onclick = fun;
    }


}
//este es el objeto json para poder crear las alertas de la pagina
JDao.alertas = {

    alertGeneral: function(titulo, info, n, color,tipobtn) {
        var mensaje
        mensaje = "<div id='myModal" + n + "' class='modal' style='display:none'>";
        mensaje = mensaje + "<div class='modal-header' style='background:" + color + ";'>"
        mensaje = mensaje + "<a class='close' data-dismiss='modal' >&times;</a>";
        mensaje = mensaje + "<center><h1 style='color:#FFF;'>" + titulo + "</h1></center>";
        mensaje = mensaje + "</div><div class='modal-body'>";
        mensaje = mensaje + "<h4>" + info + "</h4>";
        mensaje = mensaje + "</div>";
        mensaje = mensaje + '<div class="modal-footer">';
        mensaje = mensaje + '<a style="text-decoration:none" href="#" data-dismiss="modal" class="btn btn-'+tipobtn+' ">Aceptar</a>';
        mensaje = mensaje + '</div>'
        mensaje = mensaje + '</div>';
        $(function() {
            $("body").append(mensaje);
            $('#myModal' + n + '').modal('show');
        })
    },

    error: function(titulo, info, n) {

        JDao.alertas.alertGeneral(titulo, info, n, '#BE4036','danger');
    },


    info: function(titulo, info, n) {

         JDao.alertas.alertGeneral(titulo, info, n, '#4DB2D0','info');
    }

};

var J = JDao;





$(document).on("ready",function(){

    J.click("error", function() {
        J.alertas.error("<img src='img/alertaerror.png' width='500'>",
        "Aqui puedes poner lo que quieres que te aparesca de texto cuando alla ocurrido un determinado error",
        2)
    });

 
    J.click("informacion",function() {

        J.alertas.info(
        "<img src='img/alertainfo.png' width='500'>",
        "Aqui puedes poner lo que quieres que te aparesca de texto cuando alla ocurrido una determinada accion",
        3);

    });

});


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



