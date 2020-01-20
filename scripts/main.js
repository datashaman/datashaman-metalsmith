import $ from 'domtastic'

$(document).ready(() => {
  $(document)
    .on('click', '.lightbox__thumbnail', function(evt) {
      evt.preventDefault()

      $($(this).attr('href'))
        .addClass('lightbox--show')
        .find('.lightbox__close')
        .get(0)
        .focus()

      return false
    })
    .on('click', '.lightbox__close', function(evt) {
      evt.preventDefault()

      $(this)
        .closest('.lightbox')
        .removeClass('lightbox--show')

      return false
    })
    .on('keyup', '.lightbox__close', function(evt) {
      let next, prev

      evt.preventDefault()

      switch (evt.key) {
        case 'Esc':
        case 'Escape':
          $('.lightbox--show').removeClass('lightbox--show')

          break
        case 'Left':
        case 'ArrowLeft':
          prev = $('.lightbox-show').data('prev')

          if (prev) {
            $('.lightbox--show').removeClass('lightbox--show')
            $(prev).addClass('lightbox--show')
          }

          break
        case 'Right':
        case 'ArrowRight':
          next = $('.lightbox-show').data('next')

          if (next) {
            evt.preventDefault()
            $('.lightbox--show').removeClass('lightbox--show')
            $(next).addClass('lightbox--show')
          }

          break
      }

      return false
    })
})
