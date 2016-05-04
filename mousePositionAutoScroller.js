/*
 mousePositionAutoScroller

 This class creates the necessary event handlers and animation to scroll the page
 up, down, left, or right when the mouse enters the threshold set around the page boundaries.
 The animation effects can be activated and deactivated.

 */

var mousePositionAutoScroller = (function () {

  var verticalScrollDirection = 0;
  var verticalScrollIncrement = 10;
  var horizontalScrollDirection = 0;
  var horizontalScrollIncrement = 10;
  var topThreshold = 25;
  var bottomThreshold = 100;
  var leftThreshold = 25;
  var rightThreshold = 100;
  var activated = false;

  function mousePositionAutoScroller(options) {

  }

  var mouseMoveHandler = function (e) {
    var scrollTop = $(document).scrollTop();
    var scrollLeft = $(document).scrollLeft();
    var viewportY = e.pageY - scrollTop;
    var viewportX = e.pageX - scrollLeft;

    var scrollUp = viewportY < topThreshold && scrollTop !== 0;
    var scrollDown = viewportY > $(window).height() - bottomThreshold;
    verticalScrollDirection = scrollUp && scrollDown ? 0 : scrollUp ? -1 : scrollDown ? 1 : 0;

    var scrollLeft = viewportX < leftThreshold && scrollLeft !== 0;
    var scrollRight = viewportX > $(window).width() - rightThreshold;
    horizontalScrollDirection = scrollLeft && scrollRight ? 0 : scrollLeft ? -1 : scrollRight ? 1 : 0;
  }

  var mouseLeaveHandler = function () {
    verticalScrollDirection = 0;
    horizontalScrollDirection = 0;
  }

  mousePositionAutoScroller.prototype.activate = function () {
    //Activate
    activated = true;

    //Add the necessary event handlers
    $(document).on("mousemove", mouseMoveHandler);
    $(window).on("blur mouseleave", mouseLeaveHandler);

    //Repeat the animation over and over to scroll as necessary
    (function f() {
      $("html, body")
        .scrollTop(function (i, v) {
          return v + (verticalScrollIncrement * verticalScrollDirection);
        })
        .scrollLeft(function (i, v) {
          return v + (horizontalScrollIncrement * horizontalScrollDirection);
        });

      if (activated)
        window.requestAnimationFrame(f);
    })();
  }

  mousePositionAutoScroller.prototype.deactivate = function () {
    //Deactivate
    activated = false;

    //Remove the event handlers
    $(document).off("mousemove", mouseMoveHandler);
    $(window).off("blur mouseleave", mouseLeaveHandler);
  }

  return mousePositionAutoScroller;
})();
